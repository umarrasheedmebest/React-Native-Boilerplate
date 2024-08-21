import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import TransactionListScreen from '@modules/transanctions/screens/TransactionsList/TransactionsListContainer';
import AddTransactionScreen from '@modules/transanctions/screens/AddTransactions/AddTransactionContainer';
import { colors } from '@styles/globalStyles';

/** drawer navigator */
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            drawerStyle={{
                backgroundColor: colors.green,
                width: 250,
            }}
            drawerContent={DrawerContent}
        >
            <Drawer.Screen name="Transactions" component={TransactionListScreen} />
            <Drawer.Screen name="AddTransaction" component={AddTransactionScreen} />
            {/* Add other screens for the drawer */}
        </Drawer.Navigator>
    );
};

export default DrawerNavigation;
