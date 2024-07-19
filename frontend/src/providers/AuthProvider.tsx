import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import {
    PropsWithChildren,
    createContext,
    useEffect,
    useState,
    useContext,
} from 'react';
import { Profile } from '@/types/index';

type AuthData = {
    session: Session | null;
    loading: boolean;
    profile: Profile | null;
};

const AuthContext = createContext<AuthData>({
    loading: false,
    session: null,
    profile: null,
});

export default function AuthProvider({ children }: PropsWithChildren) {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        const fetchSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            setSession(session);

            if (session) {
                // fetch profile
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                setProfile(data || null);
            }

            setLoading(false);
        };
        fetchSession();

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    return (
        <AuthContext.Provider
            value={{
                session,
                loading,
                profile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
