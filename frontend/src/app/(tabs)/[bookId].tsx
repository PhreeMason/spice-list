import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Tabs, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import { useBookById } from '@/api/books';
import RenderStars from '@/components/RenderStars';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const formatTitle = (title: string) => {
    // these titles are too long to show in the header
    if (title.includes(':')) {
        return title.split(':')[0];
    }
    return title;
};

function BookDetailsScreen() {
    const { bookId } = useLocalSearchParams();
    const bookIdNumber = Number(bookId);
    const { data, isLoading, error } = useBookById(bookIdNumber);

    const [showFullDescription, setShowFullDescription] = useState(false);

    if (isLoading) {
        return <ActivityIndicator size="large" />;
    }

    if (error) {
        return <Text>{error.message}</Text>;
    }

    if (!data || !data.title) {
        return <Text>No book found</Text>;
    }
    const book = data;
    return (
        <ScrollView className="flex-1 bg-white">
            <Tabs.Screen options={{ title: formatTitle(book.title) }} />
            <View className="p-4">
                {book.good_reads_image_url && (
                    <Image
                        source={{ uri: book.good_reads_image_url }}
                        className="rounded-lg"
                        style={{
                            height: undefined,
                            aspectRatio: 6 / 9,
                            width: '100%',
                        }}
                        resizeMode="contain"
                    />
                )}

                <Text className="text-2xl font-spice-bold mb-1">{book.title}</Text>
                {book.series_name && (
                    <Text className="text-sm text-gray-600 mb-2">{book.series_name}</Text>
                )}
                <Text className="text-lg mb-2">{book.authors}</Text>

                <View className="flex-row items-center justify-between mb-4">
                    {book.good_reads_rating && (
                        <View>
                            <RenderStars rating={book.good_reads_rating} />
                            <Text className="text-sm text-gray-600">
                                {book.good_reads_rating_count} ratings
                            </Text>
                        </View>
                    )}
                </View>

                <View className="flex-row items-center mb-4">
                    <FontAwesome name="book" size={16} color="#6B7280" />
                    <Text className="ml-2 text-sm text-gray-600">
                        {book.num_pages} pages{'  '}
                    </Text>
                    <FontAwesome
                        name="calendar"
                        size={16}
                        color="#6B7280"
                        className="ml-4"
                    />
                    <Text className="ml-2 text-sm text-gray-600">
                        Published: {new Date(book.published_date).toLocaleDateString()}
                    </Text>
                </View>

                <Text className="text-lg font-spice-semibold mb-2">Genres</Text>
                <View className="flex-row flex-wrap mb-6">
                    {book.genres.map((genreObj, index) => (
                        <View
                            key={index}
                            className="px-2 py-1 bg-gray-200 rounded-full mr-2 mb-2"
                        >
                            <Text className="text-xs">{genreObj.genre.name}</Text>
                        </View>
                    ))}
                </View>

                <Text className="text-lg font-spice-semibold mb-2">Description</Text>
                <Text numberOfLines={showFullDescription ? 0 : 3} className="text-lg">
                    {book.description}
                </Text>
                <Text
                    className="text-lg mb-4 text-blue-500 underline"
                    onPress={() => setShowFullDescription(!showFullDescription)}
                >
                    {showFullDescription ? 'Show less' : 'Show more'}
                </Text>

                <View className="text-lg text-gray-200">
                    <Text>Publisher: {book.publisher}</Text>
                    <Text>ISBN: {book.isbn}</Text>
                    <Text>Goodreads ID: {book.good_reads_book_id}</Text>
                </View>
            </View>
        </ScrollView>
    );
}
export default BookDetailsScreen;
