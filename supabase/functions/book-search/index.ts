import "@supabase/functions-js"
import * as cheerio from "cheerio";
import { createClient } from 'jsr:@supabase/supabase-js@2'

import { fakeUserAgent, extractBookInfo, generateUrl } from "../_shared/utils.ts";

Deno.serve(async (req) => {
  const { isbn } = await req.json()
  const scrapeURL = generateUrl(isbn);

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
    const result = extractBookInfo($);

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

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/search-book' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"isbn":"9780671212094"}'

*/