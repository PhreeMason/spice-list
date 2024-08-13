import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Checkbox } from 'react-native-paper';
import type { ShelfListItem } from '@/types/index';
import { ActivityIndicator } from 'react-native';

const BookShelfItem = ({
    shelf,
    handleShelfToggle,
    isLoading = false,
}: {
    shelf: ShelfListItem;
    handleShelfToggle: Function;
    isLoading?: boolean;
}) => {
    return (
        <TouchableOpacity
            onPress={() => handleShelfToggle(shelf)}
            className="flex-row w-full items-center justify-between p-4 border-b border-gray-200"
        >
            <Text className="text-lg">{shelf.name}</Text>
            {isLoading ?
                <ActivityIndicator size="small" color="#0000ff" /> :
                <Checkbox
                    status={shelf.isSelected ? 'checked' : 'unchecked'}
                    onPress={() => handleShelfToggle(shelf)}
                />}
        </TouchableOpacity>
    );
};

export default BookShelfItem;
