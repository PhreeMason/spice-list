import * as cheerio from "cheerio";

export const fakeUserAgent = `{"isYaBrowser":false,"isAuthoritative":true,"isMobile":false,"isMobileNative":false,"isTablet":false,"isiPad":false,"isiPod":false,"isiPhone":false,"isiPhoneNative":false,"isAndroid":false,"isAndroidNative":false,"isBlackberry":false,"isOpera":false,"isIE":false,"isEdge":false,"isIECompatibilityMode":false,"isSafari":false,"isFirefox":true,"isWebkit":false,"isChrome":false,"isKonqueror":false,"isOmniWeb":false,"isSeaMonkey":false,"isFlock":false,"isAmaya":false,"isPhantomJS":false,"isEpiphany":false,"isDesktop":true,"isWindows":true,"isLinux":false,"isLinux64":false,"isMac":false,"isChromeOS":false,"isBada":false,"isSamsung":false,"isRaspberry":false,"isBot":false,"isCurl":false,"isAndroidTablet":false,"isWinJs":false,"isKindleFire":false,"isSilk":false,"isCaptive":false,"isSmartTV":false,"isUC":false,"isFacebook":false,"isAlamoFire":false,"isElectron":false,"silkAccelerated":false,"browser":"Firefox","version":"128.0","os":"Windows 10.0","platform":"Microsoft Windows","geoIp":{},"source":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0","isWechat":false}`

export const generateUrl = (slug: string) =>
  `https://www.goodreads.com/search?q=${encodeURIComponent(slug)}`;

export function extractBookInfo($: cheerio.CheerioAPI) {
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