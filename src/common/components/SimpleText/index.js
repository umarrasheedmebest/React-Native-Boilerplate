import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors } from '@styles/globalStyles';

const SimpleText = ({
    title,
    onPress,
    numberOfLines,
    ellipsizeMode,
    variant = 'body',
    style,
}) => {
    return (
        <Text
            onPress={onPress}
            numberOfLines={numberOfLines}
            ellipsizeMode={ellipsizeMode}
            style={[styles[variant], style]}>
            {title}
        </Text>
    );
};

const styles = StyleSheet.create({
    body: {
        color: colors.blackish,
        fontSize: 16,
        lineHeight: 24,
        marginTop: 10,
        marginHorizontal: 20,
    },
    heading: {
        color: colors.green,
        fontSize: 22,
        fontWeight: 'bold',
        lineHeight: 32,
        marginHorizontal: 20,
    },
    subtitle: {
        color: colors.blackish,
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 26,
    },
    error: {
        color: colors.error,
        fontSize: 14,
        marginTop: 10,
        lineHeight: 24,
        textAlign: 'center',
    }
});

export default SimpleText;
