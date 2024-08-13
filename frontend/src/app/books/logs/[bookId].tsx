import { useGetReadingSessions } from '@/api/reading-log';
import { FlashList } from '@shopify/flash-list';
import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import BottomSheet from '@/components/BottomSheet';
import ReadingSessionTracker from '@/components/ReadingSessionTracker';

export default function ReadingLog() {
    const { bookId } = useLocalSearchParams<{ bookId: string }>();
    const { data: sessions, isLoading, error } = useGetReadingSessions(Number(bookId));

    if (isLoading) return <Text>Loading...</Text>;

    if (error) return <Text>{error.message}</Text>;
    return (
        <View>
            <Stack.Screen options={{
                title: 'Reading Log',
                presentation: 'modal'
            }} />

            <TouchableOpacity>
                <Text>Add</Text>
            </TouchableOpacity>
            <FlashList
                ListEmptyComponent={<Text>No sessions found</Text>}
                data={sessions}
                renderItem={({ item }) => (
                    <View>
                        <Text>Previous Session:</Text>
                        <Text>Start Page: {item.start_page}</Text>
                        <Text>End Page: {item.end_page}</Text>

                        {item.end_page && item.start_page ? (
                            <Text>
                                Pages Read:{' '}
                                {item.end_page -
                                    item.start_page}
                            </Text>
                        ) : null}
                        <Text>
                            Time Spent: {item.time_spent} minutes
                        </Text>

                        {item.time_spent &&
                            item.start_page &&
                            item.end_page ? (
                            <Text>
                                Pages Per Minute :{' '}
                                {(
                                    (item.end_page -
                                        item.start_page) /
                                    item.time_spent
                                ).toFixed(2)}
                            </Text>
                        ) : null}
                    </View>
                )}

            />
        </View>
    );
}