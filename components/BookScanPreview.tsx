import { View, Text, Image } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { GoogleBooksAPIResponse, BookVolume } from '@/types/index';
import { useGoogleBooks } from '@/api/books';

type BookScanPreviewProps = {
    isbn: string;
};

const BookScanPreview = ({ isbn }: BookScanPreviewProps) => {
    const { data: book, isLoading, error } = useGoogleBooks(isbn);

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error</Text>;
    }

    if (!book) {
        return <Text>No Data</Text>;
    }

    return (
        <View className="flex flex-row background-white w-full py-2">
            <Image
                source={{
                    uri: book.volumeInfo.imageLinks?.thumbnail
                }}
                resizeMode="contain"
                className="w-20 h-20"
            />
            <View className="w-11/12">
                <Text className="text-xl text-bold text-white overflow-wrap">
                    {book.volumeInfo.title}
                </Text>
                <Text className="text-md text-white text-bold overflow-wrap ">
                    {book.volumeInfo.authors}
                </Text>
                <View className="flex flex-row">
                    <Text className="text-lg text-white text-bold">
                        {Math.floor(Math.random() * 4 + 1)}{' '}
                    </Text>
                    <Text className="text-sm align-end">🌶️</Text>
                </View>
            </View>
        </View>
    );
};

export default BookScanPreview;
