import { Text, View, Image, FlatList } from 'react-native';
import { useScanList } from '@/providers/ScanListProvider';

export default function TabOneScreen() {
    const { scanList } = useScanList();
    return (
        <FlatList
            data={scanList}
            renderItem={({ item }) => (
                <View className="flex flex-row background-white w-full py-2">
                    <Image
                        source={{
                            uri: item.book.volumeInfo.imageLinks?.thumbnail
                        }}
                        resizeMode="contain"
                        className="w-20 h-20"
                    />
                    <View className="w-11/12">
                        <Text className="text-xl text-bold overflow-wrap">
                            {item.book.volumeInfo.title}
                        </Text>
                        <Text className="text-md text-gray text-bold overflow-wrap ">
                            {item.book.volumeInfo.authors}
                        </Text>
                    </View>
                </View>
            )}
            ItemSeparatorComponent={() => (
                <View className="h-2 w-11/12 bg-gray border-b" />
            )}
        />
    );
}
