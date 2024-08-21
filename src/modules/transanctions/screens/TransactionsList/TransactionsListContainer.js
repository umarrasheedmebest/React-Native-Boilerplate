import * as React from 'react';
import TransactionListComponents from './index';
import TransactionListServiceComponent from './index.service';

/** container for transaction list screen view/business logic */
function TransactionsListScreen(props) {
    return (
        <TransactionListServiceComponent {...props}>
            {props => (
                <TransactionListComponents
                    {...props}
                />
            )}
        </TransactionListServiceComponent>
    );
}

export default TransactionsListScreen;
