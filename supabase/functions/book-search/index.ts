import "@supabase/functions-js"
import * as cheerio from "cheerio";
import { createClient } from 'jsr:@supabase/supabase-js@2'

import {
    fakeUserAgent,
    generateUrl,
} from "../_shared/utils.ts";

import {
    isbnScraper,
    bookPathScraper,
    bookSearchScraper
} from "../_shared/scrapers.ts";

Deno.serve(async (req) => {
    const { isbn, bookSearch, bookPath } = await req.json()
    const scrapeURL = bookPath ? bookPath : generateUrl(isbn);
    const scraper = isbn ? isbnScraper : bookSearch ? bookSearchScraper : bookPathScraper;

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
        const result = scraper($);

        const lastScraped = new Date().toISOString();
        const responseData = {
            status: 'Received',
            scrapeURL: scrapeURL,
            searchType: 'books',
            numberOfResults: numberOfResults,
            result: result,
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
