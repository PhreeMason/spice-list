import "@supabase/functions-js";
import * as cheerio from "cheerio";
import { createClient } from 'jsr:@supabase/supabase-js@2';
import axios from "axios";

import {
    fakeUserAgent,
    generateUrl
} from "../_shared/utils.ts";

import {
    bookSearchScraper
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

    const { query } = await req.json()

    if (!query || !user_id) {
        return new Response(JSON.stringify({ error: 'query and user is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const scrapeUrl = generateUrl(query);
    console.log({ scrapeUrl })
    try {
        const { data: html } = await axios({
            method: 'GET',
            headers: new Headers({
                'User-Agent': fakeUserAgent
            }),
            url: scrapeUrl
        })

        const $ = cheerio.load(html)
        const data = bookSearchScraper($);

        return new Response(
            JSON.stringify(data),
            {
                headers: { "Content-Type": "application/json" },
                status: 200
            }
        )
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
})

