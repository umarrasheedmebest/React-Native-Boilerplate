import React, { useContext } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import SimpleText from '@components/SimpleText';
import { AuthContext } from '@contexts/authContext';
import { colors } from '@styles/globalStyles';

/** custom drawer content */
const DrawerContent = ({ navigation }) => {
    const { logout, userEmail } = useContext(AuthContext);
    return (
        <DrawerContentScrollView style={{ paddingVertical: 20, backgroundColor: colors.green }}>
            <View>
                <Image source={require('../assets/images/profile.png')} style={styles.profileImg} />
                <SimpleText
                    title={userEmail}
                    style={styles.menuTitle}
                />
            </View>
            <SimpleText
                title={"Transactions"}
                style={styles.menuTitle}
                onPress={() => navigation.navigate('Transactions')}
            />
            <SimpleText
                title={"Add Transaction"}
                style={styles.menuTitle}
                onPress={() => navigation.navigate('AddTransaction')}
            />
            <SimpleText
                title={"Logout"}
                style={styles.menuTitle}
                onPress={() => {
                    logout()
                }}
            />
        </DrawerContentScrollView>
    );
};
const styles = StyleSheet.create({
    profileImg: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center'
    },
    menuTitle: {
        color: colors.white,
        marginLeft: 20,
        marginBottom: 20,
    }
})

export default DrawerContent;
