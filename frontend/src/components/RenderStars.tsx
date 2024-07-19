import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View, Text } from 'react-native';

type RenderStarsProps = {
    rating: number;
};

function RenderStars({ rating }: { rating: number }) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    return (
        <View className="flex items-center flex-row">
            {[...Array(5)].map((_, i) => (
                <FontAwesome
                    key={`star-${i}`}
                    name={
                        i < fullStars
                            ? 'star'
                            : i === fullStars && halfStar
                                ? 'star-half-o'
                                : 'star-o'
                    }
                    size={25}
                    color="#FFC000"
                />
            ))}
            <Text className="ml-1 text-xs text-gray-600">{rating.toFixed(2)}</Text>
        </View>
    );
}

export default RenderStars;
