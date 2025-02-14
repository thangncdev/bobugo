import React, { useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { TabView } from 'react-native-tab-view';

import { NewsRoutes, NewsType } from 'modules/news/src/constants';
import NewsTabBar from 'modules/news/views/components/NewsTabBar';
import ISPOScene from 'modules/news/views/ISPOScene';
import NewsScene from 'modules/news/views/NewsScene';
import { Colors, Sizes } from 'themes';

const NewsScreen = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = useState<number>(0);

    const renderScene = ({ route }: { route: tokenDetail.Route }) => {
        switch (route.key) {
            case NewsType.NEWS:
                return <NewsScene />;
            case NewsType.ISPO:
                return <ISPOScene />;
            default:
                return null;
        }
    };

    const renderTabs = (propsTab) => <NewsTabBar setIndex={setIndex} {...propsTab} />;

    return (
        <View style={styles.container} >
            <TabView
                navigationState={{ index, routes: NewsRoutes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={renderTabs}
                lazy
            />
        </View>
    )
}

export default NewsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.color_FFFFFF,
        paddingTop: Sizes.statusBarHeight,
    },
})
