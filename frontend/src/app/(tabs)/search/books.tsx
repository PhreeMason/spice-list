import React, { useState, useMemo } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Link } from 'expo-router';

import SearchBar from '@/components/SearchBar';
import { useSearchBooks } from '@/api/books';
import { useDebounce } from '@/api/hooks';
import SearchListItem from '@/components/SearchListItem';

export default function SearchScreen() {
    const [search, setSearch] = useState('');

    const debouncedSearchTerm = useDebounce(search, 350);
    const {
        data: onLineBooks,
        error,
        isLoading,
    } = useSearchBooks(debouncedSearchTerm);

    if (error) {
        return <Text>{error.message}</Text>;
    }

    if (!onLineBooks || onLineBooks.length === 0) {
        return (
            <View className="flex-1 justify-start items-center">
                <SearchBar
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Search"
                    autoFocus
                />
                <Text className="mb-4">Enter a book to search</Text>
            </View>
        );
    }

    return (
        <View className="flex-1">
            <SearchBar
                value={search}
                onChangeText={setSearch}
                placeholder="Search"
            />
            <FlatList
                data={onLineBooks}
                renderItem={({ item }) => <SearchListItem item={item} />}
                ItemSeparatorComponent={() => (
                    <View className="h-1 w-full border-b" />
                )}
            />
        </View>
    );
}
