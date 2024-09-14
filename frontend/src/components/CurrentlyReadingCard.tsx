import { CurrentlyReadingBook } from '@/types/index';
import {
    View,
    Text,
    Image,
    Platform,
    Pressable,
    TouchableOpacity,
} from 'react-native';
import ProgressBar from '@/components/ProgressBar';
import { router } from 'expo-router';

export default function CurrentlyReadingCard({
    item,
}: {
    item: CurrentlyReadingBook;
}) {
    const { userBookId, coverUrl, title, authors, pages, currentPage, bookId } =
        item;
    const progressPercentage: number | null = currentPage
        ? Math.floor(Math.min((currentPage / pages) * 100, 100))
        : null;
    const shadowStyle =
        Platform.OS === 'ios' ? 'shadow' : 'shadow-md shadow-black/60';
    return (
        <View
            className={`bg-white ${shadowStyle} w-80 border border-slate-100 rounded-xl p-2 pb-4`}
        >
            <View className="flex-row">
                <Pressable
                    key={`${userBookId}-${title}`}
                    className="mr-4 shadow-sm"
                    onPress={() => router.push(`/books/${bookId}`)}
                >
                    <Image
                        source={{ uri: coverUrl }}
                        resizeMode="contain"
                        alt={`${title} cover`}
                        className="rounded-md"
                        style={{ width: 80, height: 128 }}
                    />
                </Pressable>

                <View className="flex-1 w-full">
                    <View className="flex justify-items-start">
                        <Text
                            className="text-lg font-spice-semibold"
                            numberOfLines={1}
                            onPress={() => router.push(`/books/${bookId}`)}
                        >
                            {title}
                        </Text>
                        <Text
                            className="text-sm text-gray-500 mb-2"
                            numberOfLines={1}
                        >
                            {authors.replace(/\s+/g, ' ').split(',')}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() =>
                            router.push(`/reading-sessions/add/${userBookId}`)
                        }
                        className="p-2 bg-blue-500 rounded w-20"
                    >
                        <Text className="text-white self-center">Update</Text>
                    </TouchableOpacity>
                    <ProgressBar
                        progressPercentage={progressPercentage || 0}
                        progressColor={'text-purple-500'}
                    />
                </View>
            </View>
            <View className="w-full my-2 border border-slate-200" />
            <View>
                <Text className="text-xl font-bold">Reading Stats</Text>
            </View>
            <View className="flex-row justify-around mt-1 divide-x divide-slate-200">
                <View className="w-20 justify-center items-center">
                    <Text className="font-bold text-lg text-blue-500">
                        2.0 hr
                    </Text>
                    <Text className="text-slate-600">Reading</Text>
                </View>
                <View className="w-20 justify-center items-center">
                    <Text className="font-bold text-lg text-blue-500">
                        30 min
                    </Text>
                    <Text className="text-slate-600 text-center">
                        Per session
                    </Text>
                </View>
                <View className="w-20 justify-center items-center">
                    <Text className="font-bold text-lg text-blue-500">
                        2 mins
                    </Text>
                    <Text className="text-slate-600">Per page</Text>
                </View>
            </View>
        </View>
    );
}
