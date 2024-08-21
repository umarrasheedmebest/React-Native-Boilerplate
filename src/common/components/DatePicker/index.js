import { colors } from '@styles/globalStyles';
import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '@components/Button';

/** Datepicker component */
const DatePicker = ({ onDateChange, iOSDateDone, date }) => {
    const isPlatformiOS = Platform.OS == "ios" ?? false;
    const displayType = isPlatformiOS ? "spinner" : "default";

    return (
        <View style={styles.dateContainer}>
            <DateTimePicker
                value={date}
                mode="date"
                display={displayType}
                onChange={onDateChange}
            />
            {isPlatformiOS && (
                <Button
                    title={'Done'}
                    fontSize={20}
                    fontWeight={'bold'}
                    width={0.20}
                    isDynamic={true}
                    height={50}
                    borderRadius={50}
                    backgroundColor={colors.lightGrey}
                    color={colors.blue}
                    borderColor={colors.lightGrey}
                    borderWidth={2}
                    alignSelf={'center'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    onPress={iOSDateDone}
                />)}
        </View>
    );
};

const styles = StyleSheet.create({
    dateContainer: {
        position: 'absolute',
        bottom: 20,
        left: 30,
    }
});

export default DatePicker;
