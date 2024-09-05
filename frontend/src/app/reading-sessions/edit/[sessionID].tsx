import React, { useState, useEffect } from 'react';
import { useUpsertReadingSession, useGetReadingSession } from '@/api/reading-log';
import { useLocalSearchParams, router } from 'expo-router';
import ReadingSessionForm from '@/components/ReadingSessionForm';
import { DateData } from 'react-native-calendars';
import { Pressable, Text } from 'react-native';

const EditReadingSessionScreen = () => {
    const { sessionId } = useLocalSearchParams();
    const sessionIdNumber = Number(sessionId);
    const [submitting, setSubmitting] = useState(false);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
    const [sessionData, setSessionData] = useState({
        date_time: '',
        start_page: '',
        end_page: '',
        pages_read: '',
        time_spent: '',
        notes: '',
        id: sessionIdNumber,
    });
    const [isEditMode, setIsEditMode] = useState(false);
    console.log('Session ID:', {sessionIdNumber, sessionId});
    const { data: existingSession } = useGetReadingSession(sessionIdNumber);
    useEffect(() => {
        if (existingSession) {
            setSessionData({
                start_page: existingSession.start_page!.toString(),
                end_page: existingSession.end_page!.toString(),
                time_spent: existingSession.time_spent?.toString() || '',
                notes: existingSession.notes || '',
                date_time: existingSession.date_time.split('T')[0],
                pages_read: existingSession.pages_read!.toString(),
                id: sessionIdNumber 
            });
        }
    }, [existingSession]);

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
        console.log('Submitting session data:', sessionData);
        if (!isValidFormSubmitted()) {
            return;
        }
        const convertedSessionData = {
            ...sessionData,
            start_page: Number(sessionData.start_page),
            end_page: Number(sessionData.end_page),
            pages_read: Number(sessionData.pages_read),
            time_spent: Number(sessionData.time_spent),
        };
        setSubmitting(true);
        // @ts-ignore - TS doesn't know that id is a valid field
        upsertReadingSession.mutate(convertedSessionData, {
            onSuccess: () => {
                setSubmitting(false);
                router.replace(`/reading-sessions/view/${sessionId}`);
            },
            onError: (error) => {
                console.error('Error submitting reading session:', error);
                setSubmitting(false);
            },
        });
    };

    const isValidFormSubmitted = () => {
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
        <>
            <Pressable onPress={() => setIsEditMode(!isEditMode)}>
                <Text>{isEditMode ? 'Switch to View Mode' : 'Switch to Edit Mode'}</Text>
            </Pressable>
            <ReadingSessionForm
                sessionData={sessionData}
                validationErrors={validationErrors}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                setShowCalendar={setShowCalendar}
                submitting={submitting}
                showCalendar={showCalendar}
                handleDateSelect={handleDateSelect}
                isEditMode={isEditMode}
            />
        </>
    );
};

export default EditReadingSessionScreen;