// add book by id to bookshelf
import supabase from '@/lib/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/providers/AuthProvider';
import { ExclusiveSelf } from '@/types';

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
                .upsert({
                    book_id,
                    user_id,
                    exclusive_shelf,
                })
                .select('*')
                .single();

            console.log({ data, error });
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

export const useAddToBookShelf = () => {
    const queryClient = useQueryClient();
    const { profile } = useAuth();
    const user_id = profile?.id;

    return useMutation({
        async mutationFn({
            user_book_id,
            bookshelf_id,
        }: {
            user_book_id: number;
            bookshelf_id: number;
        }) {
            if (!user_id) throw new Error('User not found');
            const { error, data } = await supabase
                .from('bookshelf_books')
                .insert({
                    user_book_id,
                    bookshelf_id,
                })
                .select();
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

export const useGetUserBooks = () => {
    const { profile } = useAuth();
    const user_id = profile?.id;
    return useQuery({
        queryKey: ['user_books', user_id],
        queryFn: async () => {
            if (!user_id) throw new Error('User not found');
            const { data, error } = await supabase
                .from('user_books')
                .select('*, book:book_id(*)')
                .eq('user_id', user_id)
                .order('created_at', { ascending: false });
            if (error) {
                throw new Error(error.message);
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
        queryKey: ['book_shelves', user_id, bookId],
        queryFn: async () => {
            if (!user_id) throw new Error('User not found');
            const { data, error } = await supabase
                .from('bookshelf_books')
                .select(
                    `
                    id,
                    bookshelf_id,
                    user_book_id,
                    user_books!inner(book_id)`)
                .eq('user_books.book_id', bookId)
                .eq('user_books.user_id', user_id);

            if (error) {
                throw new Error(error.message);
            }

            return data.map(item => ({
                bookshelfId: item.bookshelf_id,
                bookShelfBookId: item.id
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
                .select()
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
                queryKey: ['book_shelves', user_id],
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
            queryClient.invalidateQueries({
                queryKey: ['book_shelves', user_id],
            });
        },
    });
};

export const useRemoveBookFromShelf = () => {
    const queryClient = useQueryClient();
    const { profile } = useAuth();
    const user_id = profile?.id;

    return useMutation({
        async mutationFn({
            bookShelfBookId,
        }: {
            bookShelfBookId: number;
        }) {
            if (!user_id) throw new Error('User not found');

            const { data, error } = await supabase
                .from('bookshelf_books')
                .delete()
                .eq('id', bookShelfBookId)

            if (error) throw new Error(error.message);

            return data;
        },
        onSuccess: () => {
            // Invalidate and refetch relevant queries
            queryClient.invalidateQueries({
                queryKey: ['book_shelves', user_id],
            });
        },
    });
};
