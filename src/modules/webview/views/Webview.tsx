import { RouteProp } from '@react-navigation/native';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';

import Header from 'components/header/Header';
import { RootNavigatorParamList } from 'modules/navigation/typings';
import { Colors } from 'themes';

interface WebviewProps {
    route: RouteProp<RootNavigatorParamList, 'Webview'>;
}

const WebviewScreen = (props: WebviewProps) => {
    const { title, uri } = props.route.params;

    const [isWebViewLoaded, setIsWebViewLoaded] = useState(false);

    const handleLoadStart = () => setIsWebViewLoaded(false);

    const handleLoadEnd = () => setIsWebViewLoaded(true);

    const renderHeader = () => <Header title={title} />;

    const renderContent = () => (
        <View style={styles.container}>
            {renderWebView()}
            {!isWebViewLoaded && renderLoadingWebviewContent()}
        </View>
    );

    const renderWebView = () => (
        <WebView
            originWhitelist={['*']}
            source={{ uri }}
            onLoadStart={handleLoadStart}
            onLoadEnd={handleLoadEnd}

        />
    );

    const renderLoadingWebviewContent = () => <ActivityIndicator />;

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderContent()}
        </View>
    )
}

export default WebviewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.color_FFFFFF,
    },
});
