// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts"
import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12";

console.log("Hello from Functions!")

const generateUrl = (slug: string) =>
  `https://www.goodreads.com/search?q=${encodeURIComponent(slug)}`;

const fakeUserAgent = `{"isYaBrowser":false,"isAuthoritative":true,"isMobile":false,"isMobileNative":false,"isTablet":false,"isiPad":false,"isiPod":false,"isiPhone":false,"isiPhoneNative":false,"isAndroid":false,"isAndroidNative":false,"isBlackberry":false,"isOpera":false,"isIE":false,"isEdge":false,"isIECompatibilityMode":false,"isSafari":false,"isFirefox":true,"isWebkit":false,"isChrome":false,"isKonqueror":false,"isOmniWeb":false,"isSeaMonkey":false,"isFlock":false,"isAmaya":false,"isPhantomJS":false,"isEpiphany":false,"isDesktop":true,"isWindows":true,"isLinux":false,"isLinux64":false,"isMac":false,"isChromeOS":false,"isBada":false,"isSamsung":false,"isRaspberry":false,"isBot":false,"isCurl":false,"isAndroidTablet":false,"isWinJs":false,"isKindleFire":false,"isSilk":false,"isCaptive":false,"isSmartTV":false,"isUC":false,"isFacebook":false,"isAlamoFire":false,"isElectron":false,"silkAccelerated":false,"browser":"Firefox","version":"128.0","os":"Windows 10.0","platform":"Microsoft Windows","geoIp":{},"source":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0","isWechat":false}`

function extractBookInfo($: cheerio.CheerioAPI) {
  const dataHTML = $('script[type="application/json"]').html();
  if (!dataHTML) {
    return {};
  }
  const jsonData = JSON.parse(dataHTML);
  const apolloState = jsonData.props.pageProps.apolloState;

  const authorsKey: string[] = Object.keys(apolloState).filter((key) => {
    return key.startsWith('Contributor:kca://author/amzn1.gr.author');
  });
  const bookKey: string = Object.keys(apolloState).find(
    (key) =>
      key.startsWith('Book:kca://book/amzn1.gr.book') &&
      apolloState[key].title
  )!;

  const book = apolloState[bookKey];

  const authors = authorsKey
    .map((key: string) => {
      const author = apolloState[key];
      return {
        name: author.name,
        webUrl: author.webUrl
      };
    })
    .filter((a) => a.name);
  // Find the work object key
  const workKey: string = Object.keys(apolloState).find((key) =>
    key.startsWith('Work:kca://work/amzn1.gr.work')
  )!;
  const work = apolloState[workKey];

  // Extract genres
  const genres = book.bookGenres.map((item: any) => item.genre.name);

  const bookInfo = {
    title: book.title,
    authors: authors,
    description: book['description({"stripped":true})'],
    publisher: book.details.publisher,
    publishedDate: new Date(book.details.publicationTime)
      .toISOString()
      .split('T')[0],
    numPages: book.details.numPages,
    averageRating: work.stats.averageRating,
    ratingsCount: work.stats.ratingsCount,
    imageUrl: book.imageUrl,
    book_id: jsonData.query.book_id,
    genres: genres,
    isbn: book.details.isbn
  };
  return bookInfo;
}

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
    // return res.send(htmlString);
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