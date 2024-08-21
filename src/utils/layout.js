import { Dimensions } from 'react-native';

/** handling the apps ui responsivenes using dimensions react native api */
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
    window: {
        width,
        height,
    },
    isSmallDevice: width < 375,
};
