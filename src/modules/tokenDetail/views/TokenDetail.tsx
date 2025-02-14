import { RouteProp } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Share from 'react-native-share';
import { TabView } from 'react-native-tab-view';
import { captureRef } from 'react-native-view-shot';

import { RootNavigatorParamList } from 'modules/navigation/typings';
import { TokenDetailRoutes, TokenDetailTab } from 'modules/tokenDetail/src/constants';
import HeaderTokenDetail from 'modules/tokenDetail/views/components/HeaderTokenDetail';
import TokenDetailTabBar from 'modules/tokenDetail/views/components/TokenDetailTabBar';
import NewsScene from 'modules/tokenDetail/views/NewsScene';
import OverviewScene from 'modules/tokenDetail/views/OverviewScene';
import PoolInfoScene from 'modules/tokenDetail/views/PoolInfoScene';
import { Colors } from 'themes';

interface TokenDetailRouteProps {
    route: RouteProp<RootNavigatorParamList, 'TokenDetail'>;
}

type TokenDetailScreenProps = TokenDetailRouteProps;

const TokenDetailScreen = (props: TokenDetailScreenProps) => {
    const { params } = props.route;

    const layout = useWindowDimensions();
    const viewRef = useRef();

    const [index, setIndex] = useState<number>(0);

    const renderHeader = () => <HeaderTokenDetail handleCaptureAndShare={handleCaptureAndShare} token={params} />;

    const renderScene = ({ route }: { route: tokenDetail.Route }) => {
        switch (route.key) {
            case TokenDetailTab.OVERVIEW:
                return <OverviewScene token={params} />;
            case TokenDetailTab.POOL_INFO:
                return <PoolInfoScene token={params} />;
            case TokenDetailTab.NEWS:
                return <NewsScene token={params} />;
            default:
                return null;
        }
    };

    const renderTabs = (propsTab) => <TokenDetailTabBar setIndex={setIndex} {...propsTab} />;

    const renderContent = () => (
        <TabView
            navigationState={{ index, routes: TokenDetailRoutes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabs}
            lazy
            swipeEnabled={false}
        />
    );

    const handleCaptureAndShare = async () => {
        try {
            const uri = await captureRef(viewRef, {
                format: 'jpg',
                quality: 1,
            });
            await Share.open({
                url: uri,
                type: 'image/jpeg',
            });
        } catch (err) {
            // TODO:
        }
    };

    return (
        <View ref={viewRef} style={styles.container}>
            {renderHeader()}
            {renderContent()}
        </View>
    )
}

export default TokenDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.color_FFFFFF,
    },
})
