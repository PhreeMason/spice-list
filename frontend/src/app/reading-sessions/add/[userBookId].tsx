import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { useUpsertReadingSession, useGetPreviousReadingSession } from '@/api/reading-log';
import { Stack, useLocalSearchParams, router } from 'expo-router';

const AddReadingSessionScreen = () => {
    // TODO: check what im doing with submitted it mig
    const { userBookId } = useLocalSearchParams();
    const userBookIdNumber = Number(userBookId);
    const [submitting, setSubmitting] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [sessionData, setSessionData] = useState({
        date_time: '',
        start_page: '',
        end_page: '',
        pages_read: '',
        time_spent: '',
        notes: '',
        user_book_id: userBookIdNumber,
    });

    const { data: previousSession } = useGetPreviousReadingSession(userBookIdNumber);
    useEffect(() => {
        if (previousSession) {
            setSessionData(prev => ({
                ...prev,
                start_page: previousSession.end_page.toString(),
            }));
        }
    }, [previousSession]);
    const [showCalendar, setShowCalendar] = useState(false);
    const upsertReadingSession = useUpsertReadingSession();

    useEffect(() => {
        if (sessionData.start_page && sessionData.end_page) {
            const pagesRead =
                parseInt(sessionData.end_page) -
                parseInt(sessionData.start_page);
            setSessionData(prev => ({
                ...prev,
                pages_read: pagesRead.toString(),
            }));
        }
    }, [sessionData.start_page, sessionData.end_page]);

    const handleInputChange = (field: string, value: string) => {
        setSessionData({ ...sessionData, [field]: value });
    };

    const handleDateSelect = (date: DateData) => {
        setSessionData({ ...sessionData, date_time: date.dateString });
        setShowCalendar(false);
    };

    const handleSubmit = () => {
        // Here you would typically send the data to your Supabase backend
        console.log('Submitting session data:', sessionData);
        if (!isValidFormSubmitted()) {
            return;
        }
        // Convert string properties to numbers
        const convertedSessionData = {
            ...sessionData,
            start_page: Number(sessionData.start_page),
            end_page: Number(sessionData.end_page),
            pages_read: Number(sessionData.pages_read),
            time_spent: Number(sessionData.time_spent),
        };
        setSubmitting(true);
        upsertReadingSession.mutate(convertedSessionData, {
            onSuccess: () => {
                setSubmitting(false);
                router.replace(`/reading-sessions/view/${userBookId}`);
            },
            onError: (error) => {
                console.error('Error submitting reading session:', error);
                setSubmitting(false);
            },
        });
    };

    const isValidFormSubmitted = () => {
        // validate that start page is less than end page
        // validate that end page is populated
        // validate that date is selected

        const errors: Record<string, string> = {};
        if (!sessionData.date_time) {
            errors.date_time = 'Date is required';
        }
        if (!sessionData.start_page) {
            errors.start_page = 'Start page is required';
        }
        if (!sessionData.end_page) {
            errors.end_page = 'End page is required';
        }
        if (parseInt(sessionData.start_page) >= parseInt(sessionData.end_page)) {
            errors.start_page = 'Start page must be less than end page';
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    }


    return (
        <ScrollView className="flex-1 bg-white p-4">
            <Stack.Screen options={{ title: 'Add Reading Session' }} />
            {/* <Text className="text-2xl font-bold mb-6">Add Reading Session</Text> */}

            <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-1">Date</Text>
                <Text className="text-sm text-red-500">{validationErrors.date_time}</Text>
                <TouchableOpacity
                    onPress={() => setShowCalendar(true)}
                    className="border border-gray-300 rounded-md p-2"
                >
                    <Text>{sessionData.date_time || 'Select Date'}</Text>
                </TouchableOpacity>
            </View>

            {showCalendar && (
                <Calendar
                    onDayPress={handleDateSelect}
                    markedDates={{
                        [sessionData.date_time]: { selected: true, selectedColor: 'blue' },
                    }}
                    maxDate={new Date().toISOString().split('T')[0]} // This line prevents future date selection
                    disableAllTouchEventsForDisabledDays={true}
                />
            )}

            <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-1">Start Page</Text>
                <Text className="text-sm text-red-500">{validationErrors.start_page}</Text>
                <TextInput
                    className="border border-gray-300 rounded-md p-2"
                    value={sessionData.start_page}
                    onChangeText={(text) => handleInputChange('start_page', text)}
                    keyboardType="numeric"
                />
            </View>

            <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-1">End Page</Text>
                <Text className="text-sm text-red-500">{validationErrors.end_page}</Text>
                <TextInput
                    className="border border-gray-300 rounded-md p-2"
                    value={sessionData.end_page}
                    onChangeText={(text) => handleInputChange('end_page', text)}
                    keyboardType="numeric"
                />
            </View>

            <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-1">Pages Read</Text>
                <TextInput
                    className="border border-gray-300 rounded-md p-2 bg-gray-100"
                    value={sessionData.pages_read}
                    editable={false}
                />
            </View>

            <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-1">Time Spent (minutes)</Text>
                <TextInput
                    className="border border-gray-300 rounded-md p-2"
                    value={sessionData.time_spent}
                    onChangeText={(text) => handleInputChange('time_spent', text)}
                    keyboardType="numeric"
                />
            </View>

            <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-1">Notes</Text>
                <TextInput
                    className="border border-gray-300 rounded-md p-2 h-24"
                    value={sessionData.notes}
                    onChangeText={(text) => handleInputChange('notes', text)}
                    multiline
                />
            </View>

            <TouchableOpacity
                onPress={handleSubmit}
                className="bg-blue-500 p-3 rounded-md items-center"
                disabled={submitting}
            >
                <Text className="text-white font-bold">
                    {submitting ? 'Submitting...' : 'Add Session'}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default AddReadingSessionScreen;
