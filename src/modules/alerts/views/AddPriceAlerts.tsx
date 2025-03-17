import { RouteProp } from '@react-navigation/native';
import { t } from 'i18next';
import { indexOf } from 'lodash';
import React, { useMemo, useState } from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';
import { TabView } from 'react-native-tab-view';

import Svgs from 'assets/svgs';
import Header from 'components/header/Header';
import ListSearchScene from 'modules/alerts/views/ListSearchScene';
import { TokensType } from 'modules/markets/src/constants';
import { getMainAndSubRoutes, getMarketRoutes } from 'modules/markets/src/utils';
import { RootNavigatorParamList } from 'modules/navigation/typings';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Fonts } from 'themes';
import scales from 'utils/scales';

interface RouteProps {
    route: RouteProp<RootNavigatorParamList, 'AddPriceAlerts'>;
}

const AddPriceAlertsScreen = (props: RouteProps) => {
    const layout = useWindowDimensions();
    const { params } = props?.route;

    const [index, setIndex] = useState<number>(params.isTokenRoute ? 0 : 1);
    const [searchText, setSearchText] = useState<string>('');

    const routes = useMemo(() => getMarketRoutes(), []);

    const { mainRoutes } = useMemo(() => getMainAndSubRoutes(routes), []);
    const getIndexOf = (key: string) =>
        indexOf(
            routes,
            routes.find((route) => route.key === key)
        );

    const renderScene = ({ route }: { route: markets.Route }) => (
        <ListSearchScene isTokenSearch={route?.key === TokensType.TOKEN} searchText={searchText.trim()} />
    );

    const searchBox = () => (
        <View style={styles.searchBox}>
            <Svgs.IcSearch2 width={scales(16)} height={scales(16)} />
            <TextInput
                value={searchText}
                placeholder={t(index === 0 ? 'search_coins' : 'search_nfts')}
                style={styles.textInput}
                onChangeText={setSearchText}
                placeholderTextColor={Colors.color_090F24}
                maxLength={255}
                autoFocus={true}
            />
        </View>
    );

    const renderMainRoutes = () => (
        <View style={styles.mainRoutes}>
            {mainRoutes.map((mainRoute) => {
                const key = mainRoute.key as TokensType;
                const indexRoute = getIndexOf(mainRoute.key);
                const isFocus = indexRoute === index;
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
                );
            })}
        </View>
    );

    const renderContent = () => (
        <TabView
            lazy
            swipeEnabled={false}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderMainRoutes}
        />
    );

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <Header title={t('add_price_alert')} />
                {searchBox()}
                {renderContent()}
            </KeyboardAvoidingView>
        </View>
    );
};

export default AddPriceAlertsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.color_FFFFFF,
    },
    mainRoutes: {
        flexDirection: 'row',
        backgroundColor: Colors.color_A2A4AA,
        borderRadius: scales(5),
        width: scales(87),
        marginLeft: scales(18),
        marginTop: scales(16),
        marginBottom: scales(8),
    },
    mainRoute: {
        height: scales(28),
        width: scales(45),
        borderRadius: scales(5),
        alignItems: 'center',
        justifyContent: 'center',
    },
    route: {
        ...Fonts.w500,
        color: Colors.color_FFFFFF,
        fontSize: scales(10),
    },
    searchBox: {
        flexDirection: 'row',
        marginHorizontal: scales(16),
        paddingHorizontal: scales(19),
        paddingVertical: scales(8),
        alignItems: 'center',
        height: scales(40),
        borderRadius: scales(39),
        backgroundColor: Colors.color_FFFFFF,
        elevation: 1,
        shadowColor: Colors.color_000000,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    textInput: {
        ...Fonts.w500,
        fontSize: scales(12),
        color: Colors.color_5E626F,
        flex: 1,
        marginLeft: scales(4),
        height: scales(40),
    },
});
