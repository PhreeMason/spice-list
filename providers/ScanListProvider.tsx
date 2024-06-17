import React, {
    PropsWithChildren,
    createContext,
    useContext,
    useState
} from 'react';
import { randomUUID } from 'expo-crypto';
import { BookVolume, ScanItem } from '@/types/index';
import { bookScans } from '@/data/index';

type ScanListContextType = {
    scanList: ScanItem[];
    addScanItem: (book: BookVolume) => void;
    removeScanItem: (id: string) => void;
    clearScanList: () => void;
};

const ScanListContext = createContext<ScanListContextType>({
    scanList: [],
    addScanItem: () => { },
    removeScanItem: () => { },
    clearScanList: () => { }
});

const ScanListProvider = ({ children }: PropsWithChildren) => {
    const [scanList, setScanList] = useState<ScanItem[]>([...bookScans]);

    const addScanItem = (book: BookVolume) => {
        if (scanList.find((item) => item.bookId === book.id)) {
            return;
        }
        setScanList([
            ...scanList,
            {
                id: randomUUID(),
                book,
                date: new Date().getTime().toString(),
                bookId: book.id
            }
        ]);
    };

    const removeScanItem = (id: string) => {
        setScanList(scanList.filter((item) => item.id !== id));
    };

    const clearScanList = () => {
        setScanList([]);
    };

    return (
        <ScanListContext.Provider
            value={{
                scanList,
                addScanItem,
                removeScanItem,
                clearScanList
            }}
        >
            {children}
        </ScanListContext.Provider>
    );
};

export const useScanList = () => useContext(ScanListContext);

export default ScanListProvider;
