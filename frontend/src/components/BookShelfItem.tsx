import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Checkbox } from 'react-native-paper';
import type { ShelfListItem } from '@/types/index';

const BookShelfItem = ({
    shelf,
    handleShelfToggle,
}: {
    shelf: ShelfListItem;
    handleShelfToggle: Function;
}) => {
    return (
        <TouchableOpacity
            onPress={() => handleShelfToggle(shelf)}
            className="flex-row w-full items-center justify-between p-4 border-b border-gray-200"
        >
            <Text className="text-lg">{shelf.name}</Text>
            <Checkbox
                status={shelf.isSelected ? 'checked' : 'unchecked'}
                onPress={() => handleShelfToggle(shelf)}
            />
        </TouchableOpacity>
    );
};

export default BookShelfItem;
