import { View, Text } from 'react-native';
import React from 'react';

const ProgressBar = ({
    progressColor = '',
    progressPercentage = 0,
}: {
    progressColor: string;
    progressPercentage: number;
}) => {
    return (
        <View className="flex-row pt-2 pr-2">
            <View className="w-10/12 bg-gray-200 rounded-sm h-3.5 flex-row mt-1">
                <View
                    className={`bg-blue-500 h-3.5 rounded-sm ${progressColor} `}
                    style={{ width: `${progressPercentage}%` }}
                />
            </View>
            <Text className="text-sm text-gray-600 self-center pl-1">
                {progressPercentage}%
            </Text>
        </View>
    );
};

export default ProgressBar;
