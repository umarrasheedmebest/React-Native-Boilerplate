import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { colors } from '@styles/globalStyles';
import SimpleText from '../SimpleText';
import layout from '@utils/layout';

/** created a reuseable TextInput - User can pass required props to make desired text look and feel */
const TextInputField = React.forwardRef((
    {
        label,
        value,
        onChangeText,
        secureTextEntry = false,
        isDynamic,
        width,
        keyboardType,
        maxLength,
        returnKeyType,
        onSubmitEditing,
        autoFocus,
        inputMode,
        onBlur,
    }, ref) => {
    const dynamicWidth = isDynamic ? layout.window.width * width : width;

    return (
        <View>
            <SimpleText
                title={label}
            />
            <TextInput
                //setting dynamic width with dimensions api use will pass required width upto 1 value 1 means 100% screen width
                ref={ref}
                style={[styles.input, { width: dynamicWidth }]}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                maxLength={maxLength}
                returnKeyType={returnKeyType}
                onSubmitEditing={onSubmitEditing}
                autoFocus={autoFocus}
                inputMode={inputMode}
                onBlur={onBlur}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    label: {
        marginBottom: 5,
    },
    input: {
        padding: 10,
        marginHorizontal: 20,
        marginTop: 5,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: colors.lightGrey,
        height: 50,
        width: 0.9 * layout.window.width,
    },
});

export default TextInputField;
