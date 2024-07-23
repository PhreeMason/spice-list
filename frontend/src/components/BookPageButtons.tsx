import { View } from 'react-native';
import CustomButton from './Button';
import { useAddToExclusiveShelf, useAddToBookShelf } from '@/api/bookshelves';

const BookPageButtons = ({ bookId }: { bookId: number }) => {
    const { mutate: addToExclusiveShelf } = useAddToExclusiveShelf();
    const { mutate: addToBookShelf } = useAddToBookShelf();

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
                handlePress={() => console.log('+')}
            />
        </View>
    );
};

export default BookPageButtons;
