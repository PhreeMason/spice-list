import { View } from 'react-native';
import CustomButton from './Button';
import { useAddToExclusiveShelf, useAddToBookShelf } from '@/api/bookshelves';
import { router } from 'expo-router';

const BookPageButtons = ({ bookId }: { bookId: number }) => {
    const { mutate: addToExclusiveShelf } = useAddToExclusiveShelf();

    return (
        <View className="flex-row">
            <CustomButton
                containerStyles="bg-[#0065ff] grow rounded-r-none"
                title="Want to read"
                textStyles="text-white"
                handlePress={() =>
                    addToExclusiveShelf({
                        book_id: bookId,
                        exclusive_shelf: 'to-read',
                    })
                }
            />
            <CustomButton
                containerStyles="bg-[#0065ff] rounded-l-none rounded-r-lg border-l-2 border-white"
                title="v"
                textStyles="text-white px-6"
                handlePress={() => router.push(`/shelves/books/${bookId}`)}
            />
        </View>
    );
};

export default BookPageButtons;
