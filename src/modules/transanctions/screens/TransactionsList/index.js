
import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import globalStyles from '@styles/globalStyles';
import Loading from '@components/Loading';
import SimpleText from '@components/SimpleText';
import TransactionItem from '@modules/transanctions/components/TransactionItem';
import { GETTING_TRANSACTION_MESSAGE, NO_TRANSACTION_FOUND_MESSAGE } from '@constants/messages';
import FloatingButton from '@components/FloatingButton';

/** View logic for TransactionList screen */
const TransactionListComponent = ({
    data,
    isLoading,
    error,
    navigateToAddTransactionScreen
}) => {
    return (
        <SafeAreaView style={globalStyles.container}>
            {isLoading ? (
                <Loading message={GETTING_TRANSACTION_MESSAGE} />
            ) : error ? (
                <SimpleText title={error.message} variant="error" />
            ) : (
                <FlatList
                    data={data?.data?.transactionList || []}
                    renderItem={(data) => <TransactionItem item={data?.item} />}
                    keyExtractor={(item) => item?.transactionID}
                    initialNumToRender={20}
                    ListEmptyComponent={() =>
                        <SimpleText
                            title={NO_TRANSACTION_FOUND_MESSAGE}
                            variant="heading"
                        />}
                />
            )}
            <FloatingButton navigateToAddTransactionScreen={navigateToAddTransactionScreen} />
        </SafeAreaView>
    );
};

export default TransactionListComponent;
