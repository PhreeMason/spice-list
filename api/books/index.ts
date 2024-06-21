import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import {
    Book,
    InsertBook,
    BookScan,
    InsertBookScan,
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
        google_rating: null,
        publisher: googleBook.volumeInfo.publisher,
        series_name: googleBook.volumeInfo.subtitle || null,
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

export const useUpsertBook = () => {
    const queryClient = useQueryClient();
    const { profile } = useAuth();
    const userId = profile?.id;
    return useMutation({
        async mutationFn(data: InsertBook) {
            if (!userId) throw new Error('User not found');
            const { data: book, error } = await supabase
                .from('books')
                .upsert(data)
                .select('*')
                .single();

            if (error) {
                throw new Error(error.message);
            }
            return book;
        }
    });
};
