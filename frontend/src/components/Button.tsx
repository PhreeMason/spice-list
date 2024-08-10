import { Text, TouchableOpacity } from 'react-native';
import React, { ReactElement } from 'react';

type ButtonProps = {
    title: string;
    handlePress: () => void;
    containerStyles?: string;
    textStyles?: string;
    isLoading?: boolean;
    leftIcon?: ReactElement<any, any> | null;
    rightIcon?: ReactElement<any, any> | null;
};

function CustomButton({
    title,
    handlePress,
    containerStyles = '',
    textStyles = '',
    isLoading = false,
    leftIcon = null,
    rightIcon = null,
}: ButtonProps) {
    return (
        <TouchableOpacity
            className={`bg-secondary rounded-xl min-h-[62px] items-center justify-center flex-row gap
            ${containerStyles}
            ${isLoading ? 'opacity-50' : ''}`}
            onPress={handlePress}
            activeOpacity={0.7}
            disabled={isLoading}
        >
            <>
                {leftIcon}
                <Text
                    className={`text-primary font-semibold text-lg ${textStyles}`}
                >
                    {title}
                </Text>
                {rightIcon}
            </>
        </TouchableOpacity>
    );
}

export default CustomButton;
