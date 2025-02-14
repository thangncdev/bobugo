import { indexOf } from 'lodash';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationState } from 'react-native-tab-view/lib/typescript/src/types';

import { TouchableOpacity } from 'components/base';
import { Colors, Fonts } from 'themes';
import scales from 'utils/scales';

interface Props {
    setIndex: (index: number) => void;
}

type TabBarProps = Props & { navigationState: NavigationState<walletDetail.Route> };

const WalletDetailTabBar = (props: TabBarProps) => {
    const { setIndex, navigationState } = props;
    const { routes } = navigationState;

    return (
        <View style={styles.container}>
            {routes.map(route => {
                const indexRoute = indexOf(routes, routes.find(_route => _route.key === route.key));
                const isFocus = indexRoute === navigationState.index;

                return (
                    <TouchableOpacity key={route.key} style={isFocus ? styles.tabSelected : styles.tab} onPress={() => setIndex(indexRoute)}>
                        <Text style={[styles.route, isFocus ? styles.routeSelected : {}]}>{route.title}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
};

export default WalletDetailTabBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: scales(2),
        paddingVertical: scales(8),
        borderBottomColor: Colors.color_A2A4AA,
    },
    tabSelected: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        borderBottomWidth: scales(2),
        borderBottomColor: Colors.color_199744,
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
