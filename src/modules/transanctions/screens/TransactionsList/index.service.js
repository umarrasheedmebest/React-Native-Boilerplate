import { AuthContext } from '@contexts/authContext';
import { useGetTransactions } from '@queries/queries';
import { useIsFocused } from '@react-navigation/native';
import { useContext, useEffect } from 'react';
import { RETURN_VALUE_LIST } from 'react-native-dotenv';
import moment from 'moment';
import { setupInterceptor } from '@services/apiClient';

/**  business logic for TransactionList screen */
const TransactionListServiceComponent = ({
    children,
    navigation
}) => {
    const { userAuthToken, logout } = useContext(AuthContext);
    const { data, isLoading, error, refetch: getTransactionsListRequest } = useGetTransactions({ authToken: userAuthToken, returnValueList: RETURN_VALUE_LIST }); // Use the get transaction hook
    const isFocused = useIsFocused();

    useEffect(() => {
        // Set up interceptor with the logout function
        setupInterceptor(logout);
    }, [logout]);

    useEffect(() => {
        if (isFocused) {
            getTransactionsListRequest();
        }
    }, [isFocused]);

    const navigateToAddTransactionScreen = () => navigation.navigate('AddTransaction')

    return children({
        data,
        isLoading,
        error,
        navigateToAddTransactionScreen
    });
}

export default TransactionListServiceComponent;
