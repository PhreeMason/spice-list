import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
    return (
        <>
            <Stack>
                <Stack.Screen
                    name="new/[bookId]"
                    options={{
                        headerShown: false,
                        presentation: 'modal',
                    }}
                />
            </Stack>
            <StatusBar style="auto" />
        </>
    );
}
