import { View, Text } from 'react-native';
import React from 'react';
import {useGetBooksOfShelf} from '@/api/bookshelves';
import { useLocalSearchParams } from 'expo-router';

const Shelf = () => {
    const { shelfId } = useLocalSearchParams();
    const shelfID = Number(shelfId);
    const { data, isLoading, error } = useGetBooksOfShelf(shelfID);
    
    console.log(
        JSON.stringify(
            {shelfID, shelfId, data, isLoading, error}, 
            null, 
            2)
    );
    return (
        <View>
            <Text>Shelf</Text>
        </View>
    );
};

export default Shelf;
