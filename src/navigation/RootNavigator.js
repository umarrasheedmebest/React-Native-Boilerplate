import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './DrawerNavigation';
import { useContext } from 'react';
import AuthNavigator from './AuthNavigator';
import { AuthContext } from '@contexts/authContext';
import Loading from '@components/Loading';

/** apps root navigator */
const RootNavigator = () => {
    const { isLoggedIn, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <Loading />
    }

    return (
        <NavigationContainer>
            {isLoggedIn ? <DrawerNavigation /> : <AuthNavigator />}
        </NavigationContainer>
    )

};

export default RootNavigator;
