import "@supabase/functions-js"
import * as cheerio from "cheerio";
import { createClient } from 'jsr:@supabase/supabase-js@2'

import {
    fakeUserAgent,
    generateUrl
} from "../_shared/utils.ts";

import {
    isbnScraper,
} from "../_shared/scrapers.ts";

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

    const { isbn } = await req.json()
    if (!isbn) {
        return new Response(JSON.stringify({ error: 'ISBN is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Check if the book exists in the database
    const { data: bookData, error: bookError } = await supabaseClient
        .from('books')
        .select(`
            *,
            book_genres (
                genres (name)
            )
        `)
        .eq('isbn', isbn)
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
                });

            if (userScanError) {
                console.error('Error adding book to user_scans:', userScanError);
            }
        }

        // Extract genres from the nested structure
        const genres = bookData.book_genres.map((bg: { genres: { name: string } }) => bg.genres.name);

        responseData = {
            status: 'Found in database',
            result: {
                book: { ...bookData, genres },
                lastScraped: null,
                scrapeURL: null,
                searchType: 'isbn',
                numberOfResults: null
            }
        };
    } else {
        // If book not found in database, proceed with scraping
        const scrapeURL = generateUrl(isbn);
        const scraper = isbnScraper;

        try {
            const response = await fetch(`${scrapeURL}`, {
                method: 'GET',
                headers: new Headers({
                    'User-Agent': fakeUserAgent
                })
            });
            const htmlString = await response.text();
            const $ = cheerio.load(htmlString);
            const numberOfResults = $('.leftContainer > h3').text();
            const scrapedResult = scraper($);

            if (!scrapedResult) {
                return new Response(JSON.stringify({ error: 'No results found' }), {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            const lastScraped = new Date().toISOString();

            // Insert book data
            const { data: insertedBook, error: insertError } = await supabaseClient.rpc(
                'upload_book_and_genres',
                {
                    p_isbn: isbn,
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
                    book: insertedBook,
                    lastScraped: lastScraped,
                    scrapeURL: scrapeURL,
                    searchType: 'isbn',
                    numberOfResults: numberOfResults
                }
            };
        } catch (error) {
            console.error('An error has occurred with the scraper.');
            console.log(error);

            return new Response(JSON.stringify({
                status: 'Error - Invalid Query',
                error: error.message,
                scrapeURL: scrapeURL
            }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
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
