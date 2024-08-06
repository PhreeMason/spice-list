import supabase from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

type Genre = {
    genre: {
        name: string;
    };
};

type Book = {
    id: number;
    isbn: string;
    title: string;
    genres: Genre[];
    authors: string;
    num_pages: number;
    publisher: string;
    created_at: string;
    description: string;
    series_name: string | null;
    google_rating: number | null;
    published_date: string;
    google_books_id: string | null;
    good_reads_rating: number;
    good_reads_book_id: string;
    google_details_link: string | null;
    good_reads_image_url: string;
    good_reads_description: string | null;
    good_reads_rating_count: number;
};

export type ScanResponseItem = {
    id: number;
    user_id: string;
    created_at: string;
    book: Book;
};

export const useMyScanList = () => {
    const { profile } = useAuth();
    const user_id = profile?.id;

    return useQuery({
        queryKey: ['user_scans', { user_id }],
        queryFn: async () => {
            if (!user_id) return [];

            const { data, error } = await supabase
                .from('user_scans')
                .select(
                    `
                    id, 
                    user_id, 
                    created_at, 
                    book:book_id(
                        *,
                        genres:book_genres(
                            genre:genre_id(name)
                        )
                    )
                `,
                )
                .filter('user_id', 'eq', user_id)
                .order('created_at', { ascending: false })
                .returns<ScanResponseItem[]>();

            if (error) {
                throw new Error(error.message);
            }
            // @ts-ignore
            // TODO: fix types
            return data;
        },
    });
};

export const useInsertScanItems = () => {
    const queryClient = useQueryClient();
    const { profile } = useAuth();
    const user_id = profile?.id;

    return useMutation({
        async mutationFn(book_id: number) {
            if (!user_id) throw new Error('User not found');

            const { error, data } = await supabase
                .from('user_scans')
                .upsert({ book_id, user_id })
                .select();
            // TODO: handle duplicates
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ['user_scans'] });
        },
    });
};
