import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '@modules/auth/screens/Login/LoginContainer';

/** auth flow navigator */
const AuthStack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <AuthStack.Navigator
            screenOptions={{
                header: () => null,
            }}
        >
            <AuthStack.Screen name="Login" component={LoginScreen} />
            {/* Add other screens for signup or forgot password */}
        </AuthStack.Navigator>
    );
};

export default AuthNavigator;
