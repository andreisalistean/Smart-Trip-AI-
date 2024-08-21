import React, { Dispatch, SetStateAction, useState } from 'react';
import { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from 'context/ThemeContext';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import useTranslate from 'translations/useTranslate';

import createStyles from './style';

type CustomDatePickerProps = {
    date: string;
    minimumDate?: Date;
    maximumDate?: Date;
    onSubmit: Dispatch<SetStateAction<string>>;
};

const DatePicker = ({
    date,
    minimumDate,
    maximumDate,
    onSubmit,
}: CustomDatePickerProps) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const t = useTranslate();
    const { theme } = useTheme();
    const styles = createStyles(theme);

    const showDatePicker = useCallback(() => {
        setDatePickerVisibility(true);
    }, []);

    const hideDatePicker = useCallback(() => {
        setDatePickerVisibility(false);
    }, []);

    const handleConfirm = useCallback(
        (date: Date) => {
            const stringDate = date.toDateString();
            onSubmit(stringDate);
            hideDatePicker();
        },
        [hideDatePicker, onSubmit],
    );

    return (
        <View>
            <TouchableOpacity onPress={showDatePicker}>
                <Text
                    style={
                        date === t('datePicker.placeholders.startDate') ||
                        date === t('datePicker.placeholders.endDate')
                            ? styles.textWhiteOpacity
                            : styles.text
                    }
                >
                    {date || t('datePicker.placeholders.startDate')}
                </Text>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    isDarkModeEnabled
                    minimumDate={minimumDate ? minimumDate : new Date()}
                    maximumDate={maximumDate ? maximumDate : undefined}
                />
            </TouchableOpacity>
        </View>
    );
};

export default DatePicker;
