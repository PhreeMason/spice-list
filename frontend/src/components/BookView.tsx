import { View, Text, Image } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import BookPageButtons from './BookPageButtons';
import RenderStars from './RenderStars';
import { Link } from 'expo-router';

type Props = {
    book: {
        id: number;
        created_at: string;
        title: string;
        authors: string;
        google_rating?: number | null;
        series_name?: string | null;
        description: string;
        google_books_id?: string | null;
        google_details_link?: string | null;
        publisher: string;
        good_reads_description?: string | null;
        num_pages: number;
        published_date: string;
        good_reads_rating: number;
        good_reads_image_url: string;
        good_reads_rating_count: number;
        good_reads_book_id: string;
        isbn: string;
        genres: {
            genre: {
                name: string;
            };
        }[];
    };
    user_books:
    | {
        book_id: number;
        created_at: string;
        end_date: string | null;
        exclusive_shelf: string;
        id: number;
        my_rating: number | null;
        my_review: string | null;
        owned_copies: number | null;
        read_count: number | null;
        start_date: string | null;
        user_id: string;
    }[]
    | undefined;
};

const BookView = ({ book }: Props) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const user_books = book.user_books?.[0]
    return (
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
                <Text className="text-sm text-gray-600 mb-2">
                    {book.series_name}
                </Text>
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
                    Published:{' '}
                    {book.published_date &&
                        new Date(book.published_date).toLocaleDateString()}
                </Text>
            </View>
            <BookPageButtons bookId={book.id} />

            <Text className="text-lg font-spice-semibold mb-2">Genres</Text>
            <View className="flex-row flex-wrap mb-6">
                {book.genres?.map((genreObj, index) => (
                    <View
                        key={index}
                        className="px-2 py-1 bg-gray-200 rounded-full mr-2 mb-2"
                    >
                        <Text className="text-xs">
                            {typeof genreObj === 'string'
                                ? genreObj
                                : genreObj.genre?.name}
                        </Text>
                    </View>
                ))}
            </View>

            {user_books ? <Link href={`/reading-sessions/view/${user_books.id}`}>
                <Text className='text-blue-500 underline'> Logs </Text>
            </Link> : null}

            <Text className="text-lg font-spice-semibold mb-2">
                Description
            </Text>
            <Text
                numberOfLines={showFullDescription ? 0 : 3}
                className="text-lg"
            >
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
    );
};

export default BookView;
