import supabase from '@/lib/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    BookVolume,
    GoodReadsBookResult,
    GoogleBooksAPIResponse,
    InsertBook,
    CurrentReadsQuery,
} from '@/types';
import { CurrentlyReadingBook } from '@/types';
import { useAuth } from '@/providers/AuthProvider';

const getBookDetailsFromGoogleBooks = (googleBook: BookVolume): InsertBook => {
    return {
        authors: googleBook.volumeInfo.authors.join(', '),
        description: googleBook.volumeInfo.description || '',
        isbn: googleBook.volumeInfo.industryIdentifiers[0].identifier || '',
        google_books_id: googleBook.id,
        google_details_link: googleBook.selfLink,
        publisher: googleBook.volumeInfo.publisher,
        title: googleBook.volumeInfo.title,
    };
};

const searchGoogleBooksApi = async (
    isbn: string,
): Promise<BookVolume | null> => {
    if (!isbn) return null;
    const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
    );
    const json: GoogleBooksAPIResponse = await response.json();
    const book = json?.items[0] || null;
    return book;
};

const searchGoodReadsApiOrDb = async (
    isbn: string,
): Promise<GoodReadsBookResult['result'] | null> => {
    if (!isbn) return null;
    const { data, error } = await supabase.functions.invoke('book-search', {
        body: { isbn },
    });
    if (error) {
        console.error('searchGoodReadsApiOrDb', error);
        return null;
    }
    return data.result;
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

export const useGoodReadsBooks = (isbn: string) => {
    return useQuery({
        queryKey: ['goodReadsBooks', isbn],
        queryFn: () => searchGoodReadsApiOrDb(isbn),
    });
};

export const useGoogleBooks = (isbn: string) => {
    return useQuery({
        queryKey: ['googleBooks', isbn],
        queryFn: () => searchGoogleBooksApi(isbn),
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

export const useUpsertGoogleBook = () => {
    return useMutation({
        async mutationFn(isbn: string) {
            const googleBook = await searchGoogleBooksApi(isbn);
            if (!googleBook) throw new Error('Book not found');
            const data = getBookDetailsFromGoogleBooks(googleBook);
            const { data: book, error } = await supabase
                .from('books')
                .upsert(data, { onConflict: 'google_books_id' })
                .select('*')
                .single();

            if (error) {
                throw new Error(error.message);
            }
            return book;
        },
    });
};

export const useUploadBookAndGenres = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(isbn: string) {
            // 1. Fetch book data from GoodReads API
            const goodReadsBook = await searchGoodReadsApiOrDb(isbn);
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
            console.log('query', query);
            const { data, error } = await await supabase.functions.invoke('book-search-list', {
                body: JSON.stringify({ query }),
            })
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
}