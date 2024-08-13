import React, { useMemo, useState } from 'react';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Feather } from '@expo/vector-icons';

import type { ShelfListItem } from '@/types/index';
import BookShelfItem from '@/components/BookShelfItem';
import SearchBar from '@/components/SearchBar';
import SegmentCotrolSlider from '@/components/SegmentCotrolSlider';
import {
    useGetBookShelves,
    useAddBookToShelf,
    useGetBookShelvesForBook,
    useRemoveBookFromShelf,
    useAddToExclusiveShelf,
    useGetUserBooks,
} from '@/api/bookshelves';
import { ExclusiveSelfOptions } from '@/constants';
import type { ExclusiveSelf } from '@/types/index';

const RightIcon = ({ onPress }: { onPress: () => void }) => (
    <TouchableOpacity onPress={onPress} className="px-6">
        <Feather name="plus-circle" size={24} color={'#5FA2EF'} />
    </TouchableOpacity>
);

export default function ShelvesScreen() {
    const [searchText, setSearchText] = useState('');
    const { bookId } = useLocalSearchParams();
    const bookIdNumber = Number(bookId);
    const { data: userBooks } = useGetUserBooks(bookIdNumber);
    const { data: bookShelves, isLoading: isLoadingShelves } =
        useGetBookShelves();
    const { mutate: addBookToShelf } = useAddBookToShelf();
    const { data: bookShelvesForBook, isLoading: isLoadingBookShelves } =
        useGetBookShelvesForBook(bookIdNumber);
    const { mutate: removeBookFromShelf } = useRemoveBookFromShelf();
    const { mutate: addToExclusiveShelf } = useAddToExclusiveShelf();
    const [listLoading, setListLoading] = useState(0);

    const shelvesList = (): ShelfListItem[] => {
        if (!bookShelves) return [];

        return bookShelves
            .filter(shelf =>
                shelf.name.toLowerCase().includes(searchText.toLowerCase()),
            )
            .map(shelf => {
                const selectedBookShelf = bookShelvesForBook?.find(
                    item => item.bookshelfId === shelf.id,
                );
                return {
                    ...shelf,
                    bookShelfBookId: selectedBookShelf?.bookShelfBookId,
                    isSelected: selectedBookShelf ? true : false,
                };
            });
    };

    const handleShelfToggle = (shelfData: ShelfListItem) => {
        const { id: shelfId, bookShelfBookId, isSelected } = shelfData;
        setListLoading(shelfId);
        if (isSelected && bookShelfBookId) {
            removeBookFromShelf(
                { bookShelfBookId },
                {
                    onSuccess: () => setListLoading(0),
                    onError: () => setListLoading(0),
                },
            );
        } else {
            addBookToShelf(
                { book_id: bookIdNumber, bookshelf_id: shelfId },
                {
                    onSuccess: () => setListLoading(0),
                    onError: () => setListLoading(0),
                },
            );
        }
    };

    if (isLoadingShelves || isLoadingBookShelves) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const selectedOption =
        userBooks?.[0]?.exclusive_shelf || ExclusiveSelfOptions[0];

    return (
        <View className="flex-1 bg-white">
            <Stack.Screen
                options={{
                    headerTitle: 'Add to Shelves',
                    headerRight: () => (
                        <RightIcon
                            onPress={() =>
                                router.push(`/shelves/new/${bookId}`)
                            }
                        />
                    ),
                }}
            />
            <SearchBar
                placeholder="Search..."
                onChangeText={text => setSearchText(text)}
                value={searchText}
                showBarcodeScanner={false}
            />

            <SegmentCotrolSlider
                options={ExclusiveSelfOptions}
                selectedOption={selectedOption}
                onOptionPress={(option: ExclusiveSelf) =>
                    addToExclusiveShelf({
                        book_id: bookIdNumber,
                        exclusive_shelf: option,
                    })
                }
            />

            <FlashList
                data={shelvesList()}
                renderItem={({ item }) => (
                    <BookShelfItem
                        handleShelfToggle={handleShelfToggle}
                        shelf={item}
                        isLoading={listLoading === item.id}
                    />
                )}
                estimatedItemSize={50}
            />
        </View>
    );
}
