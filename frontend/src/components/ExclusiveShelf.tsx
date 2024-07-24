import { UserBookWithBook } from '@/types';
import { Link } from 'expo-router';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const shelfNameMap: { [key: string]: string } = {
    reading: 'Currently reading',
    'to-read': 'Want to read',
    read: 'Read',
    'did-not-finish': 'Did not finish',
};

function ExclusiveSelfItem({
    userBooks,
    shelfName,
}: {
    userBooks: UserBookWithBook[];
    shelfName: string;
}) {
    console.log('ExclusiveSelfItem : ', userBooks[0].book.good_reads_image_url);
    return (
        <View className="m-4">
            <Text className="text-xl font-spice-semibold capitalize">
                {shelfNameMap[shelfName]}
            </Text>
            <View className="flex flex-row flex-wrap justify-start gap-2">
                {userBooks.map(userBook => (
                    <Link href={`/books/${userBook.book_id}`} asChild>
                        <TouchableOpacity className="min-w-[100px] min-h-[100px]">
                            <Image
                                source={{
                                    uri:
                                        userBook.book.good_reads_image_url ||
                                        '',
                                }}
                                resizeMode="contain"
                                style={{ width: '100%', height: '100%' }}
                            />
                        </TouchableOpacity>
                    </Link>
                ))}
            </View>
        </View>
    );
}

export default ExclusiveSelfItem;
