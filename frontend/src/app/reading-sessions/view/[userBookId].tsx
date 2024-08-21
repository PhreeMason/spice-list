import {Text, View, TouchableOpacity} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import {useGetReadingSessions} from '@/api/reading-log';
import { useLocalSearchParams } from 'expo-router';

export default function ReadingSessions() {
    const { userBookId } = useLocalSearchParams();
    const userBookIdNumber = Number(userBookId);
    const { data, isLoading, error } = useGetReadingSessions(userBookIdNumber);

    if (isLoading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;
    return (
        <FlashList 
            data={data} 
            renderItem={({ item }) => (
                <TouchableOpacity> 
                    <View>
                        <Text>{item.date_time}</Text>
                        <Text>{item.pages_read} pages</Text>
                        <Text>{item.time_spent} minutes</Text>
                        <Text>{item.notes}</Text>
                    </View>
                </TouchableOpacity>
            )}
            estimatedItemSize={100}
            ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'black' }} />}
        />
    )
}
