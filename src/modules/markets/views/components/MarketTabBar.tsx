import { indexOf } from 'lodash';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationState } from 'react-native-tab-view/lib/typescript/src/types';

import Images from 'assets/images';
import { Image } from 'components/base';
import { TokensType } from 'modules/markets/src/constants';
import { getMainAndSubRoutes, isNftsRoute, isTokensRoute } from 'modules/markets/src/utils';
import { Colors, Fonts } from 'themes';
import scales from 'utils/scales';

interface Props {
    index: number;
    setIndex: (index: number) => void;
}

type MarketTabBarProps = Props & { navigationState: NavigationState<markets.Route> };

const MarketTabBar = (props: MarketTabBarProps) => {
    const { index, setIndex, navigationState } = props;
    const { routes } = navigationState;
    const { mainRoutes, tokenOrderRoutes, nftOrderRoutes } = useMemo(() => getMainAndSubRoutes(routes), []);

    const isTokens = useMemo(() => isTokensRoute(index), [index]);
    const isNfts = useMemo(() => isNftsRoute(index), [index]);

    const getIndexOf = (key: string) => indexOf(routes, routes.find(route => route.key === key));

    const renderMainRoutes = () => (
        <View style={styles.mainRoutes}>
            {mainRoutes.map(mainRoute => {
                const key = mainRoute.key as TokensType;
                const indexRoute = getIndexOf(mainRoute.key);
                const isFocus = indexRoute === index || (key === TokensType.TOKEN && isTokens) || (key === TokensType.NFT && isNfts);

                return (
                    <LinearGradient
                        colors={isFocus ? [Colors.color_4FE54D, Colors.color_1CB21A] : [Colors.transparent, Colors.transparent]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        locations={[0.36, 0.96]}
                        style={[styles.mainRoute]}
                    >
                        <TouchableOpacity
                            key={key}
                            onPress={() => setIndex(indexRoute)}
                        >
                            <Text style={styles.route}>{mainRoute.label}</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                )
            })}
        </View>
    );

    const renderSubRoutes = (subRoutes: markets.Route[], visible: 'none' | 'flex') => (
        <View style={[styles.subRoutes, { display: visible }]}>
            {subRoutes.map(subRoute => {
                const key = subRoute.key as string;
                const indexRoute = getIndexOf(subRoute.key);
                const isFocus = indexRoute === index;

                return (
                    <TouchableOpacity
                        key={key}
                        style={[styles.subRoute, { backgroundColor: isFocus ? Colors.color_199744 : Colors.color_A2A4AA }]}
                        onPress={() => setIndex(indexRoute)}
                    >
                        {isFocus && subRoute.color ? (
                            <LinearGradient
                                colors={subRoute.color}
                                style={styles.gradient}
                                start={{ x: 1, y: 0 }}
                                end={{ x: 0, y: 0 }}
                            />
                        ) : null}
                        <Image uri={subRoute.icon} defaultSource={Images.TRENDING} style={styles.imageSubRoute} />
                        <Text style={styles.route}>{subRoute.label}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );

    return (
        <>
            <View style={styles.container}>
                {renderMainRoutes()}
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {renderSubRoutes(tokenOrderRoutes, isTokens ? 'flex' : 'none')}
                    {renderSubRoutes(nftOrderRoutes, isNfts ? 'flex' : 'none')}
                </ScrollView>
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

export default React.memo(MarketTabBar, (prev, next) => {
    return prev.index === next.index;
});

const styles = StyleSheet.create({
    container: {
        marginVertical: scales(8),
        backgroundColor: Colors.color_FFFFFF,
        paddingHorizontal: scales(16),
        flexDirection: 'row',
        alignItems: 'center',
    },
    mainRoutes: {
        flexDirection: 'row',
        marginRight: scales(4),
        backgroundColor: Colors.color_5E626F,
        borderRadius: scales(5),
    },
    mainRoute: {
        height: scales(28),
        width: scales(45),
        borderRadius: scales(5),
        alignItems: 'center',
        justifyContent: 'center',
    },
    subRoutes: {
        flexDirection: 'row',
    },
    subRoute: {
        flexDirection: 'row',
        height: scales(28),
        borderRadius: scales(5),
        alignItems: 'center',
        paddingHorizontal: scales(4),
        marginRight: scales(4),
        overflow: 'hidden',
    },
    imageSubRoute: {
        width: scales(12),
        height: scales(12),
        resizeMode: 'contain',
        marginRight: scales(2),
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    route: {
        ...Fonts.w500,
        color: Colors.color_FFFFFF,
        fontSize: scales(10),
    },
})
