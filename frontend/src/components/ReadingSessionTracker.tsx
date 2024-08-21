import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import {
    useUpsertReadingSession,
} from '@/api/reading-log';

type PreviousReadingSession = {
    created_at: string;
    end_page: number | null;
    id: number;
    notes: string | null;
    pages_read: number | null;
    start_page: number | null;
    time_spent: number | null;
    user_book_id: number;
};

const ReadingSessionTracker = ({ userBookId, previousSession }: { userBookId: number, previousSession: PreviousReadingSession | null }) => {
    const [startPage, setStartPage] = useState('');
    const [endPage, setEndPage] = useState('');
    const [timeSpent, setTimeSpent] = useState('');
    const [notes, setNotes] = useState('');

    const upsertReadingSession = useUpsertReadingSession();

    useEffect(() => {
        if (previousSession) {
            setStartPage(previousSession?.end_page?.toString() || '1');
        }
    }, [previousSession]);

    const handleSubmit = () => {
        upsertReadingSession.mutate({
            user_book_id: userBookId,
            start_page: parseInt(startPage),
            end_page: parseInt(endPage),
            time_spent: parseInt(timeSpent),
            notes,
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reading Session Tracker</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Start Page"
                    value={startPage}
                    onChangeText={setStartPage}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="End Page"
                    value={endPage}
                    onChangeText={setEndPage}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Time Spent (minutes)"
                    value={timeSpent}
                    onChangeText={setTimeSpent}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Notes"
                    value={notes}
                    onChangeText={setNotes}
                    multiline
                />
            </View>

            <Button title="Save Session" onPress={handleSubmit} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    previousSession: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
});

export default ReadingSessionTracker;
