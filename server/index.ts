import express from 'express';
import useragent from 'express-useragent';
import * as cheerio from 'cheerio';

const app = express();
app.use(useragent.express());
const port = 8080;

const generateUrl = (slug: string) =>
    `https://www.goodreads.com/search?q=${encodeURIComponent(slug)}`;

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

function extractBookInfoFromTable($: cheerio.CheerioAPI) {
    const result = $('table > tbody > tr')
        .map((i, el) => {
            const $el = $(el);
            const cover = $el.find('tr > td > a > img').attr('src');
            const title = $el.find('tr > td:nth-child(2) > a > span').text();
            const bookURL = $el.find('tr > td:nth-child(2) > a').attr('href');
            const author = $el
                .find(
                    "tr > td:nth-child(2) > span[itemprop = 'author'] > div > a > span[itemprop = 'name']"
                )
                .html();
            const authorURL = $el
                .find(
                    "tr > td:nth-child(2) > span[itemprop = 'author'] > div > a"
                )
                .attr('href')
                .replace('https://www.goodreads.com', '')
                .split('?')[0];
            const rating = $el
                .find(
                    'tr > td:nth-child(2) > div > span.greyText.smallText.uitext > span.minirating'
                )
                .text();

            const id = i + 1;
            return {
                id: id,
                cover: cover,
                title: title,
                bookURL: bookURL,
                author: author,
                authorURL: authorURL,
                rating: rating
            };
        })
        .toArray();
    return result;
}

function extractBookInfoFromBookPage(
    $: cheerio.CheerioAPI,
    res: express.Response
) {
    const cover = $('.ResponsiveImage').attr('src');
    const series = $('h3.Text__italic').text();
    const seriesURL = $('h3.Text__italic > a').attr('href');
    const workURL = $('meta[property="og:url"]').attr('content');
    const title = $('h1[data-testid="bookTitle"]').text();
    const author = $('.ContributorLinksList > span > a')
        .map((i, el) => {
            const $el = $(el);
            const name = $el.find('span').text();
            const url = $el
                .attr('href')
                .replace('https://www.goodreads.com', '');
            const id = i + 1;
            return {
                id: id,
                name: name,
                url: url
            };
        })
        .toArray();
    const rating = $('div.RatingStatistics__rating').text().slice(0, 4);
    const ratingCount = $('[data-testid="ratingsCount"]')
        .text()
        .split('rating')[0];
    const reviewsCount = $('[data-testid="reviewsCount"]').text();
    const desc = $('[data-testid="description"]').text();
    const genres = $('[data-testid="genresList"] > ul > span > span')
        .map((i, el) => $(el).find('span').text().replace('Genres', ''))
        .get();
    const bookEdition = $('[data-testid="pagesFormat"]').text();
    const publishDate = $('[data-testid="publicationInfo"]').text();
    const related = $('div.DynamicCarousel__itemsArea > div > div')
        .map((i, el) => {
            const $el = $(el);
            const title = $el
                .find('div > a > div:nth-child(2) > [data-testid="title"]')
                .html();
            const author = $el
                .find('div > a > div:nth-child(2) > [data-testid="author"]')
                .html();
            const src = $el
                .find('div > a > div:nth-child(1) > div > div > img')
                .attr('src');
            const url = $el
                .find('div > a')
                .attr('href')
                .replace('https://www.goodreads.com', '');
            const id = i + 1;
            return {
                id: id,
                src: src,
                title: title,
                author: author,
                url: url
            };
        })
        .toArray();

    const rating5 = $(
        '.ReviewsSectionStatistics__histogram > div > div:nth-child(1) > div:nth-child(3)'
    )
        .text()
        .split('(')[0]
        .replace(' ', '');
    const rating4 = $(
        '.ReviewsSectionStatistics__histogram > div > div:nth-child(2) > div:nth-child(3)'
    )
        .text()
        .split('(')[0]
        .replace(' ', '');
    const rating3 = $(
        '.ReviewsSectionStatistics__histogram > div > div:nth-child(3) > div:nth-child(3)'
    )
        .text()
        .split('(')[0]
        .replace(' ', '');

    const rating2 = $(
        '.ReviewsSectionStatistics__histogram > div > div:nth-child(4) > div:nth-child(3)'
    )
        .text()
        .split('(')[0]
        .replace(' ', '');

    const rating1 = $(
        '.ReviewsSectionStatistics__histogram > div > div:nth-child(5) > div:nth-child(3)'
    )
        .text()
        .split('(')[0]
        .replace(' ', '');

    const reviewBreakdown = {
        rating5: rating5,
        rating4: rating4,
        rating3: rating3,
        rating2: rating2,
        rating1: rating1
    };

    const reviews = $('.ReviewsList > div:nth-child(2) > div')
        .filter(Boolean)
        .map((i, el) => {
            const $el = $(el);
            const image = $el
                .find('div > article > div > div > section > a > img')
                .attr('src');
            const author = $el
                .find(
                    'div > article > div > div > section:nth-child(2) > span:nth-child(1) > div > a'
                )
                .text();
            const date = $el
                .find(
                    'div > article > section > section:nth-child(1) > span > a'
                )
                .text();
            const stars = $el
                .find(
                    'div > article > section > section:nth-child(1) > div > span'
                )
                .attr('aria-label');
            const text = $el
                .find(
                    'div > article > section > section:nth-child(2) > section > div > div > span'
                )
                .html();
            const likes = $el
                .find(
                    'div > article > section > footer > div > div:nth-child(1) > button > span'
                )
                .text();
            const id = i + 1;

            return {
                id: id,
                image: image,
                author: author,
                date: date,
                stars: stars,
                text: text,
                likes: likes
            };
        })
        .toArray();

    const quotes = $(
        'div.BookDiscussions > div.BookDiscussions__list > a.DiscussionCard:nth-child(1) > div.DiscussionCard__middle > div.DiscussionCard__stats'
    ).text();
    const quotesURL = $(
        'div.BookDiscussions > div.BookDiscussions__list > a.DiscussionCard:nth-child(1)'
    ).attr('href');

    const questions = $(
        'div.BookDiscussions > div.BookDiscussions__list > a.DiscussionCard:nth-child(3) > div.DiscussionCard__middle > div.DiscussionCard__stats'
    ).text();
    const questionsURL = $(
        'div.BookDiscussions > div.BookDiscussions__list > a.DiscussionCard:nth-child(3)'
    ).attr('href');
    const lastScraped = new Date().toISOString();
    {
        title === '' ? (res.statusCode = 504) : (res.statusCode = 200);
    }

    return {
        status: 'Received',
        statusCode: res.statusCode,
        source: 'https://github.com/nesaku/biblioreads',
        cover: cover,
        series: series,
        seriesURL: seriesURL,
        workURL: workURL,
        title: title,
        author: author,
        rating: rating,
        ratingCount: ratingCount,
        reviewsCount: reviewsCount,
        desc: desc,
        genres: genres,
        bookEdition: bookEdition,
        publishDate: publishDate,
        related: related,
        reviewBreakdown: reviewBreakdown,
        reviews: reviews,
        quotes: quotes,
        quotesURL: quotesURL,
        questions: questions,
        questionsURL: questionsURL,
        lastScraped: lastScraped
    };
}

app.get('/book', async (req, res) => {
    const { book } = req.query;
    const scrapeURL = generateUrl(book as string);
    try {
        const response = await fetch(`${scrapeURL}`, {
            method: 'GET',
            headers: new Headers({
                'User-Agent':
                    req.useragent ||
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
            })
        });
        const htmlString = await response.text();
        const $ = cheerio.load(htmlString);
        const numberOfResults = $('.leftContainer > h3').text();
        const result = extractBookInfoFromTable($);

        const lastScraped = new Date().toISOString();
        res.statusCode = 200;
        res.setHeader(
            'Cache-Control',
            'public, s-maxage=600, stale-while-revalidate=1800'
        );
        return res.json({
            status: 'Received',
            scrapeURL: scrapeURL,
            searchType: 'books',
            numberOfResults: numberOfResults,
            result: result,
            lastScraped: lastScraped
        });
    } catch (error) {
        res.statusCode = 404;
        console.error('An error has occurred with the scraper.');
        return res.json({
            status: 'Error - Invalid Query',
            scrapeURL: scrapeURL
        });
    }
});

app.get('/isbn', async (req, res) => {
    const { isbn } = req.query;
    const scrapeURL = generateUrl(isbn as string);
    try {
        const response = await fetch(`${scrapeURL}`, {
            method: 'GET',
            headers: new Headers({
                'User-Agent':
                    req.useragent ||
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
            })
        });
        const htmlString = await response.text();
        // return res.send(htmlString);
        const $ = cheerio.load(htmlString);
        const numberOfResults = $('.leftContainer > h3').text();
        const result = extractBookInfo($);

        const lastScraped = new Date().toISOString();
        res.statusCode = 200;
        res.setHeader(
            'Cache-Control',
            'public, s-maxage=600, stale-while-revalidate=1800'
        );
        return res.json({
            status: 'Received',
            scrapeURL: scrapeURL,
            searchType: 'books',
            numberOfResults: numberOfResults,
            result: result,
            lastScraped: lastScraped
        });
    } catch (error) {
        res.statusCode = 404;
        console.error('An error has occurred with the scraper.');
        console.log(error);
        return res.json({
            status: 'Error - Invalid Query',
            scrapeURL: scrapeURL,
            error
        });
    }
});

app.get('/bookPath', async (req, res) => {
    const { bookPath } = req.query;
    try {
        const response = await fetch(`${bookPath}`, {
            method: 'GET',
            headers: new Headers({
                'User-Agent':
                    req.useragent ||
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
            })
        });
        console.log(req.useragent);
        const htmlString = await response.text();
        const $ = cheerio.load(htmlString);
        const result = extractBookInfoFromBookPage($, res);
        result.scrapeURL = bookPath;
        return res.json(result);
    } catch (error) {
        res.statusCode = 404;
        console.error('An error has occurred with the scraper.');
        return res.json({
            status: 'Error - Invalid Query',
            scrapeURL: scrapeURL
        });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
