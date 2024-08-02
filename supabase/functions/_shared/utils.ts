import { GoodReadsBookResult, InsertBook } from "./types.ts";

export const fakeUserAgent = `{"isYaBrowser":false,"isAuthoritative":true,"isMobile":false,"isMobileNative":false,"isTablet":false,"isiPad":false,"isiPod":false,"isiPhone":false,"isiPhoneNative":false,"isAndroid":false,"isAndroidNative":false,"isBlackberry":false,"isOpera":false,"isIE":false,"isEdge":false,"isIECompatibilityMode":false,"isSafari":false,"isFirefox":true,"isWebkit":false,"isChrome":false,"isKonqueror":false,"isOmniWeb":false,"isSeaMonkey":false,"isFlock":false,"isAmaya":false,"isPhantomJS":false,"isEpiphany":false,"isDesktop":true,"isWindows":true,"isLinux":false,"isLinux64":false,"isMac":false,"isChromeOS":false,"isBada":false,"isSamsung":false,"isRaspberry":false,"isBot":false,"isCurl":false,"isAndroidTablet":false,"isWinJs":false,"isKindleFire":false,"isSilk":false,"isCaptive":false,"isSmartTV":false,"isUC":false,"isFacebook":false,"isAlamoFire":false,"isElectron":false,"silkAccelerated":false,"browser":"Firefox","version":"128.0","os":"Windows 10.0","platform":"Microsoft Windows","geoIp":{},"source":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0","isWechat":false}`

export const generateUrl = (slug: string) =>
  `https://www.goodreads.com/search?q=${encodeURIComponent(slug)}`;


export const getBookDetailsFromGoodReads = (
    goodReadsBook: GoodReadsBookResult,
): InsertBook => {
    return {
        authors: goodReadsBook.authors.join(', '),
        description: goodReadsBook.description || '',
        good_reads_book_id: goodReadsBook.book_id,
        good_reads_description: goodReadsBook.description,
        good_reads_image_url: goodReadsBook.imageUrl,
        good_reads_rating_count: goodReadsBook.ratingsCount,
        good_reads_rating: goodReadsBook.averageRating,
        google_books_id: null,
        google_details_link: goodReadsBook.book_id,
        isbn: goodReadsBook.isbn,
        num_pages: goodReadsBook.numPages,
        published_date: goodReadsBook.publishedDate,
        publisher: goodReadsBook.publisher || '',
        title: goodReadsBook.title,
    };
};