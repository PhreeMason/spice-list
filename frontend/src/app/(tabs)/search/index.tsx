import { Text, View, FlatList } from 'react-native';
import { Link, router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';

import ScanListItem from '@/components/ScanListItem';
import { useMyScanList } from '@/api/book-scans';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function SearchScreen() {
    const { data: scans, isLoading, error } = useMyScanList();
    const queryClient = useQueryClient();


    if (error) {
        return <Text>{error.message}</Text>;
    }

    return (
        <View className="flex-1 w-full">
            <View className="border border-gray-200 bg-white px-4 p-2 rounded-md mb-2 items-center w-full self-center flex-row">
                <Link asChild href={'/search/books'}>
                    <TouchableOpacity className="flex-1 flex-row items-center p-2">
                        <Feather name="search" size={20} color="gray" />
                        <Text className="text-black pl-2">Search</Text>
                    </TouchableOpacity>
                </Link>
                <Link asChild href={'/search/barcode-scan'}>
                    <TouchableOpacity>
                        <Ionicons
                            name="barcode-sharp"
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                </Link>
            </View>
            <FlatList
                ListEmptyComponent={() => (
                    <View className="flex-1 justify-center items-center">
                        <Text className="mb-4">No books found</Text>
                        <Link href="/search/barcode-scan">
                            <Text className="text-white text-blue-500 text-semibold">
                                Scan your first book
                            </Text>
                        </Link>
                    </View>
                )}
                refreshing={isLoading}
                onRefresh={() =>
                    queryClient.invalidateQueries({ queryKey: ['user_scans'] })
                }
                data={scans}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => router.push(`/books/${item.book.id}`)}>
                        <ScanListItem item={item} />
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => (
                    <View className="h-1 w-full border-b" />
                )}
            />
        </View>
    );
}
