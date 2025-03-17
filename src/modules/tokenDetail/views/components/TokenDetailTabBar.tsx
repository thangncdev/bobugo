import { indexOf } from 'lodash';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationState } from 'react-native-tab-view/lib/typescript/src/types';

import { TouchableOpacity } from 'components/base';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Fonts } from 'themes';
import scales from 'utils/scales';

interface Props {
    setIndex: (index: number) => void;
}

type TokenDetailTabBarProps = Props & { navigationState: NavigationState<tokenDetail.Route> };

const TokenDetailTabBar = (props: TokenDetailTabBarProps) => {
    const { setIndex, navigationState } = props;
    const { routes } = navigationState;

    return (
        <>
            <View style={styles.container}>
                {routes.map(route => {
                    const indexRoute = indexOf(routes, routes.find(_route => _route.key === route.key));
                    const isFocus = indexRoute === navigationState.index;

                    return (
                        <TouchableOpacity key={route.key} style={styles.tab} onPress={() => setIndex(indexRoute)}>
                            <Text style={[styles.route, isFocus ? styles.routeSelected : {}]}>{route.title}</Text>
                            {isFocus ? <View style={styles.indicator} /> : null}
                        </TouchableOpacity>
                    )
                })}
            </View>
            <LinearGradient
                colors={[Colors.color_000000_10, Colors.transparent]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{ height: scales(8) }}
            />
        </>
    )
};

export default TokenDetailTabBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingBottom: scales(8),
        paddingHorizontal: scales(65),
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    tab: {
        height: scales(26),
    },
    route: {
        ...Fonts.w500,
        fontSize: scales(14),
        color: Colors.color_A2A4AA,
        lineHeight: scales(24),
    },
    routeSelected: {
        ...Fonts.w700,
        color: Colors.color_199744,
    },
    indicator: {
        height: scales(2),
        width: scales(32),
        alignSelf: 'center',
        borderRadius: scales(4),
        backgroundColor: Colors.color_199744,
    },
})
