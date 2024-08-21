import React from 'react';
import { View, StyleSheet } from 'react-native';
import { getFormatedDateForTransactions } from '@utils/dateTime';
import { getAmountInDollarFormat } from '@utils/common';
import SimpleText from '@components/SimpleText';

/** component for showing transaction single row */
const TransactionItem = ({ item }) => {
    return (
        <View style={styles.itemContainer}>
            <SimpleText
                title={item.merchant}
                variant='subtitle'
                numberOfLines={1}
            />
            <SimpleText
                title={getAmountInDollarFormat(item.amount)}
                style={styles.dateAmount}
            />
            <SimpleText
                title={getFormatedDateForTransactions(item.created)}
                style={styles.dateAmount}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        alignItems: 'flex-start',
        padding: 15,
        margin: 10,
        borderWidth: 1.7,
        borderRadius: 10,
        borderColor: '#bfb999',
        borderTopWidth: 0.5,
        flexWrap: 'wrap',
    },
    dateAmount: {
        marginTop: 0,
        marginLeft: 0,
    }
});

export default TransactionItem;
