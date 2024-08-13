// add book by id to bookshelf
import supabase from '@/lib/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/providers/AuthProvider';
import { ExclusiveSelf } from '@/types';

type Book = {
    title: string;
    authors: string;
    good_reads_image_url: string;
    good_reads_rating: number;
  };
  
  type UserBook = {
    id: number;
    book: Book;
    book_id: number;
    user_id: string;
    end_date: null | string;
    my_rating: null | number;
    my_review: null | string;
    created_at: string;
    read_count: null | number;
    start_date: null | string;
    owned_copies: null | number;
    exclusive_shelf: string;
  };
  
  export type ShelfEntry = {
    id: number;
    created_at: string;
    user_book_id: number;
    bookshelf_id: number;
    user_book: UserBook;
    bookshelves: {
        name: string;
    };
  };
  
  type ShelfEntries = ShelfEntry[];

export const useAddToExclusiveShelf = () => {
    const queryClient = useQueryClient();
    const { profile } = useAuth();
    const user_id = profile?.id;

    return useMutation({
        async mutationFn({
            book_id,
            exclusive_shelf = 'to-read',
        }: {
            book_id: number;
            exclusive_shelf: ExclusiveSelf;
        }) {
            if (!user_id) throw new Error('User not found');
            const { error, data } = await supabase
                .from('user_books')
                .upsert(
                    {
                        book_id,
                        user_id,
                        exclusive_shelf,
                    },
                    { onConflict: 'user_id,book_id', ignoreDuplicates: false },
                )
                .select('*')
                .single();
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({
                queryKey: ['user_books', user_id],
            });
        },
    });
};

export const useGetUserBooks = (bookId?: number) => {
    const { profile } = useAuth();
    const user_id = profile?.id;
    return useQuery({
        queryKey: ['user_books', user_id, bookId],
        queryFn: async () => {
            if (!user_id) throw new Error('User not found');
            const { data, error } = await supabase
                .from('user_books')
                .select('*')
                .eq('user_id', user_id)
                .order('created_at', { ascending: false });
            if (error) {
                throw new Error(error.message);
            }

            if (bookId) {
                return data.filter((userBook: any) => userBook.book_id === bookId);
            }
            return data;
        },
    });
};

export const useGetBookShelves = () => {
    const { profile } = useAuth();
    const user_id = profile?.id;
    return useQuery({
        queryKey: ['bookshelves', user_id],
        queryFn: async () => {
            if (!user_id) throw new Error('User not found');
            const { data, error } = await supabase
            .from('bookshelves')
            .select('*')
            .eq('user_id', user_id)
            .order('created_at', { ascending: false });

            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
};

export const useGetBookShelvesForBook = (bookId: number) => {
    const { profile } = useAuth();
    const user_id = profile?.id;

    return useQuery({
        queryKey: ['bookshelves', user_id, bookId],
        queryFn: async () => {
            if (!user_id) throw new Error('User not found');
            const { data, error } = await supabase
                .from('bookshelf_books')
                .select(
                    `
                    id,
                    bookshelf_id,
                    user_book_id,
                    user_books!inner(book_id, exclusive_shelf)`,
                )
                .eq('user_books.book_id', bookId)
                .eq('user_books.user_id', user_id);

            if (error) {
                throw new Error(error.message);
            }

            return data.map(item => ({
                bookshelfId: item.bookshelf_id,
                bookShelfBookId: item.id,
            }));
        },
        enabled: !!user_id && !!bookId,
    });
};

export const useAddBookToShelf = () => {
    const queryClient = useQueryClient();
    const { profile } = useAuth();
    const user_id = profile?.id;

    return useMutation({
        async mutationFn({
            book_id,
            bookshelf_id,
        }: {
            book_id: number;
            bookshelf_id: number;
        }) {
            if (!user_id) throw new Error('User not found');

            // First, get or create the user_book entry
            const { data: userBook, error: userBookError } = await supabase
                .from('user_books')
                .upsert(
                    { user_id, book_id },
                    { onConflict: 'user_id,book_id', ignoreDuplicates: false },
                )
                .select('*')
                .single();
            if (userBookError) throw new Error(userBookError.message);

            // Then, add the book to the bookshelf
            const { data, error } = await supabase
                .from('bookshelf_books')
                .insert({
                    user_book_id: userBook.id,
                    bookshelf_id,
                })
                .select()
                .single();

            if (error) throw new Error(error.message);
            return { ...data, book_id };
        },
        onSuccess: () => {
            // Invalidate and refetch relevant queries
            queryClient.invalidateQueries({
                queryKey: ['bookshelves', user_id],
            });
            queryClient.invalidateQueries({
                queryKey: ['user_books', user_id],
            });
            queryClient.invalidateQueries({
                queryKey: ['bookshelf_books', user_id],
            });
        },
    });
};

export const useAddBookToNewShelf = () => {
    const queryClient = useQueryClient();
    const { profile } = useAuth();
    const user_id = profile?.id;

    return useMutation({
        async mutationFn({
            bookId,
            shelfName,
        }: {
            bookId: number;
            shelfName: string;
        }) {
            if (!user_id) throw new Error('User not found');

            // Start a Supabase transaction
            const { data, error } = await supabase.rpc(
                'add_book_to_new_shelf',
                {
                    p_book_id: bookId,
                    p_shelf_name: shelfName,
                    p_user_id: user_id,
                },
            );

            if (error) throw new Error(error.message);

            return data;
        },
        onSuccess: () => {
            // Invalidate and refetch relevant queries
            queryClient.invalidateQueries({
                queryKey: ['bookshelves', user_id],
            });
            queryClient.invalidateQueries({
                queryKey: ['user_books', user_id],
            });
        },
    });
};

export const useRemoveBookFromShelf = () => {
    const queryClient = useQueryClient();
    const { profile } = useAuth();
    const user_id = profile?.id;

    return useMutation({
        async mutationFn({ bookShelfBookId }: { bookShelfBookId: number }) {
            if (!user_id) throw new Error('User not found');

            const { data, error } = await supabase
                .from('bookshelf_books')
                .delete()
                .eq('id', bookShelfBookId);

            if (error) throw new Error(error.message);

            return data;
        },
        onSuccess: () => {
            // Invalidate and refetch relevant queries
            queryClient.invalidateQueries({
                queryKey: ['bookshelves', user_id],
            });
        },
    });
};

export const useGetBooksOfShelf = (shelfId: number) => {
    const { profile } = useAuth();
    const user_id = profile?.id;

    return useQuery({
        queryKey: ['bookshelf_books', user_id, shelfId],
        queryFn: async () => {
            if (!user_id) throw new Error('User not found');
            // return books of the shelf
            const { data, error } = await supabase
                .from('bookshelf_books')
                .select(
                    `
                    *,
                    bookshelves: bookshelf_id(name),
                    user_book: user_book_id(
                        *, 
                        book:book_id(
                            id,
                            title, 
                            authors, 
                            good_reads_image_url,
                            good_reads_rating
                            )
                        )
                    `,
                )
                .eq('bookshelf_id', shelfId)
                .returns<ShelfEntries>();

            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
};