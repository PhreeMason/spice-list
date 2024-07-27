import { View, Text, Image } from 'react-native'
import React from 'react'

const BookCoverCard = (
    { title, imageUrl }: {
        title: string,
        imageUrl: string
    }
) => {
    return (
        <View style={{ margin: 10 }}>
            {imageUrl && <Image
                style={{ width: 130, height: 130, borderRadius: 5 }}
                source={{ uri: imageUrl }}
                resizeMode="contain"
                alt={`${title} cover`}
            />}
            <Text
                style={{
                    fontSize: 13,
                    fontWeight: "500",
                    color: "white",
                    marginTop: 10,
                    maxWidth: 130
                }}
                numberOfLines={1}
            >
                {title}
            </Text>
        </View>
    )
}

export default BookCoverCard