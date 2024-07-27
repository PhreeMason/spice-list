import { Text, View, FlatList, ActivityIndicator, Image, Pressable, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { useGetUserBooks } from '@/api/bookshelves';
import { ExclusiveSelf, UserBookWithBook } from '@/types';
import ExclusiveSelfItem from '@/components/ExclusiveShelf';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import ImageTextBar from '@/components/ImageTextBar';
import { FlashList } from '@shopify/flash-list';
import BookCoverCard from '@/components/BookCoverCard';
dayjs.extend(relativeTime);

export default function LibraryScreen() {
    const { data: myBooks, isLoading, error } = useGetUserBooks();

    const greetingMessage = () => {
        const currentTime = new Date().getHours();
        if (currentTime < 12) {
            return "Good Morning";
        } else if (currentTime < 16) {
            return "Good Afternoon";
        } else {
            return "Good Evening";
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
        <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
            <ScrollView>
                {/* Header */}
                <View
                    style={{
                        padding: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                            }}
                            resizeMode="cover"
                            source={{ uri: "https://i.pravatar.cc/100" }}
                        />
                        <Text
                            style={{
                                marginLeft: 10,
                                fontSize: 20,
                                fontWeight: "bold",
                                color: "white",
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
                {/* First Row */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Pressable
                        style={{
                            marginBottom: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                            flex: 1,
                            marginHorizontal: 10,
                            marginVertical: 8,
                            backgroundColor: "#202020",
                            borderRadius: 4,
                            elevation: 3,
                        }}
                    >
                        <LinearGradient colors={["#33006F", "#FFFFFF"]}>
                            <Pressable
                                style={{
                                    width: 55,
                                    height: 55,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <AntDesign name="heart" size={24} color="white" />
                            </Pressable>
                        </LinearGradient>

                        <Text style={{ color: "white", fontSize: 13, fontWeight: "bold" }}>
                            Want to Read
                        </Text>
                    </Pressable>

                    <ImageTextBar imageUri="https://i.pravatar.cc/100" text="Hiphop Tamhiza" />

                </View>
                <View>

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
                </View>

                <Text
                    style={{
                        color: "white",
                        fontSize: 19,
                        fontWeight: "bold",
                        marginHorizontal: 10,
                        marginTop: 10,
                    }}
                >
                    Currently Reading
                </Text>
                <ScrollView
                    horizontal showsHorizontalScrollIndicator={false}>
                    {shelves[0].userBooks.map((userBook) => (
                        <BookCoverCard
                            title={userBook.book.title}
                            imageUrl={userBook.book.good_reads_image_url || ''}
                        />
                    ))}
                </ScrollView>
            </ScrollView>
        </LinearGradient>
    );
}