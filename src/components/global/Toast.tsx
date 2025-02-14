import { upperFirst } from 'lodash';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import Svgs from 'assets/svgs';
import { Colors, Fonts, Sizes } from 'themes';
import scales from 'utils/scales';

export enum ToastType {
    success = 'success',
    warning = 'warning',
}

const Toast = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [type, setType] = useState<ToastType>(ToastType.success);

    const backgroundColor = type === ToastType.success ? Colors.color_199744 : Colors.color_CC0A00;
    const Icon = Svgs[`Ic${upperFirst(type)}`]

    useEffect(() => {
        global.showToastSuccess = showToastSuccess;
        global.showToastError = showToastError;
    }, []);

    const showToastSuccess = (_message: string) => {
        setMessage(_message);
        setType(ToastType.success);
        show()
    };

    const showToastError = (_message: string) => {
        setMessage(_message);
        setType(ToastType.warning);
        show()
    };

    const show = () => {
        setVisible(true);
        setTimeout(() => {
            hide();
        }, 3000);
    };

    const hide = () => {
        setVisible(false);
    };

    const hideTranslateY = scales(- (Sizes.statusBarHeight + scales(20)));
    const visibleTranslateY = scales(0);
    const translateY = useSharedValue(hideTranslateY);

    useEffect(() => {
        toggleHeight(visible);
    }, [visible]);

    const toggleHeight = (_visible: boolean) => {
        translateY.value = _visible ? visibleTranslateY : hideTranslateY;
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: withSpring(translateY.value) }],
    }));

    return visible ? (
        <View style={styles.modal} pointerEvents={'none'}>
            <Animated.View style={[styles.content, { backgroundColor }, animatedStyle ]}>
                <Icon width={scales(24)} height={scales(24)} />
                <Text style={styles.message} numberOfLines={2}>{upperFirst(message)}</Text>
            </Animated.View>
        </View>
    ) : null;
};

export default Toast;

const styles = StyleSheet.create({
    modal: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        paddingTop: Sizes.statusBarHeight + scales(30),
        backgroundColor: Colors.transparent,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        height: scales(56),
        borderRadius: scales(8),
        paddingHorizontal: scales(16),
        maxWidth: Sizes.screenWidth - scales(60),
    },
    message: {
        flex: 1,
        ...Fonts.w400,
        color: Colors.color_FFFFFF,
        fontSize: scales(12),
        paddingLeft: scales(8),
    },
});

