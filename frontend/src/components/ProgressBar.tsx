import { View } from 'react-native';
import React from 'react';

const ProgressBar = ({
    progressColor = '',
    progressPercentage = 0,
}: {
    progressColor: string;
    progressPercentage: number;
}) => {
    return (
        <View className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
            <View
                className={`bg-purple-500 h-2.5 rounded-full ${progressColor}`}
                style={{ width: `${progressPercentage}%` }}
            />
        </View>
    );
};

export default ProgressBar;
