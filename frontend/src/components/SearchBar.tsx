import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
    placeholder: string;
    onChangeText: (text: string) => void;
    value: string;
    autoFocus?: boolean;
    showBarcodeScanner?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
    placeholder,
    onChangeText,
    value,
    autoFocus,
    showBarcodeScanner = true,
}) => {
    return (
        <View style={styles.container}>
            <Feather name="search" size={20} color="gray" />
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
                autoFocus={!!autoFocus}
            />
            {showBarcodeScanner ? (
                <Link href={'/search/barcode-scan'}>
                    <Ionicons name="barcode-sharp" size={24} color="black" />
                </Link>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 50,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        margin: 10,
        width: '99%',
    },
    input: {
        marginLeft: 5,
        fontSize: 16,
        flex: 1,
        padding: 10,
    },
});

export default SearchBar;
