import { View, Text, Image } from 'react-native';
import React from 'react';
import ProgressBar from './ProgressBar';

const BookCoverCard = ({
    title,
    imageUrl,
    authors,
    bookPages,
    currentPage = 0,
}: {
    title: string;
    imageUrl: string;
    authors: string;
    bookPages: number;
    currentPage: number;
}) => {
    const progressPercentage = Math.min((currentPage / bookPages) * 100, 100);

    return (
        <View className="justify-start items-start">
            {imageUrl && (
                <Image
                    className="rounded-md w-32 h-32"
                    source={{ uri: imageUrl }}
                    resizeMode="contain"
                    alt={`${title} cover`}
                />
            )}
            <Text
                className="font-spice-semibold text-black mt-2 max-w-[130px]"
                numberOfLines={1}
            >
                {title}
            </Text>
            <Text
                className="font-spice-regular text-black max-w-[130px] text-xs"
                numberOfLines={1}
            >
                {authors}
            </Text>
            {currentPage > 0 && (
                <ProgressBar
                    progressPercentage={progressPercentage}
                    progressColor={'text-purple-500'}
                />
            )}
        </View>
    );
};

export default BookCoverCard;
