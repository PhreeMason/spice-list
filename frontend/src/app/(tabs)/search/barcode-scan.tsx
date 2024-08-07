import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, Text, View } from 'react-native';

import BookScanPreview from '@/components/BookScanPreview';
import { useSearchBookAndSaveIfFound } from '@/api/books';
import { StatusBar } from 'expo-status-bar';

export default function BarCodeScanner() {
    const [permission, requestPermission] = useCameraPermissions();

    const [isbn, setIsbn] = useState<string>('');
    const [currentBook, setCurrentBook] = useState<any>(null);
    const { mutate: upsertBook } = useSearchBookAndSaveIfFound();

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

    const onBarcodeScanned = async ({ data }: { data: string }) => {
        if (!data || data === isbn) return;
        upsertBook(data, {
            onSuccess: book => {
                setCurrentBook(book);
            },
            onError: error => {
                console.log('onBarcodeScanned : error', error);
            },
        });
        setIsbn(data);
    };

    return (
        <View className="flex-1">
            <CameraView
                barcodeScannerSettings={{
                    barcodeTypes: ['ean13'],
                }}
                onBarcodeScanned={onBarcodeScanned}
                className="flex-1"
                facing="back"
            >
                <View className="flex-1 items-center justify-center">
                    {/* Transparent box with white border */}
                    <View className="w-96 h-64 border-2 border-white bg-opacity-10 rounded-3xl" />
                </View>

                {/* Container for BookScanPreview at the bottom */}
                <View className="absolute bottom-0 left-0 right-0">
                    {currentBook && (
                        <BookScanPreview currentBook={currentBook} />
                    )}
                </View>
            </CameraView>
            <StatusBar style="light" />
        </View>
    );
}
  