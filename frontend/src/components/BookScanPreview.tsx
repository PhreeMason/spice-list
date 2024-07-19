import { View, Text, Image } from 'react-native';
import React from 'react';
import { useGoodReadsBooks } from '@//api/books';
import RenderStars from '@/components/RenderStars';

type BookScanPreviewProps = {
    isbn: string;
};

const BookScanPreview = ({ isbn }: BookScanPreviewProps) => {
    const { data: book, isLoading, error } = useGoodReadsBooks(isbn);

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error</Text>;
    }

    if (!book || !book.title) {
        return <Text className="bg-red-500 text-white">No Data</Text>;
    }

    return (
        <View className="flex flex-row bg-white w-full p-2">
            <Image
                source={{
                    uri: book.imageUrl
                }}
                resizeMode="contain"
                className="w-20 h-30 object-cover rounded-md mr-4 "
            />
            <View className="flex-1 bg-white">
                <Text className="text-lg font-spice-semibold">
                    {book.title}
                </Text>
                <Text className="text-sm text-gray-600 mb-1">
                    {book.authors.map((a) => a.name).join(', ')}
                </Text>
                <View className="flex mb-1">
                    <RenderStars rating={book.averageRating} />
                </View>
                <View className="flex flex-row flex-wrap gap-1 mb-1">
                    {book.genres.map((trope, index) => (
                        <Text
                            key={index}
                            className="px-2 py-0.5 bg-gray-200 rounded-full text-xs"
                        >
                            {trope}
                        </Text>
                    ))}
                </View>
            </View>
        </View>
    );
};

export default BookScanPreview;
