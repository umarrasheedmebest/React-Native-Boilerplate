import { colors } from '@styles/globalStyles';
import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import SimpleText from '../SimpleText';
import layout from '@utils/layout';

/** created a reuseable spinner - User can pass required props to make desired text look and feel */
const Loading = ({ message }) => {
    return (
        <View style={styles.container}>
            <View style={styles.messageContainer}>
                <SimpleText
                    title={message}
                    color={colors.blackish}
                    fontSize={20}
                    textAlign={'center'}
                    marginRight={25}
                />
                <ActivityIndicator size="large" color={colors.green} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.8,
        backgroundColor: 'black',
        width: layout.window.width,
        zIndex: 99,
    },
    messageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        height: 100,
        width: layout.window.width * 0.90,
        marginHorizontal: 20,
        borderRadius: 10,
        zIndex: 99,
        backgroundColor: colors.white,
    }
});

export default Loading;
