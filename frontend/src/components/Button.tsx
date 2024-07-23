import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

type ButtonProps = {
    title: string;
    handlePress: () => void;
    containerStyles?: string;
    textStyles?: string;
    isLoading?: boolean;
};

function CustomButton({
    title,
    handlePress,
    containerStyles = '',
    textStyles = '',
    isLoading = false,
}: ButtonProps) {
    return (
        <TouchableOpacity
            className={`bg-secondary rounded-xl min-h-[62px] items-center justify-center
            ${containerStyles}
            ${isLoading ? 'opacity-50' : ''}`}
            onPress={handlePress}
            activeOpacity={0.7}
            disabled={isLoading}
        >
            <Text
                className={`text-primary font-semibold text-lg ${textStyles}`}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}

export default CustomButton;
