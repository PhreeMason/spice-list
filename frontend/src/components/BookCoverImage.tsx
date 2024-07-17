import { useGetGoogleBook } from '@//api/books';
import { Image } from 'react-native';

const placeholderImage = 'http://lgimages.s3.amazonaws.com/gc-md.gif';

const BookCoverImage = ({
    bookId,
    otherStyles
}: {
    bookId: string;
    otherStyles: string;
}) => {
    const { data: book, error } = useGetGoogleBook(bookId);

    if (error) {
        return (
            <Image
                source={{ uri: placeholderImage }}
                resizeMode="contain"
                className={`w-20 h-20 ${otherStyles}`}
            />
        );
    }

    if (!book) {
        return (
            <Image
                source={{ uri: placeholderImage }}
                resizeMode="contain"
                className={`w-20 h-20 ${otherStyles}`}
            />
        );
    }

    const {
        volumeInfo: { imageLinks }
    } = book;

    const { smallThumbnail, thumbnail, small, medium, large, extraLarge } =
        imageLinks || {};

    const imageSource =
        smallThumbnail ||
        thumbnail ||
        small ||
        medium ||
        large ||
        extraLarge ||
        placeholderImage;
    return (
        <Image
            source={{ uri: imageSource }}
            resizeMode="contain"
            className={`w-20 h-20 ${otherStyles}`}
        />
    );
};

export default BookCoverImage;
