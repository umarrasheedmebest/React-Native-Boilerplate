import { StyleSheet } from 'react-native';

/** global colors and styles */
export const colors = {
    white: '#FFFFFF',
    green: '#009C77',
    blackish: '#272E35',
    blue: '#800080',
    error: '#FF0000',
    lightGrey: '#D3D3D3',
};

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    heading: {
        marginTop: 50,
        marginBottom: 50,
        textAlign: 'center',
    },
    inputTitle: {
        textAlign: 'left',
        marginHorizontal: 20,
    }
});
