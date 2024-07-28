import { View, Text, Image } from 'react-native';
import React from 'react';

const ImageTextBar = ({
    imageUri,
    text,
}: {
    imageUri: string;
    text: string;
}) => {
    return (
        <View
            style={{
                marginBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                flex: 1,
                marginHorizontal: 10,
                marginVertical: 8,
                backgroundColor: '#202020',
                borderRadius: 4,
                elevation: 3,
            }}
        >
            <Image
                style={{ width: 55, height: 55 }}
                source={{ uri: imageUri }}
            />
            <Text
                style={{
                    color: 'white',
                    fontSize: 13,
                    fontWeight: 'bold',
                    paddingRight: 10,
                }}
                numberOfLines={1}
            >
                {text}
            </Text>
        </View>
    );
};

export default ImageTextBar;
