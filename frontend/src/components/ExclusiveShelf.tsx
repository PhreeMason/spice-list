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
    if (!userBooks || userBooks.length === 0) return null;
    return (
        <>
            <Text className="text-xl font-spice-semibold capitalize">
                {shelfNameMap[shelfName]}
            </Text>
            <View className="flex flex-row flex-wrap justify-start">
                {userBooks.map(userBook => (
                    <Link key={userBook.id} href={`/books/${userBook.book_id}`} asChild>
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
        </>
    );
}

export default ExclusiveSelfItem;
