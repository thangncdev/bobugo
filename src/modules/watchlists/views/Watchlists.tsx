import { indexOf } from 'lodash';
import React, { useMemo, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { TabView } from 'react-native-tab-view';

import HeaderMain from 'components/header/HeaderMain';
import RightHeaderMarket from 'modules/markets/views/components/RightHeaderMarket';
import { getWatchlistRoutes } from 'modules/watchlists/src/utils';
import WatchListTabBar from 'modules/watchlists/views/components/WatchListTabBar';
import WatchListScene from 'modules/watchlists/views/WatchlistsScene';
import { Colors } from 'themes';

const WatchlistsScreen = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = useState<number>(0);

    const routes = useMemo(() => getWatchlistRoutes(), []);

    const renderHeader = () => <HeaderMain right={renderHeaderRight()} />;

    const renderHeaderRight = () => <RightHeaderMarket currentIndex={index} />;

    const renderScene = ({ route }: { route: watchlists.Route }) => (
        <WatchListScene
            currentIndex={index}
            index={indexOf(routes, routes.find(_route => _route.key === route.key))}
        />
    );

    const renderTabs = (propsTab) => (
        <WatchListTabBar
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

export default WatchlistsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.color_FFFFFF,
    },
})
