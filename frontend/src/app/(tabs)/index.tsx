import {
    Text,
    View,
    ActivityIndicator,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Link } from 'expo-router';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { useGetBookShelves } from '@/api/bookshelves';
import { useGetCurrentlyReadingBooks } from '@/api/books';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ImageTextBar from '@/components/ImageTextBar';
import { FlashList } from '@shopify/flash-list';
// import BookCoverCard from '@/components/BookCoverCard';
import CurrentlyReadingCard from '@/components/CurrentlyReadingCard';

dayjs.extend(relativeTime);

export default function LibraryScreen() {
    const { data: bookshelves, isLoading, error } = useGetBookShelves();
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

    return (
        // <LinearGradient colors={['#f8fafc', '#f5f3ff']} style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
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
                                color: 'black',
                            }}
                        >
                            {message}
                        </Text>
                    </View>

                    <MaterialCommunityIcons
                        name="lightning-bolt-outline"
                        size={24}
                        color="black"
                    />
                </View>
                {/* current reads */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ backgroundColor: 'white' }}
                >
                    {currentlyReadingBooks?.map(book => (
                        <View
                            key={`${book.bookId}-${book.title}`}
                            className="p-2 mb-3"
                        >
                            <CurrentlyReadingCard item={book} />
                        </View>
                    ))}
                </ScrollView>
                <Text
                    style={{
                        color: 'black',
                        fontSize: 19,
                        fontWeight: 'bold',
                        marginHorizontal: 10,
                        marginTop: 10,
                    }}
                >
                    Recent Shelves
                </Text>
                {/* First Row */}
                <View>
                    <FlashList
                        ListEmptyComponent={
                            <View>
                                <Text>No shelves found</Text>
                            </View>
                        }
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
                </View>
            </ScrollView>
        </View>
        // </LinearGradient>
    );
}
