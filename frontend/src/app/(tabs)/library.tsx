import {
    Text,
    View,
    Image,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { useMyScanList } from '@/api/book-scans';
import { Link } from 'expo-router';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import RenderStars from '@/components/RenderStars';

dayjs.extend(relativeTime);

export default function LibraryScreen() {
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

    return (
        <FlatList
            data={scans}
            renderItem={({ item }) => (
                <Link href={`/(tabs)/${item.book.id}`} asChild>
                    <TouchableOpacity className="flex flex-row bg-white w-full p-2">
                        <Image
                            source={{
                                uri: item.book.good_reads_image_url || '',
                            }}
                            resizeMode="contain"
                            className="w-20 h-30 object-cover rounded-md mr-4 "
                        />
                        <View className="flex-1 bg-white">
                            <Text className="text-lg font-spice-semibold">
                                {item.book.title}
                            </Text>
                            <Text className="text-sm text-gray-600 mb-1">
                                {item.book.authors.split(',')}
                            </Text>
                            <View className="flex mb-1">
                                {item.book.good_reads_rating && (
                                    <RenderStars rating={item.book.good_reads_rating} />
                                )}
                            </View>
                            <View className="flex flex-row flex-wrap gap-1 mb-1">
                                {item.book.genres.slice(0, 3).map((genre, index) => (
                                    <Text
                                        key={JSON.stringify(genre)}
                                        className="px-2 py-0.5 bg-gray-200 rounded-full text-xs"
                                    >
                                        {genre.genre.name}
                                    </Text>
                                ))}
                            </View>
                            <Text className="text-xs text-gray-500">
                                {dayjs(item.created_at).fromNow()}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </Link>
            )}
            ItemSeparatorComponent={() => <View className="h-2 w-full border-b" />}
        />
    );
}
