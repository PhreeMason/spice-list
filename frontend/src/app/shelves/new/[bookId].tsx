import { View } from 'react-native';
import React from 'react';
import CreateShelfComponent from '@/components/CreateNewShelf';
import { router, useLocalSearchParams } from 'expo-router';

const NewShelf = () => {
    const { bookId } = useLocalSearchParams();
    const bookIdNumber = Number(bookId);
    return (
        <View className="flex-1 items-center pt-10 mx-4">
            <CreateShelfComponent bookId={bookIdNumber} onClose={router.back} />
        </View>
    );
};

export default NewShelf;
