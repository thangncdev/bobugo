import { Dimensions, Platform, StatusBar } from 'react-native';

// eslint-disable-next-line complexity
export const isIphoneX = (): boolean => {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTV &&
        (dimen.height === 780 ||
            dimen.width === 780 ||
            dimen.height === 812 ||
            dimen.width === 812 ||
            dimen.height === 844 ||
            dimen.width === 844 ||
            dimen.height === 896 ||
            dimen.width === 896 ||
            dimen.height === 926 ||
            dimen.width === 926 ||
            dimen.height === 932 ||
            dimen.width === 932 ||
            dimen.height === 852 ||
            dimen.width === 852)
    );
};

export const ifIphoneX = (iPhoneXHeight: number, iPhoneNormalHeight: number): number => {
    return isIphoneX() ? iPhoneXHeight : iPhoneNormalHeight;
}

export const isNotchAndroid = Platform.OS === 'android' && StatusBar.currentHeight > 24;
