import supabase from '@/lib/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    BookVolume,
    GoodReadsBookResult,
    BookSearchResultByGID,
    CurrentReadsQuery,
} from '@/types';
import { CurrentlyReadingBook } from '@/types';
import { useAuth } from '@/providers/AuthProvider';

export type BookSearchResponse = {
    author: string;
    authorURL: string;
    goodReadsUrl: string;
    cover: string;
    id: number;
    rating: string;
    title: string;
};

const searchGoodReadsApiOrDbByISBN = async (
    isbn: string,
): Promise<GoodReadsBookResult['result'] | null> => {
    if (!isbn) return null;
    const { data, error } = await supabase.functions.invoke('book-search', {
        body: { isbn },
    });
    if (error) {
        console.error('searchGoodReadsApiOrDbByISBN', error);
        return null;
    }
    return data.result;
};

const searchByGoodReadsId = async (
    good_reads_book_id: string,
): Promise<{
    book: BookSearchResultByGID;
    lastScraped: null | string;
    scrapeURL: null | string;
    searchType: string;
    numberOfResults: null | number;
} | null> => {
    if (!good_reads_book_id) return null;
    const { data, error } = await supabase.functions.invoke('book-search-url', {
        body: { good_reads_book_id },
    });
    if (error) {
        console.error('searchByGoodReadsId', error);
        return null;
    }
    return data.result;
};

export const useSearchByGoodReadsId = (good_reads_book_id: string) => {
    return useQuery({
        queryKey: ['goodreads', good_reads_book_id],
        queryFn: () => searchByGoodReadsId(good_reads_book_id),
        retry: false,
    });
};

const getGoogleBook = async (bookId: string): Promise<BookVolume | null> => {
    const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${bookId}`,
    );
    if (!response.ok) return null;
    const book: BookVolume = await response.json();
    return book;
};

export const useGetGoogleBook = (bookId: string) => {
    return useQuery({
        queryKey: ['googleBooks', bookId],
        queryFn: () => getGoogleBook(bookId),
        retry: false,
    });
};

export const useGetBookByISBN = (isbn: string) => {
    return useQuery({
        queryKey: ['books', { isbn }],
        queryFn: async () => {
            const { error, data } = await supabase
                .from('books')
                .select(
                    `
                    *,
                    book_genres(name)
                `,
                )
                .eq('isbn', isbn)
                .single();

            if (error) {
                throw new Error(error.message);
            }

            return data;
        },
    });
};

type BookWithUserBooks = {
    id: number;
    created_at: string;
    title: string;
    authors: string;
    google_rating?: number | null;
    series_name?: string | null;
    description: string;
    google_books_id?: string | null;
    google_details_link?: string | null;
    publisher: string;
    good_reads_description?: string | null;
    num_pages: number;
    published_date: string;
    good_reads_rating: number;
    good_reads_image_url: string;
    good_reads_rating_count: number;
    good_reads_book_id: string;
    isbn: string;
    genres: {
        genre: {
            name: string;
        };
    }[];
    user_books: {
        id: number;
    }[];
};

export const useGetBookById = (bookId: number) => {
    return useQuery({
        queryKey: ['books', { bookId }],
        queryFn: async () => {
            const { error, data } = await supabase
                .from('books')
                .select(
                    `*, genres:book_genres(
                            genre:genre_id(name)
                        ), 
                        user_books(id)`,
                )
                .eq('id', bookId)
                .returns<BookWithUserBooks[]>()
                .single();
            if (error) {
                throw new Error(error.message);
            }

            return data;
        },
    });
};

export const useGetCurrentlyReadingBooks = () => {
    const { profile } = useAuth();
    const user_id = profile?.id;
    return useQuery({
        queryKey: ['user_books', user_id, 'currently_reading'],
        queryFn: async () => {
            if (!user_id) throw new Error('User not found');
            const { data, error } = await supabase
                .from('user_books')
                .select(
                    `
                    id,
                    book:book_id(
                        id,
                        title,
                        authors,
                        good_reads_image_url,
                        num_pages
                    ),
                    exclusive_shelf,
                    end_date,
                    reading_sessions(
                        end_page
                    )
                `,
                )
                .eq('user_id', user_id)
                .eq('exclusive_shelf', 'reading')
                .order('created_at', { ascending: false })
                .returns<CurrentReadsQuery>();

            if (error) {
                throw new Error(error.message);
            }

            if (!data) {
                return [];
            }
            return data.map((item): CurrentlyReadingBook => {
                const lastReadingSession = item.reading_sessions[0]
                    ? item.reading_sessions[item.reading_sessions.length - 1]
                    : null;
                return {
                    coverUrl: item.book.good_reads_image_url,
                    title: item.book.title,
                    authors: item.book.authors,
                    pages: item.book.num_pages,
                    currentPage: lastReadingSession?.end_page,
                    deadline: item.end_date,
                    bookId: item.book.id,
                };
            });
        },
    });
};

export const useSearchBookAndSaveIfFound = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(isbn: string) {
            // 1. Fetch book data from GoodReads API
            const goodReadsBook = await searchGoodReadsApiOrDbByISBN(isbn);
            if (!goodReadsBook) throw new Error('Book not found');
            return goodReadsBook;
        },
        onSuccess: () => {
            // Invalidate and refetch relevant queries
            queryClient.invalidateQueries({ queryKey: ['books'] });
            queryClient.invalidateQueries({ queryKey: ['genres'] });
            queryClient.invalidateQueries({ queryKey: ['user_scans'] });
        },
    });
};

export const useSearchBooks = (query: string) => {
    return useQuery({
        queryKey: ['search', query],
        queryFn: async () => {
            if (!query || query.length < 3) return [];
            const {
                data,
                error,
            }: { data: BookSearchResponse[] | null; error: any } =
                await supabase.functions.invoke('book-search-list', {
                    body: JSON.stringify({ query }),
                });
            if (error) {
                throw new Error(error.message);
            }

            return data;
        },
    });
};
