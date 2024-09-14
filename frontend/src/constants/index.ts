import { ExclusiveSelf } from '@/types/index';
import icons from './icons';
import images from './images';

const ExclusiveSelfOptions: ExclusiveSelf[] = [
    'to-read',
    'reading',
    'read',
    'did-not-finish',
];

const badImageUrls = [
    'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1690846794i/157094281.jpg',
];

const ExclusiveSelfNameMap: Record<ExclusiveSelf, string> = {
    reading: 'Currently reading',
    'to-read': 'Want to read',
    read: 'Read',
    'did-not-finish': 'Did not finish',
};

export {
    icons,
    images,
    ExclusiveSelfOptions,
    ExclusiveSelfNameMap,
    badImageUrls,
};
