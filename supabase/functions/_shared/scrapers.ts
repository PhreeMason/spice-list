import * as cheerio from "cheerio";
import { GoodReadsBookResult, BookPathResponse } from "./types.ts";

export function isbnScraper($: cheerio.CheerioAPI): GoodReadsBookResult | null {
  const dataHTML = $('script[type="application/json"]').html();
  if (!dataHTML) {
    return null;
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
        name: author.name?.replace(/\s+/g, ' '),
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

export function bookPathScraper(
  $: cheerio.CheerioAPI
): BookPathResponse {
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
              ?.replace('https://www.goodreads.com', '');
          const id = i + 1;
          return {
              id: id,
              name: name?.replace(/\s+/g, ' '),
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
              ?.attr('href')
              ?.replace('https://www.goodreads.com', '');
          const id = i + 1;
          return {
              id: id,
              src: src,
              title: title,
              author: author?.replace(/\s+/g, ' '),
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


  const lastScraped = new Date().toISOString();
  return {
      status: 'Received',
      statusCode: 200,
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
      lastScraped: lastScraped
  };
}

export function bookSearchScraper($: cheerio.CheerioAPI): {
    id: number;
    cover?: string;
    title: string;
    goodReadsUrl?: string;
    author: string | null;
    authorURL?: string;
    rating: string;
  }[] {
  const result = $('table > tbody > tr')
      .map((i, el) => {
          const $el = $(el);
          const cover = $el.find('tr > td > a > img').attr('src');
          const title = $el.find('tr > td:nth-child(2) > a > span').text();
          const goodReadsUrl = $el.find('tr > td:nth-child(2) > a').attr('href');
          const author = $el
              .find(
                  "tr > td:nth-child(2) > span[itemprop = 'author'] > div > a > span[itemprop = 'name']"
              )
              .html();
          const authorURL = $el
              .find(
                  "tr > td:nth-child(2) > span[itemprop = 'author'] > div > a"
              )
              ?.attr('href')
              ?.replace('https://www.goodreads.com', '')
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
              goodReadsUrl: goodReadsUrl?.replace('/book/show/', '').split('?')[0],
              author: author,
              authorURL: authorURL,
              rating: rating
          };
      })
      .toArray();
  return result;
}