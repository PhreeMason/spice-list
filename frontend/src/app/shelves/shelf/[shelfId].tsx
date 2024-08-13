import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import { useGetBooksOfShelf } from '@/api/bookshelves';
import { useLocalSearchParams, Stack } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import ShelfListItem from '@/components/ShelfListItem';

const Shelf = () => {
    const { shelfId } = useLocalSearchParams();
    const shelfID = Number(shelfId);
    const { data: items, isLoading, error } = useGetBooksOfShelf(shelfID);

    if (isLoading) return <ActivityIndicator />;

    if (error) return <Text>Error: {error.message}</Text>;
    const shelfName = items?.[0].bookshelves.name;
    return (
        <View className="flex-1">
            <Stack.Screen
                options={{
                    title: shelfName || 'Shelf',
                }}
            />

            <FlashList
                data={items}
                keyExtractor={item => item.id.toString()}
                estimatedItemSize={86}
                renderItem={({ item }) => <ShelfListItem item={item} />}
            />
        </View>
    );
};

export default Shelf;
