import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import {
    useGetPreviousReadingSession,
    useUpsertReadingSession,
} from '@/api/reading-log';

const ReadingSessionTracker = ({ userBookId }: { userBookId: number }) => {
    const [startPage, setStartPage] = useState('');
    const [endPage, setEndPage] = useState('');
    const [timeSpent, setTimeSpent] = useState('');
    const [notes, setNotes] = useState('');

    const {
        data: previousSession,
        isLoading,
        error,
    } = useGetPreviousReadingSession(userBookId);
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

    if (isLoading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reading Session Tracker</Text>

            {previousSession ? (
                <View style={styles.previousSession}>
                    <Text>Previous Session:</Text>
                    <Text>Start Page: {previousSession.start_page}</Text>
                    <Text>End Page: {previousSession.end_page}</Text>

                    {previousSession.end_page && previousSession.start_page ? (
                        <Text>
                            Pages Read:{' '}
                            {previousSession.end_page -
                                previousSession.start_page}
                        </Text>
                    ) : null}
                    <Text>
                        Time Spent: {previousSession.time_spent} minutes
                    </Text>

                    {previousSession.time_spent &&
                    previousSession.start_page &&
                    previousSession.end_page ? (
                        <Text>
                            Pages Per Minute :{' '}
                            {(
                                (previousSession.end_page -
                                    previousSession.start_page) /
                                previousSession.time_spent
                            ).toFixed(2)}
                        </Text>
                    ) : null}
                </View>
            ) : (
                <Text>No previous reading session found. Start a new one!</Text>
            )}

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
