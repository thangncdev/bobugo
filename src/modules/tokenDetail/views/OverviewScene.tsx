import React from 'react';
import { StyleSheet, View } from 'react-native';

import History from 'modules/tokenDetail/views/components/History';
import Overview from 'modules/tokenDetail/views/components/Overview';
import { Colors } from 'themes';

interface OverviewSceneProps {
    token: tokenDetail.RouteParams;
}

const OverviewScene = (props: OverviewSceneProps) => {
    const { token } = props;

    const renderOverview = () => <Overview token={token} />;

    const renderHistory = () => <History token={token} />;

    return (
        <View style={styles.container}>
            {renderOverview()}
            {renderHistory()}
        </View>
    );
};

export default OverviewScene;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.color_FFFFFF,
    },
})
