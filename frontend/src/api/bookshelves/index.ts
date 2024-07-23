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
