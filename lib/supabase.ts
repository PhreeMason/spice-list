import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

const ExpoSecureStoreAdapter = {
    getItem: (key: string) => {
        return SecureStore.getItemAsync(key);
    },
    setItem: (key: string, value: string) => {
        SecureStore.setItemAsync(key, value);
    },
    removeItem: (key: string) => {
        SecureStore.deleteItemAsync(key);
    }
};

const isDevEnv = process.env.NODE_ENV === 'development';

const supabaseUrl = 'https://rcxcwcbdhekimpyappji.supabase.co';

const supabaseAnonKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjeGN3Y2JkaGVraW1weWFwcGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg5MDYwMjEsImV4cCI6MjAzNDQ4MjAyMX0.xjNfTLD4t1qLUrmHCqFiE0301tV7y-6ZwDR07P6VAmc';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: ExpoSecureStoreAdapter as any,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false
    }
});
