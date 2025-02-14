import { indexOf } from 'lodash';
import React, { useMemo, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { TabView } from 'react-native-tab-view';

import HeaderMain from 'components/header/HeaderMain';
import { getMarketRoutes } from 'modules/markets/src/utils';
import MarketTabBar from 'modules/markets/views/components/MarketTabBar';
import RightHeaderMarket from 'modules/markets/views/components/RightHeaderMarket';
import MarketListScene from 'modules/markets/views/MarketListScene';
import { Colors } from 'themes';

const MarketsScreen = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = useState<number>(0);

    const routes = useMemo(() => getMarketRoutes(), []);

    const renderHeader = () => <HeaderMain right={renderHeaderRight()} />;

    const renderHeaderRight = () => <RightHeaderMarket currentIndex={index} />;

    const renderScene = ({ route }: { route: markets.Route }) => (
        <MarketListScene
            currentIndex={index}
            index={indexOf(routes, routes.find(_route => _route.key === route.key))}
            ranking={route.ranking}
        />
    );

    const renderTabs = (propsTab) => (
        <MarketTabBar
            index={index}
            setIndex={setIndex}
            {...propsTab}
        />
    );

    const renderContent = () => (
        <TabView
            lazy
            swipeEnabled={false}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabs}
        />
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderContent()}
        </View>
    );
}

export default MarketsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.color_FFFFFF,
    },
});
