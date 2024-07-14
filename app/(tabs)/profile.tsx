import { View, Text, TouchableOpacity, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { profile2 } from '@/constants/images';

const Settings = ({ className }: { className?: string }) => (
    <MaterialCommunityIcons
        name="cog-outline"
        size={24}
        className={className}
    />
);
const Share = ({ className }: { className?: string }) => (
    <EvilIcons className={className} name="share-google" size={24} />
);
const Star = ({ className }: { className?: string }) => (
    <FontAwesome name="star" size={24} className={className} />
);

const TabItem = ({
    listTitle,
    countForList
}: {
    listTitle: string;
    countForList: string | number;
}) => (
    <TouchableOpacity className="flex-row text-gray-500 gap-2">
        <Text className="font-spice-semibold">{listTitle}</Text>
        <Text className="text-xs bg-gray-200 px-1 rounded-lg self-center">
            {countForList}
        </Text>
    </TouchableOpacity>
);

const profileData = {
    name: 'Robbin Butler',
    username: '@robbutler',
    followers: 214,
    following: 54,
    books: 246,
    lists: 12,
    quotes: 6,
    feed: [
        {
            id: 1,
            user: 'Andrew',
            date: '05.10.2022',
            rating: 4,
            content: "Finished Harry Potter and the Sorcerer's Stone"
        },
        {
            id: 2,
            user: 'Matthew',
            date: '02.10.2022',
            rating: 4,
            content:
                'Both of my kids were born after the whole Harry Potter series was released. They are now old enough to start appreciating the story so I thought it would be fun to read it out loud to them. While it did take us a while because, you know . . . life happens . . . we were able to find a few minutes every few nights or so to read a chapter or part of a chapter. It was really fun to see them getting'
        }
    ]
};

const Profile = () => {
    return (
        <View className="bg-white min-h-screen font-sans">
            <View className="p-4">
                <View className="flex flex-row justify-end space-x-4 mb-4">
                    <Share className="w-6 h-6 text-gray-500" />
                    <Settings className="w-6 h-6 text-gray-500" />
                </View>

                <View className="flex items-center mb-4">
                    <Image
                        source={profile2}
                        alt="Profile"
                        className="w-60 h-60 rounded-full mr-4"
                    />
                    <View>
                        <Text className="text-3xl font-bold mt-4">
                            {profileData.name}
                        </Text>
                        <Text className="text-gray-500 text-base text-center mt-2">
                            {profileData.username}
                        </Text>
                    </View>
                </View>

                <View className="flex flex-row justify-around mb-4">
                    <View className="flex flex-row space-x-1 p-2 bg-slate-100 rounded-md">
                        <Text className="font-bold self-center">
                            {profileData.followers}
                        </Text>
                        <Text className="text-sm text-gray-500 self-center">
                            Followers
                        </Text>
                    </View>
                    <View className="flex flex-row space-x-1 p-2 bg-slate-100 rounded-md">
                        <Text className="font-bold self-center">
                            {profileData.following}
                        </Text>
                        <Text className="text-sm text-gray-500 self-center">
                            Following
                        </Text>
                    </View>
                    <TouchableOpacity className="text-blue-500 p-2 border-2 border-blue-300 rounded-md">
                        <Text className="text-blue-500">Edit Profile</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex-row justify-between mb-4">
                    <TouchableOpacity>
                        <Text className="font-spice-semibold">Feed</Text>
                    </TouchableOpacity>
                    {/* TODO: Setup stack navigator screen and remove this */}
                    <TabItem listTitle="Books" countForList={profileData.books} />
                    <TabItem listTitle="Lists" countForList={profileData.lists} />
                    <TabItem listTitle="Quotes" countForList={profileData.quotes} />
                </View>
            </View>
        </View>
    );
};

export default Profile;
