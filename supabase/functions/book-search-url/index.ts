import "@supabase/functions-js";
import * as cheerio from "cheerio";
import { createClient } from 'jsr:@supabase/supabase-js@2';
import axios from "axios";

import {
    fakeUserAgent,
} from "../_shared/utils.ts";

import {
    isbnScraper
} from "../_shared/scrapers.ts";

const generateURL = (good_reads_book_id: string) => {
    return `https://www.goodreads.com/book/show/${good_reads_book_id}`
}

Deno.serve(async (req) => {
    const authHeader = req.headers.get('Authorization')!
    const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        { global: { headers: { Authorization: authHeader } } }
    )

    const token = authHeader.replace('Bearer ', '')
    const { data: userData } = await supabaseClient.auth.getUser(token)
    const user = userData.user
    const user_id = user?.id

    const { good_reads_book_id } = await req.json()

    if (!good_reads_book_id || !user_id) {
        return new Response(JSON.stringify({ error: 'good_reads_book_id and user is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const { data: bookData } = await supabaseClient
        .from('books')
        .select(
            `*, genres:book_genres(
                    genre:genre_id(name)
                ), 
                user_books(id)`,
        )
        .eq('good_reads_book_id', good_reads_book_id)
        .single()

    let responseData;
    if (bookData) {
        // Book found in the database, add it to user's scan list
        if (user_id) {
            const { error: userScanError } = await supabaseClient
                .from('user_scans')
                .upsert({
                    user_id: user_id,
                    book_id: bookData.id,
                }, { onConflict: 'user_id,book_id', ignoreDuplicates: true });

            if (userScanError) {
                console.error('Error adding book to user_scans:', userScanError);
            }
        }

        // Extract genres from the nested structure

        responseData = {
            status: 'Found in database',
            result: {
                book: bookData,
                lastScraped: null,
                scrapeURL: null,
                searchType: 'goodreadsURL',
                numberOfResults: null
            }
        };
    } else {
        try {
            const scrapeUrl = generateURL(good_reads_book_id);
            const { data: html } = await axios({
                method: 'GET',
                headers: new Headers({
                    'User-Agent': fakeUserAgent
                }),
                url: scrapeUrl
            })

            const $ = cheerio.load(html)
            const scrapedResult = isbnScraper($);

            if (!scrapedResult) {
                return new Response(JSON.stringify({ error: 'No results found' }), {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            const lastScraped = new Date().toISOString();
            console.log({ scrapedResult })
            // Insert book data
            const { data: insertedBook, error: insertError } = await supabaseClient.rpc(
                'upload_book_and_genres',
                {
                    p_isbn: scrapedResult.isbn || good_reads_book_id,
                    p_authors: scrapedResult.authors
                        .map(author => author.name)
                        .join(', '),
                    p_description: scrapedResult.description,
                    p_good_reads_book_id: scrapedResult.book_id,
                    p_good_reads_image_url: scrapedResult.imageUrl,
                    p_good_reads_rating_count: scrapedResult.ratingsCount,
                    p_good_reads_rating: scrapedResult.averageRating,
                    p_num_pages: scrapedResult.numPages,
                    p_published_date: scrapedResult.publishedDate,
                    p_publisher: scrapedResult.publisher,
                    p_title: scrapedResult.title,
                    p_genres: scrapedResult.genres || [],
                },
            );
            if (insertError) {
                console.error('Error inserting book into database:', insertError);
                return new Response(JSON.stringify({ error: 'Failed to insert book into database' }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            // Add the book to the user's user_scans list
            if (user_id) {
                const { error: userScanError } = await supabaseClient
                    .from('user_scans')
                    .upsert({
                        user_id: user_id,
                        book_id: insertedBook.book.id,
                    });

                if (userScanError) {
                    console.error('Error adding book to user_scans:', userScanError);
                }
            }

            responseData = {
                status: 'Scraped and Inserted',
                result: {
                    book: { ...insertedBook.book, genres: insertedBook.genres || [] },
                    lastScraped: lastScraped,
                    scrapeURL: scrapeUrl,
                    searchType: 'goodreadsURL',
                    numberOfResults: 1
                }
            };
        } catch (error) {
            console.log(error)
            return new Response(
                JSON.stringify({ error: error }),
                {
                    headers: { "Content-Type": "application/json" },
                    status: 400
                }
            )
        }
    }

    return new Response(JSON.stringify(responseData), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1800'
        }
    });
})
