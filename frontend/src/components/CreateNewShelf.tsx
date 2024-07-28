import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useAddBookToNewShelf } from '@/api/bookshelves';
import Animated from 'react-native-reanimated';

const CreateShelfComponent = ({
    bookId,
    onClose,
}: {
    bookId: number;
    onClose: () => void;
}) => {
    const [shelfName, setShelfName] = useState('');
    const [error, setError] = useState('');
    const { mutate: addBookToNewShelf } = useAddBookToNewShelf();
    const [isCreating, setIsCreating] = useState(false);

    const handleCreate = () => {
        if (shelfName.length < 3) {
            setError('Shelf name must be at least 3 characters long');
            return;
        }
        setIsCreating(true);
        addBookToNewShelf(
            { bookId, shelfName },
            {
                onSuccess: () => {
                    setIsCreating(false);
                    setError('');
                    setShelfName('');
                    onClose();
                },
                onError: error => {
                    console.error('Error adding book to new shelf:', error);
                    setError('Failed to create shelf. Please try again.');
                },
            },
        );
    };

    return (
        <>
            <Animated.Text className="text-xl font-bold mb-4 text-center text-gray-800">
                Give your new shelf a name
            </Animated.Text>
            <TextInput
                className="border border-gray-300 rounded-md p-2 mb-4"
                value={shelfName}
                onChangeText={setShelfName}
                placeholder="Enter shelf name"
                placeholderTextColor="#9CA3AF"
            />
            {error ? (
                <Text className="text-red-500 mb-4 text-center">{error}</Text>
            ) : null}
            <View className="flex-row justify-between gap-6">
                <Text
                    onPress={onClose}
                    className="text-gray-800 font-semibold underline self-center"
                >
                    Cancel
                </Text>

                <TouchableOpacity
                    className={`py-1 px-4 rounded-md ${
                        isCreating ? 'bg-blue-300' : 'bg-blue-500'
                    }`}
                    onPress={handleCreate}
                    disabled={isCreating}
                >
                    <Text className="text-white font-semibold">
                        {isCreating ? 'Creating...' : 'Create'}
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default CreateShelfComponent;
