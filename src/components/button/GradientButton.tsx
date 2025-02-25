import React, { ReactElement } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';

import { TouchableOpacity } from 'components/base';
import { Colors, Fonts } from 'themes';
import scales from 'utils/scales';
import LinearGradient from 'react-native-linear-gradient';

interface ButtonProps {
    title: string;
    icon?: ReactElement;
    width?: number;
    height?: number;
    disabled?: boolean;
    customStyles?: StyleProp<ViewStyle>;
    customTextStyles?: StyleProp<TextStyle>;
    onPress?: () => void;
}

const GradientButton = (props: ButtonProps) => {
    const { title, icon, width, height, disabled = false, customStyles, customTextStyles, onPress } = props;

    // const onPress = async () => {
    //     const isConnected = await checkConnected();
    //     if (!isConnected) {
    //         showCustomToast(t('network.error'))
    //     } else {
    //         props.onPress()
    //     }
    // }

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
        >
            <LinearGradient
                colors={[Colors.color_4FE54D, Colors.color_1CB21A]}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                locations={[0.36, 0.96]}
                style={[
                    styles.container,
                    width ? { width } : {},
                    height ? { height } : {},
                    customStyles,
                    disabled ? { backgroundColor: Colors.color_A2A4AA } : {},
                ]}
            >
                {icon ? icon : null}
                <Text style={[styles.title, customTextStyles]}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default GradientButton;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: scales(40),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: scales(5),
        backgroundColor: Colors.color_199744,
    },
    linearGradient: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: scales(5),
    },
    title: {
        ...Fonts.w600,
        color: Colors.color_FFFFFF,
        fontSize: scales(14),
    },
});
