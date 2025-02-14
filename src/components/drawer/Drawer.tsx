import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { TouchableOpacity } from 'components/base';
import DrawerContent from 'components/drawer/DrawerContent';
import { Colors, Sizes } from 'themes';
import scales from 'utils/scales';

const Drawer = () => {
    const [visible, setVisible] = useState<boolean>(false);

    const anim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        global.showDrawer = show;
        global.hideDrawer = hide;
    }, []);

    const show = () => {
        setVisible(true)
        Animated.timing(anim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }

    const hide = () => {
        Animated.timing(anim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
        setTimeout(() => {
            setVisible(false);
        }, 350);
    };

    const opacity = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    const translateX = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [-500, 0],
    });

    return visible ? (
        <View style={styles.container}>
            <Animated.View style={[styles.overlay, { opacity }]}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.buttonOverlay}
                    onPress={hide}
                />
            </Animated.View>
            <Animated.View style={[styles.content, { transform: [{ translateX }] }]}>
                <DrawerContent />
            </Animated.View>
        </View>
    ) : <View />;
};

export default Drawer;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#00000040',
    },
    buttonOverlay: {
        flex: 1,
    },
    content: {
        flex: 1,
        marginRight: scales(85),
        paddingTop: Sizes.statusBarHeight,
        backgroundColor: Colors.color_FFFFFF,
    },
});
