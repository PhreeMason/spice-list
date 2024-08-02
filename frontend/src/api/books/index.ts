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

const getBookDetailsFromGoodReads = (
    goodReadsBook: GoodReadsBookResult['result'],
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

const searchGoodReadsApi = async (
    isbn: string,
): Promise<GoodReadsBookResult['result'] | null> => {
    if (!isbn) return null;
    const { data, error } = await supabase.functions.invoke('book-search', {
        body: { isbn },
    });
    if (error) {
        console.error('searchGoodReadsApi', error);
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

export const useGoogleBooks = (isbn: string) => {
    return useQuery({
        queryKey: ['googleBooks', isbn],
        queryFn: () => searchGoogleBooksApi(isbn),
    });
};

export const useGoodReadsBooks = (isbn: string) => {
    return useQuery({
        queryKey: ['goodReadsBooks', isbn],
        queryFn: () => searchGoodReadsApi(isbn),
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

export const useUpsertGoodReadsBook = () => {
    const queryClient = useQueryClient();
    return useMutation({
        async mutationFn(isbn: string) {
            const goodReadsBook = await searchGoodReadsApi(isbn);
            if (!goodReadsBook) throw new Error('Book not found');
            const data = getBookDetailsFromGoodReads(goodReadsBook);
            const { data: book, error } = await supabase
                .from('books')
                .upsert(data, { onConflict: 'good_reads_book_id' })
                .select('*')
                .single();
            if (error) {
                throw new Error(error.message);
            }
            return book;
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['books'] });
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
            const goodReadsBook = await searchGoodReadsApi(isbn);
            if (!goodReadsBook) throw new Error('Book not found');

            // 2. Prepare book data for insertion
            const { data, error } = await supabase.rpc(
                'upload_book_and_genres',
                {
                    p_isbn: isbn,
                    p_authors: goodReadsBook.authors
                        .map(author => author.name)
                        .join(', '),
                    p_description: goodReadsBook.description,
                    p_good_reads_book_id: goodReadsBook.book_id,
                    p_good_reads_image_url: goodReadsBook.imageUrl,
                    p_good_reads_rating_count: goodReadsBook.ratingsCount,
                    p_good_reads_rating: goodReadsBook.averageRating,
                    p_num_pages: goodReadsBook.numPages,
                    p_published_date: goodReadsBook.publishedDate,
                    p_publisher: goodReadsBook.publisher,
                    p_title: goodReadsBook.title,
                    p_genres: goodReadsBook.genres || [],
                },
            );

            if (error) throw new Error(error.message);

            return data;
        },
        onSuccess: () => {
            // Invalidate and refetch relevant queries
            queryClient.invalidateQueries({ queryKey: ['books'] });
            queryClient.invalidateQueries({ queryKey: ['genres'] });
        },
    });
};
