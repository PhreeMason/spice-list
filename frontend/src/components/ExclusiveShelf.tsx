import { UserBookWithBook } from '@/types';
import { Link } from 'expo-router';
import { View, FlatList, Text, TouchableOpacity, Image } from 'react-native';

function ExclusiveSelfItem({
    userBooks,
    shelfName,
}: {
    userBooks: UserBookWithBook[];
    shelfName: string;
}) {
    console.log('ExclusiveSelfItem : ', userBooks[0].book.good_reads_image_url);
    return (
        <View className="">
            <Text className="text-xl text-center font-spice-semibold">
                {shelfName}
            </Text>
            <FlatList
                data={userBooks}
                horizontal
                renderItem={({ item }) => (
                    <Link href={`/(tabs)/${item.book_id}`} asChild>
                        <TouchableOpacity className="p-2">
                            <View className="h-60 w-40 border-2 border-black-200 rounded-2xl">
                                <Image
                                    source={{
                                        uri:
                                            item.book.good_reads_image_url ||
                                            '',
                                    }}
                                    resizeMode="contain"
                                    className="min-w-20 min-h-30"
                                />
                            </View>
                        </TouchableOpacity>
                    </Link>
                )}
            />
        </View>
    );
}

export default ExclusiveSelfItem;
