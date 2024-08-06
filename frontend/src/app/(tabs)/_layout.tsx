import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
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
    const headerShown = useClientOnlyValue(false, true);
    if (!session) {
        return <Redirect href="/sign-in" />;
    }
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'pink',
                // Disable the static render of the header on web
                // to prevent a hydration error in React Navigation v6.
                headerShown: headerShown,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Library',
                    tabBarIcon: ({ color }) => (
                        <Ionicons
                            name="library-outline"
                            size={24}
                            color={color}
                        />
                    ),
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: 'Search',
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="search" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="user" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
