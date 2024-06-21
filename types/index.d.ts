import { Database } from './database.types';

export type Tables<T extends keyof Database['public']['Tables']> =
    Database['public']['Tables'][T]['Row'];

export type TablesInsert<T extends keyof Database['public']['Tables']> =
    Database['public']['Tables'][T]['Insert'];

export type TablesUpdate<T extends keyof Database['public']['Tables']> =
    Database['public']['Tables'][T]['Update'];

export type Enums<T extends keyof Database['public']['Enums']> =
    Database['public']['Enums'][T];

export type Book = Tables<'books'>;
export type InsertBook = TablesInsert<'books'>;
export type UpdateBook = TablesUpdate<'books'>;
export type UserScan = Tables<'user_scans'>;
export type InsertUserScan = TablesInsert<'user_scans'>;
export type BookTag = Tables<'book_tags'>;
export type InsertBookTag = TablesInsert<'book_tags'>;
export type Tag = Tables<'tags'>;
export type InsertTag = TablesInsert<'tags'>;
export type Profile = Tables<'profiles'>;

export type ScanItem = {
    book: BookVolume;
    id: string;
    bookId: string;
    date: string;
};

export type GoogleBooksAPIResponse = {
    items: BookVolume[];
    kind: string;
    totalItems: number;
};

export type BookVolume = {
    accessInfo: AccessInfo;
    etag: string;
    id: string;
    kind: string;
    saleInfo: SaleInfo;
    searchInfo: SearchInfo;
    selfLink: string;
    volumeInfo: VolumeInfo;
};

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
};

export type IndustryIdentifier = {
    identifier: string;
    type: string;
};

export type ReadingModes = {
    image: boolean;
    text: boolean;
};

export type PanelizationSummary = {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
};

export type ImageLinks = {
    smallThumbnail: string;
    thumbnail: string;
    small: string;
    medium: string;
    large: string;
    extraLarge: string;
};

export type ListPrice = {
    amount?: number;
    amountInMicros?: number;
    currencyCode: string;
};

export type RentalDuration = {
    count: number;
    unit: string;
};

export type Offer = {
    finskyOfferType: number;
    listPrice: ListPrice;
    retailPrice: ListPrice;
    giftable?: boolean;
    rentalDuration?: RentalDuration;
};

export type SaleInfo = {
    country: string;
    isEbook: boolean;
    saleability: string;
    listPrice?: ListPrice;
    retailPrice?: ListPrice;
    buyLink?: string;
    offers?: Offer[];
};

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
};

export type EpubAccessInfo = {
    isAvailable: boolean;
    acsTokenLink?: string;
};

export type PdfAccessInfo = {
    isAvailable: boolean;
    acsTokenLink?: string;
};

export type SearchInfo = {
    textSnippet: string;
};
