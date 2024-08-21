import * as React from 'react';
import AddTransactionComponents from './index';
import AddTransactionServiceComponent from './index.service';

/** container for add transaction screen view/business logic */
function AddTransactionScreen(props) {
    return (
        <AddTransactionServiceComponent {...props}>
            {props => (
                <AddTransactionComponents
                    {...props}
                />
            )}
        </AddTransactionServiceComponent>
    );
}

export default AddTransactionScreen;
