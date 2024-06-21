import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { UserScan } from '@/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useMyScanList = () => {
    const { profile } = useAuth();
    const user_id = profile?.id;

    return useQuery<UserScan[]>({
        queryKey: ['user_scans', { user_id }],
        queryFn: async () => {
            if (!profile) return [];

            const { data, error } = await supabase
                .from('user_scans')
                .select('*, book(*)')
                .eq('user_id', profile.id)
                .order('created_at', { ascending: false });
            if (error) {
                throw new Error(error.message);
            }
            return data;
        }
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
        }
    });
};
