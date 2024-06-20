import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';

import BookScanPreview from '@/components/BookScanPreview';

export default function ScanScreen() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();

    const [scanData, setScanData] = useState<string>('');

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
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
        if (!data || data === scanData) return;
        setScanData(data);
    };

    return (
        <View className="flex-1 justify-center">
            <CameraView
                barcodeScannerSettings={{
                    barcodeTypes: ['ean13']
                }}
                onBarcodeScanned={onBarcodeScanned}
                className="flex-1"
                facing={facing}
            >
                <View className="flex-1 flex-row background-transparent align-center">
                    <TouchableOpacity
                        className="flex-1 self-end align-center"
                        onPress={toggleCameraFacing}
                    >
                        <Text className="font-bold text-white text-xl">
                            Flip Camera
                        </Text>
                    </TouchableOpacity>
                </View>
                {scanData && <BookScanPreview scanData={scanData} />}
            </CameraView>
        </View>
    );
}
