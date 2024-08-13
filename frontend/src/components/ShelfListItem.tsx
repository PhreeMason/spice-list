import { ShelfEntry } from '@/api/bookshelves';
import { View, Text, Image } from 'react-native';
import RenderStars from './RenderStars';
import { Link } from 'expo-router';



export default function ShelfListItem({ item }: { item: ShelfEntry }) {
    const userBook = item.user_book;
    const book = userBook.book;
    return (
        <Link href={`/books/${userBook.book_id}`}>
            <View className="flex flex-row bg-white w-full p-2">
                <Image
                    source={{
                        uri: book.good_reads_image_url || '',
                    }}
                    resizeMode="contain"
                    className="w-20 h-30 object-cover rounded-md mr-4 "
                />
                <View className="flex-1 bg-white">
                    <Text className="text-lg font-spice-semibold" numberOfLines={1}>
                        {book.title}
                    </Text>
                    <Text className="text-sm text-gray-600 mb-1" numberOfLines={1}>
                        {book.authors.replace(/\s+/g, ' ').split(',')}
                    </Text>
                    <View className="flex mb-1">
                        {book.good_reads_rating ? (
                            <RenderStars rating={Number(book.good_reads_rating)} />
                        ) : null}
                    </View>
                </View>
            </View>
        </Link>
    )
}