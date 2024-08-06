import { BookSearchResponse } from '@/api/books';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import RenderStars from './RenderStars';
import { Link } from 'expo-router';

function extractRating(ratingString: string) {
    const match = ratingString.match(/([\d.]+) avg rating/);
    return match ? parseFloat(match[1]) : null;
}

export default function SearchListItem({ item }: { item: BookSearchResponse }) {
    const { author, cover, rating, title, goodReadsUrl } = item;
    const ratingNumber = extractRating(rating);
    return (
        <Link href={`/search/${goodReadsUrl}/`} asChild>
            <TouchableOpacity className="flex flex-row bg-white w-full p-2">
                <Image
                    source={{
                        uri: cover || '',
                    }}
                    resizeMode="contain"
                    className="w-20 h-30 object-cover rounded-md mr-4 "
                />
                <View className="flex-1 bg-white">
                    <Text
                        className="text-lg font-spice-semibold"
                        numberOfLines={1}
                    >
                        {title}
                    </Text>
                    <Text
                        className="text-sm text-gray-600 mb-1"
                        numberOfLines={1}
                    >
                        {author.replace(/\s+/g, ' ').split(',')}
                    </Text>
                    <View className="flex mb-1">
                        {ratingNumber ? (
                            <RenderStars rating={ratingNumber} />
                        ) : null}
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    );
}
