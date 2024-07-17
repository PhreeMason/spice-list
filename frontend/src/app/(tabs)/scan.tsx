import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';

import BookScanPreview from '@/components/BookScanPreview';
import { useUploadBookAndGenres } from '@//api/books';
import { useInsertScanItems } from '@//api/book-scans';
import { StatusBar } from 'expo-status-bar';

export default function ScanScreen() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();

    const [isbn, setIsbn] = useState<string>('');
    const { mutate: upsertBook } = useUploadBookAndGenres();
    const { mutate: insertScan } = useInsertScanItems();

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View className="flex-1 justify-center">
                <Text className="text-center">
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing((current) => (current === 'back' ? 'front' : 'back'));
    }

    const onBarcodeScanned = async ({ data }: { data: string }) => {
        if (!data || data === isbn) return;
        console.log('isbn', data);
        upsertBook(data, {
            onSuccess: (data) => {
                insertScan(data.id);
                console.log('success', JSON.stringify(data, null, 2));
            },
            onError: (error) => {
                console.log('error', error);
            }
        });
        setIsbn(data);
    };

    return (
        <View className="flex-1">
            <CameraView
                barcodeScannerSettings={{
                    barcodeTypes: ['ean13']
                }}
                onBarcodeScanned={onBarcodeScanned}
                className="flex-1"
                facing={facing}
            >
                <View className="flex-1 items-center justify-center">
                    {/* Transparent box with white border */}
                    <View className="w-96 h-64 border-2 border-white bg-opacity-10 rounded-3xl" />
                </View>

                {/* Container for BookScanPreview at the bottom */}
                <View className="absolute bottom-0 left-0 right-0">
                    {isbn && <BookScanPreview isbn={isbn} />}
                </View>
            </CameraView>
            <StatusBar style="light" />
        </View>
    );
}
