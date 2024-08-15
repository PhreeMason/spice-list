import { CurrentlyReadingBook } from '@/types/index'
import { View, Text, Image, Platform } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ProgressBar from '@/components/ProgressBar'
import { SCREEN_WIDTH } from '@/constants/screen'

export default function CurrentlyReadingCard({ item }: { item: CurrentlyReadingBook }) {
    const {
        startDate,
        coverUrl,
        title,
        authors,
        pages,
        currentPage,
        deadline,
        bookId,
        readingSessions,
    } = item
    const progressPercentage: number | null = currentPage ? Math.min((currentPage / pages) * 100, 100) : null
    const cardWidth = SCREEN_WIDTH - 10
    const shadowStyle = Platform.OS === 'ios' ? 'shadow' : 'shadow-md shadow-black/60'
    return (
        <View className={`bg-white ${shadowStyle} w-80 border border-slate-100 rounded-xl p-2 pb-4`}>
            <View className='flex-row'>
                <Image
                    source={{ uri: coverUrl }}
                    resizeMode="contain"
                    alt={`${title} cover`}
                    className="w-20 h-30 object-cover rounded-md mr-4 shadow-md"
                />
                <View className="flex-1 w-full">
                    <View className="flex justify-items-start">
                        <Text className="text-lg font-spice-semibold" numberOfLines={1}>
                            {title}
                        </Text>
                        <Text className="text-sm text-gray-500 mb-2" numberOfLines={1}>
                            {authors.replace(/\s+/g, ' ').split(',')}
                        </Text>
                    </View>
                    <TouchableOpacity className='p-2 bg-blue-500 rounded w-20'>
                        <Text className="text-white self-center">Update</Text>
                    </TouchableOpacity>
                    <ProgressBar
                        progressPercentage={67}
                        progressColor={'text-purple-500'}
                    />
                </View>
            </View>
            <View className='w-full my-2 border border-slate-200' />
            <View>
                <Text className='text-xl font-bold'>Reading Stats</Text>
            </View>
            <View className='flex-row justify-around mt-1 divide-x divide-slate-200'>
                <View className='w-20 justify-center items-center'>
                    <Text className='font-bold text-lg text-blue-500'>2.0 hr</Text>
                    <Text className='text-slate-600'>Reading</Text>
                </View>
                <View className='w-20 justify-center items-center'>
                    <Text className='font-bold text-lg text-blue-500'>30 min</Text>
                    <Text className='text-slate-600 text-center'>Per session</Text>
                </View>
                <View className='w-20 justify-center items-center'>
                    <Text className='font-bold text-lg text-blue-500'>2 mins</Text>
                    <Text className='text-slate-600'>Per page</Text>
                </View>
            </View>
        </View>
    )
}