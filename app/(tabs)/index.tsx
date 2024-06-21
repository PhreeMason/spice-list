import { Text, View, Image, FlatList, ActivityIndicator } from 'react-native';
import { useMyScanList } from '@/api/book-scans';
import { Link } from 'expo-router';
import BookCoverImage from '@/components/BookCoverImage';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

dayjs.extend(relativeTime);

export default function HistoryScreen() {
    const { data: scans, isLoading, error } = useMyScanList();

    if (isLoading) {
        return <ActivityIndicator size="large" />;
    }

    if (error) {
        return <Text>{error.message}</Text>;
    }

    if (!scans) {
        return (
            <View>
                <Text>No scans found</Text>
                <Link href="/scan">Scan a your first book</Link>
            </View>
        );
    }

    console.log(JSON.stringify(scans, null, 2));
    return (
        <FlatList
            data={scans}
            renderItem={({ item }) => (
                <View className="flex flex-row background-white w-full p-2">
                    <BookCoverImage
                        bookId={item.book.google_books_id}
                        otherStyles=""
                    />
                    <View className="w-11/12">
                        <Text className="text-xl text-bold overflow-wrap">
                            {item.book.title}
                        </Text>
                        <Text className="text-md text-gray text-bold overflow-wrap ">
                            {item.book.authors}
                        </Text>
                        <View className="flex flex-row">
                            <Text className="text-sm text-gray text-bold">
                                {dayjs(item.created_at).fromNow()}
                            </Text>
                        </View>
                        {/* <View className="flex flex-row">
                            <Text className="text-lg text-gray text-bold">
                                {Math.floor(Math.random() * 4 + 1)}{' '}
                            </Text>
                            <Text className="text-sm align-end">🌶️</Text>
                        </View> */}
                    </View>
                </View>
            )}
            ItemSeparatorComponent={() => (
                <View className="h-2 w-11/12 bg-gray border-b" />
            )}
        />
    );
}
