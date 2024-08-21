import SimpleText from '@components/SimpleText';
import { colors } from '@styles/globalStyles';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

/** Floating button */
const FloatingButton = ({ navigateToAddTransactionScreen }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={navigateToAddTransactionScreen}>
            <SimpleText
                title={"+"}
                style={styles.icon}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        position: 'absolute',
        bottom: 50,
        right: 20,
        height: 70,
        backgroundColor: '#306065',
        borderRadius: 100,
    },
    icon: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 2,
        color: colors.white,
    }
});

export default FloatingButton;
