import { View, Text, Image } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { GoogleBooksAPIResponse, BookVolume } from '@/types/index';

// import { useScanList } from '@/providers/ScanListProvider';

const searchGoogleBooksApi = async (
    isbn: string
): Promise<BookVolume | null> => {
    if (!isbn) return null;
    const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
    );
    const json: GoogleBooksAPIResponse = await response.json();
    const book = json.items[0];
    return book;
};

type BookScanPreviewProps = {
    scanData: string;
};

const BookScanPreview = ({ scanData }: BookScanPreviewProps) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['googleApi', scanData],
        queryFn: () => searchGoogleBooksApi(scanData)
    });

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error</Text>;
    }

    if (!data) {
        return <Text>No Data</Text>;
    }

    // TODO: book to scanlist history
    return (
        <View className="flex flex-row background-white w-full py-2">
            <Image
                source={{
                    uri: data.volumeInfo.imageLinks?.thumbnail
                }}
                resizeMode="contain"
                className="w-20 h-20"
            />
            <View className="w-11/12">
                <Text className="text-xl text-bold text-white overflow-wrap">
                    {data.volumeInfo.title}
                </Text>
                <Text className="text-md text-white text-bold overflow-wrap ">
                    {data.volumeInfo.authors}
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
