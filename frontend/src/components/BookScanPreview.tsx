import { View, Text, Image } from 'react-native';
import React from 'react';
import RenderStars from '@/components/RenderStars';
import { Link } from 'expo-router';
import { v4 as uuidv4 } from 'uuid';

type Book = {
    id: number;
    created_at: string;
    title: string;
    authors: string;
    google_rating: null;
    series_name: null;
    description: string;
    google_books_id: null;
    google_details_link: null;
    publisher: string;
    good_reads_description: null;
    num_pages: number;
    published_date: string;
    good_reads_rating: number;
    good_reads_image_url: string;
    good_reads_rating_count: number;
    good_reads_book_id: string;
    isbn: string;
    book_genres: {
        genres: {
            name: string;
        }[];
    }[];
    genres: string[];
};

type ScrapedBook = {
    book: Book;
    lastScraped: null;
    scrapeURL: null;
    searchType: string;
    numberOfResults: null;
};

type BookScanPreviewProps = {
    currentBook: ScrapedBook;
};

function BookScanPreview({ currentBook }: BookScanPreviewProps) {
    let { book } = currentBook;
    console.log(JSON.stringify(book, null, 2));
    return (
        <Link href={`/books/${book.id}`}>
            <View className="flex flex-row bg-white w-full p-2">
                <Image
                    source={{
                        uri: book.good_reads_image_url,
                    }}
                    resizeMode="contain"
                    className="w-20 h-30 object-cover rounded-md mr-4 "
                />
                <View className="flex-1 bg-white">
                    <Text className="text-lg font-spice-semibold">
                        {book.title}
                    </Text>
                    <Text className="text-sm text-gray-600 mb-1">
                        {book.authors}
                    </Text>
                    <View className="flex mb-1">
                        <RenderStars rating={book.good_reads_rating || 0} />
                    </View>
                    <View className="flex flex-row flex-wrap gap-1 mb-1">
                        {book.genres.slice(0, 7).map(trope => (
                            <Text
                                key={uuidv4()}
                                className="px-2 py-0.5 bg-gray-200 rounded-full text-xs"
                            >
                                {typeof trope === 'string'
                                    ? trope
                                    : // @ts-ignore
                                      trope.genre?.name}
                            </Text>
                        ))}
                    </View>
                </View>
            </View>
        </Link>
    );
}

export default BookScanPreview;
