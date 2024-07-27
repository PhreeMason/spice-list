import { ExclusiveSelf, UserBookWithBook } from '@/types';
import { Link } from 'expo-router';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { ExclusiveSelfNameMap } from '@/constants';
import { FlashList } from '@shopify/flash-list';

function ExclusiveSelfItem({
    userBooks,
    shelfName,
}: {
    userBooks: UserBookWithBook[];
    shelfName: ExclusiveSelf;
}) {
    if (!userBooks || userBooks.length === 0) return null;
    return (
        <>
            <Text className="text-xl font-spice-semibold capitalize">
                {ExclusiveSelfNameMap[shelfName]}
            </Text>
            <View style={{ height: 200, width: '100%' }}>
                <FlashList
                    data={userBooks}
                    renderItem={({ item }) => (
                        <Link
                            href={`/books/${item.book_id}`}
                            asChild
                        >
                            <TouchableOpacity>
                                <Image
                                    source={{
                                        uri:
                                            item.book.good_reads_image_url ||
                                            '',
                                    }}
                                    resizeMode="contain"
                                    style={{ width: 100, height: 100 }}
                                />
                            </TouchableOpacity>
                        </Link>
                    )}
                    numColumns={2}
                    keyExtractor={(item) => `${item.id}-${item.book_id}`}
                    estimatedItemSize={100}
                />
            </View>
        </>
    );
}

export default ExclusiveSelfItem;
