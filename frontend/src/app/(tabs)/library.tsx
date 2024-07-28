import {
    Text,
    View,
    FlatList,
    ActivityIndicator,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Link } from 'expo-router';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { useGetUserBooks, useGetBookShelves } from '@/api/bookshelves';
import { ExclusiveSelf, UserBookWithBook } from '@/types';
import { useGetCurrentlyReadingBooks } from '@/api/books';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ImageTextBar from '@/components/ImageTextBar';
import { FlashList } from '@shopify/flash-list';
import BookCoverCard from '@/components/BookCoverCard';

dayjs.extend(relativeTime);
function chunkArray<T>(array: T[], size: number): T[][] {
    const chunkedArray = [];
    let index = 0;
    while (index < array.length) {
        chunkedArray.push(array.slice(index, index + size));
        index += size;
    }
    return chunkedArray;
}
export default function LibraryScreen() {
    const { data: myBooks, isLoading, error } = useGetUserBooks();
    const { data: bookshelves } = useGetBookShelves(6);
    const { data: currentlyReadingBooks } = useGetCurrentlyReadingBooks();

    const greetingMessage = () => {
        const currentTime = new Date().getHours();
        if (currentTime < 12) {
            return 'Good Morning';
        } else if (currentTime < 16) {
            return 'Good Afternoon';
        } else {
            return 'Good Evening';
        }
    };
    const message = greetingMessage();

    if (isLoading) {
        return <ActivityIndicator size="large" />;
    }

    if (error) {
        return <Text>{error.message}</Text>;
    }

    if (!myBooks || myBooks.length === 0) {
        return (
            <View>
                <Text>No myBooks found</Text>
                <Link href="/scan">Scan a your first book</Link>
            </View>
        );
    }

    const booksGroupedByShelf = myBooks.reduce(
        (acc: { [key: string]: UserBookWithBook[] }, userBook) => {
            if (!acc[userBook.exclusive_shelf]) {
                acc[userBook.exclusive_shelf] = [];
            }
            // @ts-ignore
            acc[userBook.exclusive_shelf].push(userBook);
            return acc;
        },
        {},
    );

    const shelves = Object.keys(booksGroupedByShelf).map(shelf => ({
        shelfName: shelf as ExclusiveSelf,
        userBooks: booksGroupedByShelf[shelf],
    }));

    return (
        <LinearGradient colors={['#040306', '#131624']} style={{ flex: 1 }}>
            <ScrollView style={{ marginTop: 50 }}>
                {/* Header */}
                <View
                    style={{
                        padding: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Image
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                            }}
                            resizeMode="cover"
                            source={{ uri: 'https://i.pravatar.cc/100' }}
                        />
                        <Text
                            style={{
                                marginLeft: 10,
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: 'white',
                            }}
                        >
                            {message}
                        </Text>
                    </View>

                    <MaterialCommunityIcons
                        name="lightning-bolt-outline"
                        size={24}
                        color="white"
                    />
                </View>
                {/* current reads */}
                <Text
                    style={{
                        color: 'white',
                        fontSize: 19,
                        fontWeight: 'bold',
                        marginHorizontal: 10,
                        marginTop: 10,
                    }}
                >
                    Currently Reading
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {currentlyReadingBooks?.map(book => (
                        <Link
                            key={`${book.bookId}-${book.title}`}
                            href={`/books/${book.bookId}`}
                            className="m-2"
                        >
                            <BookCoverCard
                                title={book.title}
                                imageUrl={book.coverUrl || ''}
                                bookPages={book.pages || 0}
                                authors={book.authors}
                                currentPage={book.currentPage || 0}
                            />
                        </Link>
                    ))}
                </ScrollView>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 19,
                        fontWeight: 'bold',
                        marginHorizontal: 10,
                        marginTop: 10,
                    }}
                >
                    Recent Shelves
                </Text>
                {/* First Row */}
                <FlashList
                    data={bookshelves}
                    renderItem={({ item }) => (
                        <Link
                            href={`/shelves/shelf/${item.id}`}
                            asChild
                            className="w-full"
                        >
                            <TouchableOpacity>
                                <ImageTextBar
                                    imageUri="https://i.pravatar.cc/100"
                                    text={item.name}
                                />
                            </TouchableOpacity>
                        </Link>
                    )}
                    numColumns={2}
                    estimatedItemSize={6}
                    keyExtractor={item => item.name}
                />
                {/* <View>

                    <FlashList
                        data={shelves}
                        renderItem={({ item }) => (
                            <ExclusiveSelfItem
                                shelfName={item.shelfName}
                                userBooks={item.userBooks}
                            />
                        )}
                        keyExtractor={item => item.shelfName}
                        showsVerticalScrollIndicator={false}
                    />
                </View> */}
            </ScrollView>
        </LinearGradient>
    );
}
