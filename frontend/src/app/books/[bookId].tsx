import { Text, ScrollView, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

import { useGetBookById } from '@/api/books';
import BookView from '@/components/BookView';

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
    const { data: book, isLoading, error } = useGetBookById(bookIdNumber);

    if (isLoading) {
        return <ActivityIndicator size="large" />;
    }

    if (error) {
        return <Text>{error.message}</Text>;
    }

    if (!book || !book.title) {
        return <Text>No book found</Text>;
    }
    return (
        <ScrollView className="flex-1 bg-white">
            <Stack.Screen options={{ title: formatTitle(book.title) }} />
            <BookView book={book} user_books={book.user_books} />
        </ScrollView>
    );
}
export default BookDetailsScreen;
