import supabase from '@/lib/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    BookVolume,
    GoodReadsBookResult,
    GoogleBooksAPIResponse,
    InsertBook,
} from '@/types';

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
            const bookData: InsertBook = {
                authors: goodReadsBook.authors
                    .map(author => author.name)
                    .join(', '),
                description: goodReadsBook.description,
                google_books_id: null,
                good_reads_book_id: goodReadsBook.book_id,
                good_reads_image_url: goodReadsBook.imageUrl,
                good_reads_rating_count: goodReadsBook.ratingsCount,
                good_reads_rating: goodReadsBook.averageRating,
                isbn,
                num_pages: goodReadsBook.numPages,
                published_date: goodReadsBook.publishedDate,
                publisher: goodReadsBook.publisher,
                title: goodReadsBook.title,
            };

            // 3. Upsert book data
            const { data: book, error: bookError } = await supabase
                .from('books')
                .upsert(bookData, { onConflict: 'isbn' })
                .select()
                .single();

            if (bookError) throw new Error(bookError.message);

            // 4. Process genres
            const genres = goodReadsBook.genres || [];

            // 4a. Check existing genres
            const { data: existingGenres, error: genreCheckError } =
                await supabase
                    .from('genres')
                    .select('id, name')
                    .in('name', genres);

            if (genreCheckError)
                throw new Error(
                    `Error checking genres: ${genreCheckError.message}`,
                );
            // 4b. Determine new genres
            const existingGenreNames = existingGenres.map(g => g.name);
            const newGenres = genres.filter(
                g => !existingGenreNames.includes(g),
            );

            // 4c. Insert new genres
            if (newGenres.length > 0) {
                const { error: insertError } = await supabase
                    .from('genres')
                    .insert(newGenres.map(name => ({ name })));

                if (insertError)
                    throw new Error(
                        `Error inserting new genres: ${insertError.message}`,
                    );
            }

            // 4d. Fetch all genre IDs (including newly inserted ones)
            const { data: allGenres, error: allGenresError } = await supabase
                .from('genres')
                .select('id, name')
                .in('name', genres);

            if (allGenresError)
                throw new Error(
                    `Error fetching all genres: ${allGenresError.message}`,
                );

            // 4e. Link book to genres
            const bookGenreLinks = allGenres.map(genre => ({
                book_id: book.id,
                genre_id: genre.id,
                book_id_genre_id: `${book.id}_${genre.id}`,
            }));

            const { error: linkError } = await supabase
                .from('book_genres')
                .upsert(bookGenreLinks, {
                    onConflict: 'book_id_genre_id',
                    ignoreDuplicates: true,
                });

            if (linkError)
                throw new Error(
                    `Error linking book to genres: ${linkError.message}`,
                );

            return book;
        },
        onSuccess: () => {
            // Invalidate and refetch relevant queries
            queryClient.invalidateQueries({ queryKey: ['books'] });
            queryClient.invalidateQueries({ queryKey: ['genres'] });
        },
    });
};
