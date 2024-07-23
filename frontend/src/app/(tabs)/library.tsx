import {
    Text,
    View,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { Link } from 'expo-router';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { useGetUserBooks } from '@/api/bookshelves';
import { UserBookWithBook } from '@/types';
import ExclusiveSelfItem from '@/components/ExclusiveShelf';

dayjs.extend(relativeTime);

export default function LibraryScreen() {
    const { data: myBooks, isLoading, error } = useGetUserBooks();

    if (isLoading) {
        return <ActivityIndicator size="large" />;
    }

    if (error) {
        return <Text>{error.message}</Text>;
    }

    if (!myBooks || myBooks.length === 0) {
        return (
            <View>
                <Text>No myBooks found</Text>
                <Link href="/scan">Scan a your first book</Link>
            </View>
        );
    }

    const booksGroupedByShelf = myBooks.reduce(
        (acc: { [key: string]: UserBookWithBook[] }, userBook) => {
            if (!acc[userBook.exclusive_shelf]) {
                acc[userBook.exclusive_shelf] = [];
            }
            // @ts-ignore
            acc[userBook.exclusive_shelf].push(userBook);
            return acc;
        },
        {},
    );

    const shelves = Object.keys(booksGroupedByShelf).map(shelf => ({
        shelfName: shelf,
        userBooks: booksGroupedByShelf[shelf],
    }));
    return (
        <View className="flex-1 flex-col w-full">
            <FlatList
                data={shelves}
                renderItem={({ item }) => (
                    <ExclusiveSelfItem
                        shelfName={item.shelfName}
                        userBooks={item.userBooks}
                    />
                )}
                keyExtractor={item => item.shelfName}
            />
        </View>
    );
}
