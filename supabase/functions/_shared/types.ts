export type GoodReadsBookResult = {
    title: string;
    authors: {
        name: string;
        webUrl: string;
    }[];
    description: string;
    publisher: string;
    publishedDate: string;
    numPages: number;
    averageRating: number;
    ratingsCount: number;
    imageUrl: string;
    book_id: string;
    genres: string[];
    isbn: string;
};

export type InsertBook = {
    authors: string;
    description: string;
    good_reads_book_id: string;
    good_reads_description: string;
    good_reads_image_url: string;
    good_reads_rating_count: number;
    good_reads_rating: number;
    google_books_id: string | null;
    google_details_link: string;
    isbn: string;
    num_pages: number;
    published_date: string;
    publisher: string;
    title: string;
};