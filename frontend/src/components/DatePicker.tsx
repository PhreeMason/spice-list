import { Calendar, DateData } from 'react-native-calendars';

const DatePicker = ({ showCalendar, sessionData, handleDateSelect, setShowCalendar }: {
    showCalendar: boolean;
    sessionData: any;
    handleDateSelect: (date: DateData) => void;
    setShowCalendar: (show: boolean) => void;
}) => {
    if (!showCalendar) return null;

    return (
        <Calendar
            onDayPress={handleDateSelect}
            markedDates={{
                [sessionData.date_time]: { selected: true, selectedColor: 'blue' },
            }}
            maxDate={new Date().toISOString().split('T')[0]} // This line prevents future date selection
            disableAllTouchEventsForDisabledDays={true}
        />
    );
};

export default DatePicker;