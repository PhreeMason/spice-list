import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import DatePicker from '@/components/DatePicker';

const ReadingSessionForm = ({
    sessionData,
    validationErrors,
    handleInputChange,
    handleSubmit,
    setShowCalendar,
    submitting,
    showCalendar,
    handleDateSelect,
    isEditMode = false,
} : {
    sessionData: any;
    validationErrors: Record<string, string>;
    handleInputChange: (field: string, value: string) => void;
    handleSubmit: () => void;
    setShowCalendar: (show: boolean) => void;
    submitting: boolean;
    showCalendar: boolean;
    handleDateSelect: (date: any) => void;
    isEditMode?: boolean;
}) => {
    return (
        <ScrollView className="flex-1 bg-white p-4">
            <Stack.Screen options={{ title: isEditMode ? 'Edit Reading Session' : 'View Reading Session' }} />

            <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-1">Date</Text>
                <Text className="text-sm text-red-500">{validationErrors.date_time}</Text>
                {isEditMode ? (
                    <TouchableOpacity
                        onPress={() => setShowCalendar(true)}
                        className="border border-gray-300 rounded-md p-2"
                    >
                        <Text>{sessionData.date_time || 'Select Date'}</Text>
                    </TouchableOpacity>
                ) : (
                    <Text>{sessionData.date_time}</Text>
                )}
            </View>

            {isEditMode ? (
                <DatePicker
                    showCalendar={showCalendar}
                    sessionData={sessionData}
                    handleDateSelect={handleDateSelect}
                    setShowCalendar={setShowCalendar}
                />
            ): null}

            <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-1">Start Page</Text>
                <Text className="text-sm text-red-500">{validationErrors.start_page}</Text>
                {isEditMode ? (
                    <TextInput
                        className="border border-gray-300 rounded-md p-2"
                        value={sessionData.start_page}
                        onChangeText={(text) => handleInputChange('start_page', text)}
                        keyboardType="numeric"
                    />
                ) : (
                    <Text>{sessionData.start_page}</Text>
                )}
            </View>

            <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-1">End Page</Text>
                <Text className="text-sm text-red-500">{validationErrors.end_page}</Text>
                {isEditMode ? (
                    <TextInput
                        className="border border-gray-300 rounded-md p-2"
                        value={sessionData.end_page}
                        onChangeText={(text) => handleInputChange('end_page', text)}
                        keyboardType="numeric"
                    />
                ) : (
                    <Text>{sessionData.end_page}</Text>
                )}
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
                {isEditMode ? (
                    <TextInput
                        className="border border-gray-300 rounded-md p-2"
                        value={sessionData.time_spent}
                        onChangeText={(text) => handleInputChange('time_spent', text)}
                        keyboardType="numeric"
                    />
                ) : (
                    <Text>{sessionData.time_spent}</Text>
                )}
            </View>

            <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-1">Notes</Text>
                {isEditMode ? (
                    <TextInput
                        className="border border-gray-300 rounded-md p-2 h-24"
                        value={sessionData.notes}
                        onChangeText={(text) => handleInputChange('notes', text)}
                        multiline
                    />
                ) : (
                    <Text>{sessionData.notes}</Text>
                )}
            </View>

            {isEditMode ? (
                <TouchableOpacity
                    onPress={handleSubmit}
                    className="bg-blue-500 p-3 rounded-md items-center"
                    disabled={submitting}
                >
                    <Text className="text-white font-bold">
                        {submitting ? 'Submitting...' : 'Save Session'}
                    </Text>
                </TouchableOpacity>
            ): null}
        </ScrollView>
    );
};

export default ReadingSessionForm;