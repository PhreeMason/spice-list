import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabase from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';

// Fetch Previous Reading Session
export const useGetPreviousReadingSession = (user_book_id: number) => {
    const { profile } = useAuth();
    const user_id = profile?.id;
  
    return useQuery({
      queryKey: ['previous_reading_session', user_book_id],
      queryFn: async () => {
        if (!user_id) throw new Error('User not found');
  
        const { data, error } = await supabase
          .from('reading_sessions')
          .select('*')
          .eq('user_book_id', user_book_id)
          .order('created_at', { ascending: false })
          .limit(1);
  
        if (error) throw new Error(error.message);
  
        // Return null if no previous session exists
        return data.length > 0 ? data[0] : null;
      },
      enabled: !!user_id && !!user_book_id,
    });
  };
  

// Insert or Update Reading Session
export const useUpsertReadingSession = () => {
    const queryClient = useQueryClient();
    const { profile } = useAuth();
    const user_id = profile?.id;

    return useMutation({
        mutationFn: async ({
            user_book_id,
            start_page,
            end_page,
            time_spent,
            notes,
        }: {
            user_book_id: number;
            start_page?: number;
            end_page: number;
            time_spent: number;
            notes?: string;
        }) => {
            if (!user_id) throw new Error('User not found');

            let actualStartPage = start_page;
            if (!actualStartPage) {
                const { data: prevSession } = await supabase
                    .from('reading_sessions')
                    .select('end_page')
                    .eq('user_book_id', user_book_id)
                    .order('created_at', { ascending: false })
                    .limit(1)
                    .single();

                actualStartPage = prevSession?.end_page || 1;
            }

            const pages_read = end_page - actualStartPage;

            const { data, error } = await supabase
                .from('reading_sessions')
                .insert({
                    user_book_id,
                    start_page: actualStartPage,
                    end_page,
                    pages_read,
                    time_spent,
                    notes,
                })
                .select()
                .single();

            if (error) throw new Error(error.message);
            return data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['reading_sessions', variables.user_book_id] });
            queryClient.invalidateQueries({ queryKey: ['previous_reading_session', variables.user_book_id] });
            // Trigger reading goals update
            queryClient.invalidateQueries({ queryKey: ['reading_goals', user_id] });
        },
    });
};

// Create Reading Goal
export const useCreateReadingGoal = () => {
    const queryClient = useQueryClient();
    const { profile } = useAuth();
    const user_id = profile?.id;

    return useMutation({
        mutationFn: async ({
            goal_type,
            target_value,
            start_date,
            deadline,
            user_book_id,
        }: {
            goal_type: 'time' | 'pages' | 'books';
            target_value: number;
            start_date: string;
            deadline?: string;
            user_book_id?: number;
        }) => {
            if (!user_id) throw new Error('User not found');

            const { data, error } = await supabase
                .from('reading_goals')
                .insert({
                    user_id,
                    goal_type,
                    target_value,
                    start_date,
                    deadline,
                    user_book_id,
                    status: 'not started',
                })
                .select()
                .single();

            if (error) throw new Error(error.message);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reading_goals', user_id] });
        },
    });
};

// Fetch Reading Goals
export const useGetReadingGoals = () => {
    const { profile } = useAuth();
    const user_id = profile?.id;

    return useQuery({
        queryKey: ['reading_goals', user_id],
        queryFn: async () => {
            if (!user_id) throw new Error('User not found');
            const { data, error } = await supabase
                .from('reading_goals')
                .select('*')
                .eq('user_id', user_id)
                .order('created_at', { ascending: false });

            if (error) throw new Error(error.message);
            return data;
        },
        enabled: !!user_id,
    });
};

// Update Reading Goal Status
export const useUpdateReadingGoalStatus = () => {
    const queryClient = useQueryClient();
    const { profile } = useAuth();
    const user_id = profile?.id;

    return useMutation({
        mutationFn: async ({
            goal_id,
            status,
            end_date,
        }: {
            goal_id: number;
            status: 'complete' | 'late' | 'in-progress' | 'not started';
            end_date?: string;
        }) => {
            if (!user_id) throw new Error('User not found');

            const { data, error } = await supabase
                .from('reading_goals')
                .update({ status, end_date })
                .eq('id', goal_id)
                .select()
                .single();

            if (error) throw new Error(error.message);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reading_goals', user_id] });
        },
    });
};

// Check and Update Late Status
export const useCheckAndUpdateLateStatus = () => {
    const queryClient = useQueryClient();
    const { profile } = useAuth();
    const user_id = profile?.id;

    return useMutation({
        mutationFn: async () => {
            if (!user_id) throw new Error('User not found');

            const currentDate = new Date().toISOString();

            const { data, error } = await supabase
                .from('reading_goals')
                .update({ status: 'late' })
                .eq('user_id', user_id)
                .lt('deadline', currentDate)
                .neq('status', 'complete')
                .select();

            if (error) throw new Error(error.message);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reading_goals', user_id] });
        },
    });
};

