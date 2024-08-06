import { ScanResponseItem } from '@/api/book-scans';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import RenderStars from '@/components/RenderStars';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
dayjs.extend(relativeTime);

export default function ScanListItem({ item }: { item: ScanResponseItem }) {
    return (
        <View className="flex flex-row bg-white w-full p-2">
            <Image
                source={{
                    uri: item.book.good_reads_image_url || '',
                }}
                resizeMode="contain"
                className="w-20 h-30 object-cover rounded-md mr-4 "
            />
            <View className="flex-1 bg-white">
                <Text className="text-lg font-spice-semibold" numberOfLines={1}>
                    {item.book.title}
                </Text>
                <Text className="text-sm text-gray-600 mb-1" numberOfLines={1}>
                    {item.book.authors.replace(/\s+/g, ' ').split(',')}
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
        </View>
    );
}
