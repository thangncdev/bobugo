import { RouteProp } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';

import Header from 'components/header/Header';
import { useSetting } from 'contexts/SettingProvider';
import { RootNavigatorParamList } from 'modules/navigation/typings';
import { WalletMode, WalletRoutes } from 'modules/walletDetail/src/constants';
import WalletDetailTabBar from 'modules/walletDetail/views/components/WalletDetailTabBar';
import PortfolioModeScene from 'modules/walletDetail/views/PortfolioModeScene';
import RewardsModeScene from 'modules/walletDetail/views/RewardsModeScene';
import { Colors } from 'themes';

interface WalletDetailScreenProps {
    route: RouteProp<RootNavigatorParamList, 'WalletDetail'>;
}

const WalletDetailScreen = (props: WalletDetailScreenProps) => {
    const layout = useWindowDimensions();
    const { t } = useSetting();

    const { params } = props?.route;

    const [index, setIndex] = useState<number>(0);

    const renderHeader = () => <Header title={params?.name || t('ada_wallet')} />;

    const renderContent = () => (
        <TabView
            navigationState={{ index, routes: WalletRoutes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabs}
            lazy
            swipeEnabled={false}
        />
    );

    const renderTabs = (propsTab) => <WalletDetailTabBar setIndex={setIndex} {...propsTab} />;

    const renderScene = SceneMap({
        [WalletMode.PORTFOLIO]: () => <PortfolioModeScene id={params?.id} />,
        [WalletMode.REWARDS]: () => <RewardsModeScene id={params?.id} />,
    });

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderContent()}
        </View>
    )
};

export default WalletDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.color_FFFFFF,
    },
});
