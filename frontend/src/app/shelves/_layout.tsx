import { useAuth } from '@/providers/AuthProvider';
import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
    const { session } = useAuth();

    if (session) {
        return <Redirect href="/(auth)/" />;
    }

    return (
        <>
            <Stack />
            <StatusBar style="light" />
        </>
    );
}
