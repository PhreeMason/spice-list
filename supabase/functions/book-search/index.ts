import "@supabase/functions-js"
import * as cheerio from "cheerio";
import { createClient } from 'jsr:@supabase/supabase-js@2'

import {
    fakeUserAgent,
    generateUrl,
    getBookDetailsFromGoodReads
} from "../_shared/utils.ts";

import {
    isbnScraper,
} from "../_shared/scrapers.ts";

import { InsertBook } from "../_shared/types.ts";

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
        .select('*')
        .eq('isbn', isbn)
        .single()

    if (bookData) {
        // Book found in the database, return it
        return new Response(JSON.stringify({
            status: 'Found in database',
            result: bookData
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1800'
            }
        });
    }

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

        const result = getBookDetailsFromGoodReads(scrapedResult);
        const lastScraped = new Date().toISOString();

        // Prepare data for insertion
        const insertBook: InsertBook = {
            isbn: isbn,
            title: result.title,
            authors: result.authors,
            description: result.description,
            good_reads_book_id: result.goodReadsBookId,
            good_reads_description: result.description,
            good_reads_image_url: result.imageUrl,
            good_reads_rating_count: result.ratingCount,
            good_reads_rating: result.rating,
            google_books_id: null,
            google_details_link: '',
            image_url: result.imageUrl,
            isbn_10: result.isbn10 || '',
            isbn_13: result.isbn13 || '',
            language: result.language,
            page_count: result.numberOfPages,
            publication_date: result.publicationDate,
            publisher: result.publisher,
            last_scraped: lastScraped
        };

        // Insert book data
        const { data: insertedBook, error: insertError } = await supabaseClient
            .from('books')
            .upsert(insertBook, { onConflict: 'isbn' })
            .select()
            .single();

        if (insertError) {
            console.error('Error inserting book into database:', insertError);
            return new Response(JSON.stringify({ error: 'Failed to insert book into database' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Insert genres
        if (result.genres && result.genres.length > 0) {
            const { error: genresError } = await supabaseClient
                .from('book_genres')
                .upsert(
                    result.genres.map(genre => ({
                        book_id: insertedBook.id,
                        genre: genre
                    })),
                    { onConflict: 'book_id,genre' }
                );

            if (genresError) {
                console.error('Error inserting genres:', genresError);
            }
        }

        const responseData = {
            status: 'Scraped and Inserted',
            scrapeURL: scrapeURL,
            searchType: 'isbn',
            numberOfResults: numberOfResults,
            result: insertedBook,
            lastScraped: lastScraped
        };

        return new Response(JSON.stringify(responseData), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1800'
            }
        });
    } catch (error) {
        console.error('An error has occurred with the scraper.');
        console.log(error);

        const errorData = {
            status: 'Error - Invalid Query',
            scrapeURL: scrapeURL,
            error: error.message
        };

        return new Response(JSON.stringify(errorData), {
            status: 404,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
})
