import React, { ReactElement } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';
import Svgs from 'assets/svgs';
import { TouchableOpacity } from 'components/base';
import { useSetting } from 'contexts/SettingProvider';
import { Colors, Fonts, Sizes } from 'themes';
import scales from 'utils/scales';

interface Props {
    right?: ReactElement;
}

const HeaderMain = (props: Props) => {
    const { t } = useSetting();
    const { right } = props;

    const renderLeft = () => (
        <TouchableOpacity onPress={global.showDrawer}>
            <Svgs.IcBar width={scales(24)} height={scales(24)} />
        </TouchableOpacity>
    );

    const renderBanner = () => (
        <View style={styles.banner}>
            <Image source={Images.LOGO_BB_APP} style={styles.logo} />

        </View>
    );

    return (
        <View style={styles.container}>
            {renderLeft()}
            {renderBanner()}
            {right ? right : null}
        </View>
    );
};

export default HeaderMain;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.color_FFFFFF,
        paddingTop: Sizes.statusBarHeight,
        marginBottom: scales(8),
        paddingHorizontal: scales(20),
        alignItems: 'center',
    },
    banner: {
        paddingLeft: scales(12),
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: scales(70),
        height: scales(28),
        resizeMode: 'contain',
    },
    text: {
        ...Fonts.w600,
        fontSize: scales(14),
        paddingLeft: scales(2),
        color: Colors.color_090F24,
    },
});
