import React from 'react';
import { StyleSheet, Text, TextStyle, View } from 'react-native';

import Svgs from 'assets/svgs';
import { TouchableOpacity } from 'components/base';
import { goBack } from 'modules/navigation/src/utils';
import { Colors, Fonts, Sizes } from 'themes';
import scales from 'utils/scales';

interface HeaderProps {
    title: string;
    styleTitle?: TextStyle;
    showShadowBottom?: boolean;
}

const Header = (props: HeaderProps) => {
    const { title, styleTitle } = props;

    const renderLeft = () => (
        <TouchableOpacity style={styles.left} onPress={goBack}>
            <Svgs.IcArrowLeft width={scales(24)} height={scales(24)} />
        </TouchableOpacity>
    );

    const renderCenter = () => (
        <View style={styles.center}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.title, styleTitle]}>
                {title}
            </Text>
        </View>
    );

    return (
        <View style={[styles.container, props.showShadowBottom ? styles.shadow : {}]}>
            {renderLeft()}
            {renderCenter()}
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: Sizes.statusBarHeight + scales(56),
        paddingTop: Sizes.statusBarHeight,
        paddingHorizontal: scales(32),
        alignItems: 'center',
    },
    shadow: {
        backgroundColor: Colors.color_FFFFFF,
        shadowColor: Colors.color_000000,
        shadowOffset: { width: scales(1), height: scales(1) },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    left: {},
    center: {
        ...StyleSheet.absoluteFillObject,
        top: Sizes.statusBarHeight,
        left: scales(80),
        right: scales(80),
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        ...Fonts.w700,
        fontSize: scales(20),
        color: Colors.color_000000,
    },
});
