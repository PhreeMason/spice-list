import { ExclusiveSelfNameMap } from '@/constants';
import { ExclusiveSelf } from '@/types';

export const createExclusiveShelfName = (
    exclusiveShelf: ExclusiveSelf | undefined,
): string => {
    if (!exclusiveShelf) return '';
    return ExclusiveSelfNameMap[exclusiveShelf];
};
