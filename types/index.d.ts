export type ScanItem = {
    book: BookVolume;
    id: string;
    bookId: string;
    date: string;
}

export type GoogleBooksAPIResponse = {
    items: BookVolume[];
    kind: string;
    totalItems: number;
}

export type BookVolume = {
    accessInfo: AccessInfo;
    etag: string;
    id: string;
    kind: string;
    saleInfo: SaleInfo;
    searchInfo: SearchInfo;
    selfLink: string;
    volumeInfo: VolumeInfo;
}

export type VolumeInfo = {
    allowAnonLogging: boolean;
    authors: string[];
    averageRating?: number;
    canonicalVolumeLink: string;
    contentVersion: string;
    description?: string;
    imageLinks: ImageLinks;
    industryIdentifiers: IndustryIdentifier[];
    infoLink: string;
    language: string;
    maturityRating: string;
    pageCount: number;
    panelizationSummary: PanelizationSummary;
    previewLink: string;
    printType: string;
    publishedDate: string;
    publisher: string;
    ratingsCount?: number;
    readingModes: ReadingModes;
    subtitle?: string;
    title: string;
    categories?: string[];
}

export type IndustryIdentifier = {
    identifier: string;
    type: string;
}

export type ReadingModes = {
    image: boolean;
    text: boolean;
}

export type PanelizationSummary = {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
}

export type ImageLinks = {
    smallThumbnail: string;
    thumbnail: string;
}

export type ListPrice = {
    amount?: number;
    amountInMicros?: number;
    currencyCode: string;
}

export type RentalDuration = {
    count: number;
    unit: string;
}

export type Offer = {
    finskyOfferType: number;
    listPrice: ListPrice;
    retailPrice: ListPrice;
    giftable?: boolean;
    rentalDuration?: RentalDuration;
}

export type SaleInfo = {
    country: string;
    isEbook: boolean;
    saleability: string;
    listPrice?: ListPrice;
    retailPrice?: ListPrice;
    buyLink?: string;
    offers?: Offer[];
}

export type AccessInfo = {
    accessViewStatus: string;
    country: string;
    embeddable: boolean;
    epub: EpubAccessInfo;
    pdf: PdfAccessInfo;
    publicDomain: boolean;
    quoteSharingAllowed: boolean;
    textToSpeechPermission: string;
    viewability: string;
    webReaderLink: string;
}

export type EpubAccessInfo = {
    isAvailable: boolean;
    acsTokenLink?: string;
}

export type PdfAccessInfo = {
    isAvailable: boolean;
    acsTokenLink?: string;
}

export type SearchInfo = {
    textSnippet: string;
}
