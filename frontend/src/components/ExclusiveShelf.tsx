import { ExclusiveSelf, UserBookWithBook } from '@/types';
import { Link } from 'expo-router';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { ExclusiveSelfNameMap } from '@/constants';
import { FlashList } from '@shopify/flash-list';
import ImageTextBar from './ImageTextBar';
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
            <Text
                style={{
                    color: "white",
                    fontSize: 19,
                    fontWeight: "bold",
                    marginHorizontal: 10,
                    marginTop: 10,
                }}
            >
                {ExclusiveSelfNameMap[shelfName]}
            </Text>
            <View style={{ flex: 1, width: '100%' }}>
                <FlashList
                    data={userBooks}
                    renderItem={({ item }) => (
                        <Link
                            href={`/books/${item.book_id}`}
                            asChild
                            style={{ width: '90%' }}
                        >
                            <TouchableOpacity>
                                <ImageTextBar
                                    imageUri={item.book.good_reads_image_url || ''}
                                    text={item.book.title}
                                />
                            </TouchableOpacity>
                        </Link>
                    )}
                    numColumns={2}
                    keyExtractor={(item) => `${item.id}-${item.book_id}`}
                    estimatedItemSize={10}
                />
            </View>
        </>
    );
}

export default ExclusiveSelfItem;
