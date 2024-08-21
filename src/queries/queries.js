import { useQuery, useMutation } from '@tanstack/react-query';
import { makeRequest } from '@services/apiClient';
import { CREATE_TRANSACTION_URL, GET_TRANSACTION_URL, LOGIN_URL } from '@services/apiUrls';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { getFormData } from '@utils/common';
import { AuthContext } from '@contexts/authContext';
import {
    INVALID_EMAIL_OR_PASSWORD_ERROR,
    UNABLE_TO_CREATE_TRANSACTION_ERROR,
    UNABLE_TO_LOGIN_ERROR
} from '@constants/messages';
import { AUTH_TOKEN_KEY, USER_EMAIL_KEY } from 'react-native-dotenv';

/** app api requests - right now I'm using the single file in future based on work will divid this into multiple
files w.r.t modules */
const loginRequest = async ({ partnerName, partnerPassword, partnerUserID, partnerUserSecret }) => {
    const formdata = getFormData({ partnerName, partnerPassword, partnerUserID, partnerUserSecret });
    return await makeRequest({
        url: LOGIN_URL,
        method: 'POST',
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" },
    });
};

/** login mutation */
const useLogin = () => {
    const { login } = useContext(AuthContext);
    const loginMutation = useMutation({
        mutationFn: loginRequest,
        onSuccess: async (data, variables) => {
            const { authToken } = data?.data;
            if (authToken) {
                await SecureStore.setItemAsync(AUTH_TOKEN_KEY, authToken);
                await SecureStore.setItemAsync(USER_EMAIL_KEY, variables?.partnerUserID);
                login(variables?.partnerUserID, authToken);
            } else {
                variables?.setError(INVALID_EMAIL_OR_PASSWORD_ERROR)
            }
        },
        onError: (e, variables) => {
            variables?.setError(UNABLE_TO_LOGIN_ERROR);
        }
    });
    return loginMutation;
};

const getTransactions = async (authToken, returnValueList) => {
    const params = {
        authToken,
        returnValueList,
    }
    return await makeRequest({
        url: GET_TRANSACTION_URL,
        method: 'GET',
        params: params,
        headers: {
            'Content-Type': 'application/json',
        }
    });
};

/** get transacrion query */
const useGetTransactions = ({ authToken, returnValueList, }) => {
    return useQuery({
        queryKey: ['getTransactions'],
        queryFn: () => getTransactions(authToken, returnValueList),
    });
};

const createTransaction = async ({ authToken, created, amount, merchant }) => {
    const formdata = getFormData({ authToken, created, amount, merchant });
    return await makeRequest({
        url: CREATE_TRANSACTION_URL,
        method: 'POST',
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" },
    });
};

/** create transacrion mutation */
const useCreateTransaction = () => {
    const navigation = useNavigation();
    const createTransactionMutation = useMutation({
        mutationFn: createTransaction,
        onSuccess: async (data, variables) => {
            if (data?.data?.jsonCode === 200) {
                navigation.goBack();
                return;
            }
            variables?.setError(data?.data?.message);
        },
        onError: (e, variables) => {
            if (variables?.setError) {
                variables?.setError(UNABLE_TO_CREATE_TRANSACTION_ERROR)
            }
        }
    });
    return createTransactionMutation;
};

export { useLogin, useGetTransactions, useCreateTransaction };
