import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Redirect, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useAuth } from '@/providers/AuthProvider';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={28} {...props} />;
}

export default function TabLayout() {
    const { session } = useAuth();

    if (!session) {
        return <Redirect href={'/sign-in'} />;
    }
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'pink',
                // Disable the static render of the header on web
                // to prevent a hydration error in React Navigation v6.
                headerShown: useClientOnlyValue(false, true)
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'History',
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="bookmark" color={color} />
                    ),
                    headerRight: () => (
                        <Link href="/modal" asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="info-circle"
                                        size={25}
                                        color={'pink'}
                                        style={{
                                            marginRight: 15,
                                            opacity: pressed ? 0.5 : 1
                                        }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    )
                }}
            />
            <Tabs.Screen
                name="scan"
                options={{
                    title: 'Scan',
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="search" color={color} />
                    )
                }}
            />
            <Tabs.Screen name="[bookId]" options={{ href: null }} />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="user" color={color} />
                    )
                }}
            />
        </Tabs>
    );
}
