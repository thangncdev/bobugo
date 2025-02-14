import { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { useDispatch } from 'react-redux';

import Images from 'assets/images';
import { launchActionCreators } from 'modules/launch/src/actions';
import { AppDispatch } from 'redux/store';
import { Colors } from 'themes';

const LaunchScreen = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        SplashScreen.hide();
        dispatch(launchActionCreators.initData());
    }, []);

    return (
        <View style={styles.container}>
            <Image
                source={Images.LAUNCH}
                style={styles.image}
            />
        </View>
    );
}

export default LaunchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.color_FFFFFF,
    },
    image: {
        width: '100%',
        height: '100%',
    },
})
