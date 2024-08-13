import { Stack, Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Layout() {
    return (
        <SafeAreaView edges={['top']} style={{ flex: 1 }}>
            <Tabs.Screen options={{ headerShown: false }} />

            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="books" options={{ headerShown: false }} />
                <Stack.Screen
                    name="barcode-scan"
                    options={{
                        headerShown: false,
                        presentation: 'modal',
                    }}
                />
            </Stack>
            <StatusBar style="dark" />
        </SafeAreaView>
    );
}
