import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants';

type FromFieldProps = {
    title: string;
    value: string;
    placeholder?: string;
    handleChangeText: (text: string) => void;
    containerStyles?: string;
    keyboardType?:
        | 'default'
        | 'number-pad'
        | 'numeric'
        | 'email-address'
        | 'phone-pad';
};

function FormField({
    title,
    value,
    placeholder,
    handleChangeText,
    containerStyles,
    keyboardType = 'default',
    ...props
}: FromFieldProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`space-y-2 ${containerStyles}`}>
            <Text className="text-base text-gray-100 font-spice-medium">
                {title}
            </Text>

            <View className="w-full h-16 bg-black-100 px-4 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row">
                <TextInput
                    className="flex-1 text-white font-spice-semibold text-base"
                    value={value}
                    placeholder={placeholder || ''}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && !showPassword}
                />

                {title === 'Password' && (
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Image
                            source={!showPassword ? icons.eye : icons.eyeHide}
                            className="w-6 h-6"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

export default FormField;
