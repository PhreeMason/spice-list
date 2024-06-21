import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import {
    Book,
    InsertBook,
    UserScan,
    InsertUserScan,
    BookVolume,
    GoogleBooksAPIResponse
} from '@/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const getBookDetails = (googleBook: BookVolume): InsertBook => {
    return {
        authors: googleBook.volumeInfo.authors.join(', '),
        description: googleBook.volumeInfo.description || '',
        google_books_id: googleBook.id,
        google_details_link: googleBook.selfLink,
        publisher: googleBook.volumeInfo.publisher,
        title: googleBook.volumeInfo.title
    };
};

const searchGoogleBooksApi = async (
    isbn: string
): Promise<BookVolume | null> => {
    if (!isbn) return null;
    const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
    );
    const json: GoogleBooksAPIResponse = await response.json();
    const book = json?.items[0] || null;
    return book;
};

export const useGoogleBooks = (isbn: string) => {
    return useQuery({
        queryKey: ['googleBooks', isbn],
        queryFn: () => searchGoogleBooksApi(isbn)
    });
};

export const useUpsertGoogleBook = () => {
    return useMutation({
        async mutationFn(isbn: string) {
            const googleBook = await searchGoogleBooksApi(isbn);
            if (!googleBook) throw new Error('Book not found');
            const data = getBookDetails(googleBook);
            const { data: book, error } = await supabase
                .from('books')
                .upsert(data, { onConflict: 'google_books_id' })
                .select('*')
                .single();

            if (error) {
                throw new Error(error.message);
            }
            return book;
        }
    });
};
