import { Text, View, Image, FlatList } from 'react-native';

export default function HistoryScreen() {
    return (
        // <FlatList
        //     data={[]}
        //     renderItem={({ item }) => (
        //         <View className="flex flex-row background-white w-full py-2">
        //             <Image
        //                 source={{
        //                     uri: item.book.volumeInfo.imageLinks?.thumbnail
        //                 }}
        //                 resizeMode="contain"
        //                 className="w-20 h-20"
        //             />
        //             <View className="w-11/12">
        //                 <Text className="text-xl text-bold overflow-wrap">
        //                     {item.book.volumeInfo.title}
        //                 </Text>
        //                 <Text className="text-md text-gray text-bold overflow-wrap ">
        //                     {item.book.volumeInfo.authors}
        //                 </Text>
        //                 <View className="flex flex-row">
        //                     <Text className="text-lg text-gray text-bold">
        //                         {Math.floor(Math.random() * 4 + 1)}{' '}
        //                     </Text>
        //                     <Text className="text-sm align-end">🌶️</Text>
        //                 </View>
        //             </View>
        //         </View>
        //     )}
        //     ItemSeparatorComponent={() => (
        //         <View className="h-2 w-11/12 bg-gray border-b" />
        //     )}
        // />
        <Text>History</Text>
    );
}
