import { Text, ScrollView } from 'react-native';

import { Stack, useLocalSearchParams } from 'expo-router';
import { useSearchByGoodReadsId } from '@/api/books';
import BookView from '@/components/BookView';

const formatTitle = (title: string) => {
    // these titles are too long to show in the header
    if (title?.includes(':')) {
        return title.split(':')[0];
    }
    return title;
};

const BooKSearchDetailsScreen = () => {
    const { goodReadsId } = useLocalSearchParams();
    const stringGoodReadsId = String(goodReadsId);

    const { data, error, isLoading } =
        useSearchByGoodReadsId(stringGoodReadsId);

    if (error) {
        return <Text>{error.message}</Text>;
    }

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (!data) {
        return <Text>No data</Text>;
    }

    const book = data.book;
    return (
        <ScrollView className="flex-1 bg-white">
            <Stack.Screen options={{ title: formatTitle(book.title) }} />
            <BookView book={book} user_books={null} />
        </ScrollView>
    );
};

export default BooKSearchDetailsScreen;
