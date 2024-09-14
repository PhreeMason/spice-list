// AddReadingSessionScreen.tsx
import React, { useState, useEffect } from 'react';
import {
    useUpsertReadingSession,
    useGetPreviousReadingSession,
} from '@/api/reading-log';
import { useLocalSearchParams, router } from 'expo-router';
import ReadingSessionForm from '@/components/ReadingSessionForm';
import { DateData } from 'react-native-calendars';

const AddReadingSessionScreen = () => {
    const { userBookId } = useLocalSearchParams();
    const userBookIdNumber = Number(userBookId);
    const [submitting, setSubmitting] = useState(false);
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string>
    >({});
    const [sessionData, setSessionData] = useState({
        date_time: '',
        start_page: '',
        end_page: '',
        pages_read: '',
        time_spent: '',
        notes: '',
        user_book_id: userBookIdNumber,
    });

    const { data: previousSession } =
        useGetPreviousReadingSession(userBookIdNumber);
    useEffect(() => {
        if (previousSession) {
            setSessionData(prev => ({
                ...prev,
                start_page: previousSession.end_page?.toString() || '',
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
        upsertReadingSession.mutate(convertedSessionData, {
            onSuccess: () => {
                setSubmitting(false);
                router.replace(`/reading-sessions/view/${userBookId}`);
            },
            onError: error => {
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
        if (
            parseInt(sessionData.start_page) >= parseInt(sessionData.end_page)
        ) {
            errors.start_page = 'Start page must be less than end page';
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (
        <>
            <ReadingSessionForm
                sessionData={sessionData}
                validationErrors={validationErrors}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                setShowCalendar={setShowCalendar}
                submitting={submitting}
                showCalendar={showCalendar}
                handleDateSelect={handleDateSelect}
                isEditMode
            />
        </>
    );
};

export default AddReadingSessionScreen;
