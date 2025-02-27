import React from 'react';
import { Animated, Keyboard, StyleSheet } from 'react-native';
import RootSiblings from 'react-native-root-siblings';

import { TouchableOpacity } from 'components/base';
import Dialog, { DialogProps } from 'components/dialog/Dialog';
import { Colors } from 'themes';
import scales from 'utils/scales';

const elements = [];

export default class DialogUtil {
    public static async showDropdown(dropdownConfig) {
        const { marginLeft, marginTop, children, overlay, overlayColor } = dropdownConfig;
        const animated = new Animated.Value(0);
        await animated.setValue(0);
        await Animated.timing(animated, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start();

        const opacityAnim = animated.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        });

        const sibling = new RootSiblings(
            <TouchableOpacity
                activeOpacity={1}
                style={[
                    styles.dropdownContainer,
                    overlay && { backgroundColor: overlayColor || 'rgba(0, 0, 0, 0.5)' },
                ]}
                onPress={this.dismiss}
            >
                <Animated.View
                    style={[
                        {
                            opacity: opacityAnim,
                            marginLeft,
                            marginTop,
                        },
                        styles.shadow,
                    ]}
                >
                    {children}
                </Animated.View>
            </TouchableOpacity>
        );

        elements.push(sibling);
    }


    public static async showMessageDialog(dialogConfig: DialogProps) {
        const animated = new Animated.Value(0.1);
        await animated.setValue(0.1);
        await Animated.spring(animated, {
            toValue: 1,
            tension: 65,
            friction: 5,
            useNativeDriver: true,
        }).start();

        const sibling = new RootSiblings(
            <TouchableOpacity
                activeOpacity={1}
                style={styles.container}
                onPress={this.dismiss}
            >
                <Animated.View style={{ transform: [{ scale: animated }] }}>
                    <Dialog {...dialogConfig} onClose={this.dismiss} />
                </Animated.View>
            </TouchableOpacity>
        );

        if (!dialogConfig?.withoutHideKB) {
            Keyboard.dismiss();
        }
        elements.push(sibling);
    }

    public static dismiss() {
        const lastSibling = elements.pop();
        if (lastSibling) {
            lastSibling.destroy();
        }
    }
}

const styles = StyleSheet.create({
    dropdownContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, .6)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
    },
    shadow: {
        elevation: 1,
        shadowColor: Colors.color_5E626F,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    separator: {
        backgroundColor: Colors.color_FFFFFF,
        alignSelf: 'center',
        height: scales(0.5),
    },
});
