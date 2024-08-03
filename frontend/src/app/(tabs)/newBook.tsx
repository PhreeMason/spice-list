import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, Entypo, FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Tabs } from "expo-router";
import {v4 as uuidv4} from 'uuid';

const SongInfoScreen = () => {
    const navigation = useNavigation();
    return (
        <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
            <Tabs.Screen options={{ headerShown: false }} />
            <ScrollView style={{ marginTop: 50 }}>
                <View style={{ flexDirection: "row", padding: 12 }}>
                    <Ionicons
                        onPress={() => navigation.goBack()}
                        name="arrow-back"
                        size={24}
                        color="white"
                    />
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Image
                        style={{ width: 300, height: 400, borderRadius: 10 }}
                        resizeMode="contain"
                        source={{ uri: "https://m.media-amazon.com/images/I/81-AfYbewJL._AC_UF1000,1000_QL80_.jpg" }}
                    />
                </View>
                <Text
                    className="text-black mt-4 font-spice-bold text-2xl px-2 capitalize"
                >
                    book name
                </Text>
                <Text
                    className="text-black text-xs px-2 capitalize"
                >
                    author name
                </Text>
                <View
                    className="flex-row items-center mt-1 px-2 capitalize"
                >
                    <Ionicons name="star-outline" size={12} color="rgb(148 163 184)" />
                    <Text className="text-sm text-neutral-400"> 4.5 (200)</Text>
                    <Text className="text-sm text-neutral-400">&#8901; Read</Text>
                </View>
                <View
                    className="flex-row items-center mt-1 px-2 gap-1"
                >
                    {[
                        { name: "genre" },
                        { name: "genre" },
                        { name: "genre" },
                        { name: "genre" },
                    ].map((item) => (
                        <Text key={uuidv4()} style={{ color: "#909090", fontSize: 13, fontWeight: "500" }}>
                            {item.name}
                        </Text>
                    ))}
                </View>

                <View className="flex-row px-2 py-4 gap-6">
                    <TouchableOpacity>
                        <FontAwesome name="bookmark-o" size={22} color="rgb(203 213 225);" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Entypo name="dots-three-horizontal" size={22} color="rgb(203 213 225);" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

export default SongInfoScreen;

const styles = StyleSheet.create({});