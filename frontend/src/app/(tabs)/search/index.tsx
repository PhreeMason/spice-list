import { Text, View, FlatList } from 'react-native';
import { Link } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';

import ScanListItem from '@/components/ScanListItem';
import { useMyScanList } from '@/api/book-scans';
import { Feather } from '@expo/vector-icons';

export default function SearchScreen() {
    const { data: scans, isLoading, error } = useMyScanList();
    const queryClient = useQueryClient();

    if (error) {
        return <Text>{error.message}</Text>;
    }

    if (!scans || scans.length === 0) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="mb-4">No scans found</Text>
                <Link href="/scan" className="bg-blue-500 p-2 rounded-md">
                    <Text className="text-white">Scan your first book</Text>
                </Link>
            </View>
        );
    }
    return (
        <View className="flex-1">
            <Link asChild href={'/search/books'}>
                <TouchableOpacity className="bg-white p-2 rounded-md items-center w-11/12 self-center">
                    <Feather name="search" size={20} color="gray" />
                    <Text className="text-black p-2">Search Books</Text>
                </TouchableOpacity>
            </Link>
            <FlatList
                refreshing={isLoading}
                onRefresh={() =>
                    queryClient.invalidateQueries({ queryKey: ['user_scans'] })
                }
                data={scans}
                renderItem={({ item }) => (
                    <Link href={`/books/${item.book.id}`}>
                        <ScanListItem item={item} />
                    </Link>
                )}
                ItemSeparatorComponent={() => (
                    <View className="h-1 w-full border-b" />
                )}
            />
        </View>
    );
}
