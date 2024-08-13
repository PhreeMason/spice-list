import { View } from 'react-native';
import CustomButton from './Button';
import { useAddToExclusiveShelf, useGetUserBooks } from '@/api/bookshelves';
import { router } from 'expo-router';
import { ExclusiveSelf } from '@/types/index';
import { Feather } from '@expo/vector-icons';
import { createExclusiveShelfName } from '@/utils/helpers';

const BookPageButtons = ({ bookId }: { bookId: number }) => {
    const { mutate: addToExclusiveShelf } = useAddToExclusiveShelf();
    const { data: userBooks } = useGetUserBooks();
    const userBook = userBooks?.find((item: any) => item.book_id === bookId);
    const exclusiveShelf = createExclusiveShelfName(
        userBook?.exclusive_shelf as ExclusiveSelf,
    );

    const handlePress = () => {
        if (exclusiveShelf) {
            router.push(`/shelves/books/${bookId}`);
        } else {
            addToExclusiveShelf({
                book_id: bookId,
                exclusive_shelf: 'to-read',
            });
        }
    };
    return (
        <View className="flex-row">
            <CustomButton
                containerStyles={`
                    bg-[#0065ff] grow 
                    ${exclusiveShelf && 'bg-white border border-[#0065ff]'}`}
                leftIcon={
                    exclusiveShelf ? (
                        <Feather
                            style={{ marginRight: 2 }}
                            name="check"
                            size={24}
                            color="green"
                        />
                    ) : null
                }
                title={exclusiveShelf ? exclusiveShelf : 'Want to read'}
                textStyles={`text-white  ${exclusiveShelf && 'text-black'}`}
                handlePress={handlePress}
            />
        </View>
    );
};

export default BookPageButtons;
