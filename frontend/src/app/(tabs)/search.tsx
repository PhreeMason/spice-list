import React, { useState, useMemo } from 'react';
import {
    Text,
    View,
    Image,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { useMyScanList } from '@/api/book-scans';
import { Link } from 'expo-router';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import RenderStars from '@/components/RenderStars';
import SearchBar from '@/components/SearchBar';
import { useSearchBooks } from '@/api/books';
import { useDebounce } from "@/api/hooks";

dayjs.extend(relativeTime);

export default function SearchScreen() {
    const [filter, setFilter] = useState('');
    const { data: scans, isLoading, error } = useMyScanList();
    const [search, setSearch] = useState('');
    
    const debouncedSearchTerm = useDebounce(search, 200);
    const { data: onLineBooks, error: onlineBooksError } = useSearchBooks(debouncedSearchTerm);

    const filteredScans = useMemo(() => {
        if (!scans) return [];
        return scans.filter(scan =>
            scan.book.title.toLowerCase().includes(filter.toLowerCase()) ||
            scan.book.authors.toLowerCase().includes(filter.toLowerCase())
        );
    }, [scans, filter]);

    if (isLoading) {
        return <ActivityIndicator size="large" />;
    }

    if (error) {
        return <Text>{error.message}</Text>;
    }

    if (!scans || scans.length === 0) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="mb-4">No scans found</Text>
                <Link href="/scan" className="bg-blue-500 p-2 rounded-md">
                    <Text className="text-white">Scan your first book</Text>
                </Link>
            </View>
        );
    }
    console.log('SearchScreen', onLineBooks);
    console.log('SearchScreen error', onlineBooksError);
    return (
        <View className="flex-1">
            <SearchBar value={search} onChangeText={setSearch} placeholder='Search' />
            <FlatList
                data={filteredScans}
                renderItem={({ item }) => (
                    <Link href={`/books/${item.book.id}`} asChild>
                        <TouchableOpacity className="flex flex-row bg-white w-full p-2">
                            <Image
                                source={{
                                    uri: item.book.good_reads_image_url || '',
                                }}
                                resizeMode="contain"
                                className="w-20 h-30 object-cover rounded-md mr-4 "
                            />
                            <View className="flex-1 bg-white">
                                <Text
                                    className="text-lg font-spice-semibold"
                                    numberOfLines={1}
                                >
                                    {item.book.title}
                                </Text>
                                <Text
                                    className="text-sm text-gray-600 mb-1"
                                    numberOfLines={1}
                                >
                                    {item.book.authors
                                        .replace(/\s+/g, ' ')
                                        .split(',')}
                                </Text>
                                <View className="flex mb-1">
                                    {item.book.good_reads_rating && (
                                        <RenderStars
                                            rating={item.book.good_reads_rating}
                                        />
                                    )}
                                </View>
                                <View className="flex flex-row flex-wrap gap-1 mb-1">
                                    {item.book.genres
                                        .slice(0, 3)
                                        .map((genre, index) => (
                                            <Text
                                                key={JSON.stringify(genre)}
                                                className="px-2 py-0.5 bg-gray-200 rounded-full text-xs"
                                            >
                                                {genre.genre.name}
                                            </Text>
                                        ))}
                                </View>
                                <Text className="text-xs text-gray-500">
                                    {dayjs(item.created_at).fromNow()}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </Link>
                )}
                ItemSeparatorComponent={() => (
                    <View className="h-2 w-full border-b" />
                )}
            />
        </View>
    );
}
