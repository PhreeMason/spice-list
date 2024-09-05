import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useGetReadingSessions } from '@/api/reading-log';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Agenda } from 'react-native-calendars';
import { useGetBookCoverImageByUserBookId } from '@/api/books';

const NoReadingSessions = ({ userBookId }: { userBookId: number }) => {
    return (
        <View className='flex-1 justify-center align-center' >
            <Text className='text-center'>No reading sessions found</Text>
            <Text
                onPress={() => router.push(`/reading-sessions/add/${userBookId}`)}
                className='text-center underline font-spice-bold text-blue-500 cursor-pointer'>
                Add new reading session
            </Text>
        </View>
    );
}

const LoadingReadingSessions = () => {
    return (
        <View style={styles.loadingContainer}>
            <Text>Loading reading sessions...</Text>
        </View>
    );
}

export default function ReadingSessions() {
    const { userBookId } = useLocalSearchParams();
    const userBookIdNumber = Number(userBookId);
    const { data, isLoading, error } = useGetReadingSessions(userBookIdNumber);
    const { data: image } = useGetBookCoverImageByUserBookId(userBookIdNumber);
    if (isLoading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;
    const user_books = data?.[0]?.user_books;
    const books = user_books?.books;
    const title = books?.title;
    if (isLoading) {
        return <LoadingReadingSessions />;
    }

    const items = data?.reduce((acc: Record<string, any[]>, item) => {
        // use 2024-08-13 instead of 2024-08-13T02:18:56.435667+00:00
        const date_time = item.date_time.split('T')[0];
        if (!acc[date_time]) {
            acc[date_time] = [];
        }
        acc[date_time].push(item);
        return acc;
    }, {});

    const lastStartDate = items ? Object.keys(items)[1] : undefined;
    return (
        <View className='flex-1'>
            <Stack.Screen
                options={{
                    title: title ? `${title} Reading Sessions` : 'Reading Sessions',
                    headerRight: () => (
                        <MaterialCommunityIcons
                            name='plus'
                            size={24}
                            color='black'
                            onPress={() => router.push(`/reading-sessions/add/${userBookIdNumber}`)}
                        />
                    )
                }}
            />
            {data?.length ?
                <Agenda
                    items={items}
                    selected={lastStartDate}
                    renderItem={(item: {
                        date_time: string;
                        start_page: number;
                        end_page: number;
                        pages_read: number;
                        time_spent: number;
                        notes: string;
                        id: number;
                    }) => {
                        return (
                            // open edit page on press
                            <TouchableOpacity onPress={() => router.push(`/reading-sessions/edit/${item.id}`)}>

                                <View style={styles.item}>
                                    <View style={styles.itemContent}>
                                        <Text style={styles.itemTitle}>Reading Session</Text>
                                        <Text>Pages: {item.start_page} - {item.end_page}</Text>
                                        <Text>Pages Read: {item.pages_read}</Text>
                                        <Text>Time Spent: {item.time_spent} minutes</Text>
                                        <Text numberOfLines={3}>Notes: {item.notes}</Text>
                                    </View>
                                    <Image
                                        source={{ uri: image || 'https://via.placeholder.com/50x75' }}
                                        style={styles.coverImage}
                                    />
                                </View>
                            </TouchableOpacity>
                        )
                    }
                    }
                    renderEmptyDate={() => {
                        return (
                            <View style={styles.emptyDate}>
                                <Text>No reading sessions for this day</Text>
                            </View>
                        );
                    }}
                    rowHasChanged={(r1: any, r2: any) => {
                        return r1.date_time !== r2.date_time;
                    }}
                /> :
                <NoReadingSessions userBookId={userBookIdNumber} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
        flexDirection: 'row',
    },
    coverImage: {
        width: 50,
        height: 75,
        marginRight: 10,
        // alignSelf: 'center',
    },
    itemContent: {
        flex: 1,
    },
    itemTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});