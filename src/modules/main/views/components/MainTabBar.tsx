import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { lowerFirst } from 'lodash';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

import Images from 'assets/images';
import Svgs from 'assets/svgs';
import { TouchableOpacity } from 'components/base';
import DialogUtil from 'components/dialog';
import { DialogType } from 'constants/constants';
import { useSetting } from 'contexts/SettingProvider';
import { navigate, SCREENS_NEED_LOGIN } from 'modules/navigation/src/utils';
import { RootNavigatorParamList } from 'modules/navigation/typings';
import { isLoginSelector } from 'modules/user/src/selectors';
import { Colors, Fonts, Sizes } from 'themes';
import { isIphoneX } from 'utils/dimensions';
import scales from 'utils/scales';

const BOTTOM_SPACE = isIphoneX() ? scales(10) : 0;

const MainTabBar = (props: BottomTabBarProps) => {
    const { state } = props;
    const { t } = useSetting();
    const isLogin: boolean = useSelector(isLoginSelector);

    const onPressTab = (isFocused: boolean, route) => {
        if (!isFocused) {
            if (SCREENS_NEED_LOGIN.includes(route.name) && !isLogin) {
                DialogUtil.showMessageDialog({
                    type: DialogType.TWO,
                    icon: Images.WARNING,
                    title: t('need_login'),
                    onConfirm: () => goToLogin(route.name),
                }).catch();
            } else {
                navigate(route.name as keyof RootNavigatorParamList);
            }
        }
    };

    const goToLogin = (routeName: keyof RootNavigatorParamList) => {
        DialogUtil.dismiss()
        navigate('Login', { onLoginSuccess: () => navigate(routeName) });
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[Colors.transparent, Colors.color_FFC900_90]}
                style={styles.linearGradient}
            />

            {state?.routes?.map((route, index) => {
                const isFocused = state.index === index;
                const IconTab = Svgs[`Ic${route.name}`];

                return (
                    <TouchableOpacity
                        key={index.toString()}
                        style={styles.btnTab}
                        onPress={() => onPressTab(isFocused, route)}
                    >
                        {isFocused ? (
                            <View style={styles.linearGradient}>
                                <Image source={Images.TAB_SELECTED} style={styles.tabSelected} />
                            </View>
                        ) : null}
                        <IconTab
                            width={scales(24)}
                            height={scales(24)}
                            color={isFocused ? Colors.color_FFFFFF : Colors.color_DCDBDB}
                        />
                        <Text
                            style={[
                                styles.title,
                                isFocused ? { ...Fonts.w700 } : {},
                                { color: isFocused ? Colors.color_FFFFFF : Colors.color_DCDBDB },
                            ]}
                        >
                            {t(`tabBar.${lowerFirst(route.name)}`)}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default MainTabBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: BOTTOM_SPACE + scales(80),
        paddingBottom: BOTTOM_SPACE,
        backgroundColor: Colors.color_199744,
        paddingHorizontal: scales(20),
    },
    linearGradient: {
        ...StyleSheet.absoluteFillObject,
    },
    btnTab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: scales(5),
    },
    tabSelected: {
        width: (Sizes.screenWidth - scales(40)) / 5,
        height: BOTTOM_SPACE + scales(80),
        resizeMode: 'stretch',
    },
    title: {
        ...Fonts.w400,
        paddingTop: scales(2),
        fontSize: scales(10),

    },
});
