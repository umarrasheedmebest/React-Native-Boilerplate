import axios from 'axios';
import { Alert } from 'react-native';
import { API_URL } from 'react-native-dotenv';

/** getting api base url from .env */
const API_BASE = API_URL;

/** created axios client for handling all types of requests POST/PUT/GET/DELETE etc.. 
 we will include interceptor if needed based on requirement */
const client = axios.create({
    baseURL: API_BASE,
    timeout: 61000,
});

/** Function to handle logout - receives logout function as an argument */
const handleLogout = async (logout) => {
    if (logout) {
        try {
            Alert.alert('Session has been expired. Please login again.')
            logout();
        } catch (error) {
            const { status } = error.response || {};

            if (status === 407) {
                logout();
                return Promise.reject(new Error('Session expired'));
            }

            // Handle other status codes or errors here
            console.error('API Error:', error.message);
            return Promise.reject(error);
        }
    }
};

/** Function to add interceptor with injected logout function */
const setupInterceptor = (logout) => {
    client.interceptors.response.use(
        async (response) => {
            if (response?.data?.jsonCode === 407) {
                await handleLogout(logout);
                return; // Optionally, stop further processing
            }
            return response;
        },
        async (error) => {
            const { status } = error.response || {};

            if (status === 407) {
                // Session expired or unauthorized, log out the user
                await handleLogout(logout);
            }

            return Promise.reject(error);
        }
    );
};

/** created a general api request function for hitting api using axios client  this will return 
 return a promise
*/
const makeRequest = async (options) => {
    options.headers = options.headers || {};
    try {
        const response = await client(options);
        return response;
    } catch (error) {
        console.error('Request failed:', error.message);
        return Promise.reject(error.response || error.message);
    }
};

export { client, makeRequest, setupInterceptor };
