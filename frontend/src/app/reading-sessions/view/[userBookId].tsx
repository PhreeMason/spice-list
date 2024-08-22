import { Text, View, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useGetReadingSessions } from '@/api/reading-log';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ReadingSessions() {
    const { userBookId } = useLocalSearchParams();
    const userBookIdNumber = Number(userBookId);
    const { data, isLoading, error } = useGetReadingSessions(userBookIdNumber);

    if (isLoading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;
    const user_books = data?.[0].user_books;
    const books = user_books?.books;
    const title = books?.title;
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
                            onPress={() => (
                                user_books?.id ? router.push(`/reading-sessions/add/${user_books.id}`) : null
                            )}
                        />
                    )
                }}
            />
            <FlashList
                data={data}
                renderItem={({ item }) => (
                    <TouchableOpacity>
                        <View>
                            <Text>{item.date_time}</Text>
                            <Text>{item.pages_read} pages</Text>
                            <Text>{item.time_spent} minutes</Text>
                            <Text>start page {item.start_page}</Text>
                            <Text>end page {item.end_page}</Text>
                            <Text>{item.notes}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                estimatedItemSize={100}
                ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'black' }} />}
            />
        </View>
    )
}
