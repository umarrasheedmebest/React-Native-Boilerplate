
import React, { createContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { AUTH_TOKEN_KEY, USER_EMAIL_KEY } from 'react-native-dotenv';
//created auth context for handling the auth flow
const AuthContext = createContext({
    isLoggedIn: false,
    userAuthToken: '',
    userEmail: '',
    isLoading: true,
    login: (token) => { },
    logout: () => { },
});

const AuthContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userAuthToken, setUserAuthToken] = useState('');
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        setIsLoading(true);
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;
            let email;
            try {
                //using expo secure storage for storing user auth token and also handling second user login persistence
                userToken = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
                setUserAuthToken(userToken);
                email = await SecureStore.getItemAsync(USER_EMAIL_KEY);
                setUserEmail(email);
            } catch (e) {
                console.log('error in context', e)
            };
            setIsLoading(false);

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            if (userToken) {
                login(email, userToken);
            }
        };

        bootstrapAsync();
    }, []);

    const login = async (email, token) => {
        setUserEmail(email);
        setUserAuthToken(token)
        setIsLoggedIn(true);
    };

    const logout = async () => {
        setIsLoggedIn(false);
        // Implement logic for removing token from local storage (if applicable)
        await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
        await SecureStore.deleteItemAsync(USER_EMAIL_KEY);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, isLoading, userAuthToken, userEmail, setUserEmail }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
