import React, { useMemo } from 'react';
import {
    useGetBookShelves,
    useAddBookToShelf,
    useGetBookShelvesForBook,
    useRemoveBookFromShelf,
} from '@/api/bookshelves';
import Animated, { useSharedValue } from 'react-native-reanimated';

import { Stack, useLocalSearchParams } from 'expo-router';
import { Text, View, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Checkbox } from 'react-native-paper';
import BottomSheet from '@/components/BottomSheet';
import CreateShelfComponent from '@/components/CreateNewShelf';

type ShelfListItem = {
    isSelected: boolean;
    created_at: string;
    id: number;
    name: string;
    user_id: string;
    bookShelfBookId?: number;
};

export default function ShelvesScreen() {
    const { bookId } = useLocalSearchParams();
    const bookIdNumber = Number(bookId);
    const { data: bookShelves, isLoading: isLoadingShelves } =
        useGetBookShelves();
    const { mutate: addBookToShelf } = useAddBookToShelf();
    const { data: bookShelvesForBook, isLoading: isLoadingBookShelves } =
        useGetBookShelvesForBook(bookIdNumber);
    const { mutate: removeBookFromShelf } = useRemoveBookFromShelf();

    const shelvesList: ShelfListItem[] = useMemo(() => {
        if (!bookShelves) return [];

        return bookShelves.map(shelf => {
            const selectedBookShelf = bookShelvesForBook?.find(item => item.bookshelfId === shelf.id)
            return {
                ...shelf,
                bookShelfBookId: selectedBookShelf?.bookShelfBookId,
                isSelected: selectedBookShelf ? true : false,
            };
        });
    }, [bookShelves, bookShelvesForBook]);

    const handleShelfToggle = (shelfData: ShelfListItem) => {
        const { id: shelfId, bookShelfBookId, isSelected } = shelfData;
        if (isSelected && bookShelfBookId) {
            removeBookFromShelf({ bookShelfBookId });
        } else {
            addBookToShelf({ book_id: bookIdNumber, bookshelf_id: shelfId });
        }
    };

    const renderShelfItem = ({ item }: { item: ShelfListItem }) => (
        <TouchableOpacity
            onPress={() => handleShelfToggle(item)}
            className="flex-row items-center justify-between p-4 border-b border-gray-200"
        >
            <Text className="text-lg">{item.name}</Text>
            <Checkbox
                status={item.isSelected ? 'checked' : 'unchecked'}
                onPress={() => handleShelfToggle(item)}
            />
        </TouchableOpacity>
    );

    const isOpen = useSharedValue(false);

    const toggleSheet = () => {
        isOpen.value = !isOpen.value;
    };

    if (isLoadingShelves || isLoadingBookShelves) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white">
            <Stack.Screen options={{ headerTitle: 'Add to Shelves' }} />

            <TouchableOpacity
                className="p-4 border-b border-gray-200"
                onPress={toggleSheet}
            >
                <Text className="text-lg">+ New Shelf</Text>
            </TouchableOpacity>
            <FlashList
                data={shelvesList}
                renderItem={renderShelfItem}
                estimatedItemSize={50}
            />
            <BottomSheet isOpen={isOpen} toggleSheet={toggleSheet}>
                <CreateShelfComponent bookId={bookIdNumber} onClose={toggleSheet} />
            </BottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    flex: {
      flex: 1,
    },
    container: {
      flex: 1,
      height: 250,
    },
    buttonContainer: {
      marginTop: 16,
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-around',
    },
    toggleButton: {
      backgroundColor: '#b58df1',
      padding: 12,
      borderRadius: 48,
    },
    toggleButtonText: {
      color: 'white',
      padding: '0.5rem',
    },
    safeArea: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    bottomSheetButton: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingBottom: 2,
    },
    bottomSheetButtonText: {
      fontWeight: 600,
      textDecorationLine: 'underline',
    },
  });
  