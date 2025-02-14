import { RouteProp } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { useDispatch } from 'react-redux';

import Header from 'components/header/Header';
import { useSetting } from 'contexts/SettingProvider';
import { RootNavigatorParamList } from 'modules/navigation/typings';
import { tokenDetailActionCreators } from 'modules/tokenDetail/src/actions';
import { AppDispatch } from 'redux/store';
import { Colors } from 'themes';

interface NewsDetailProps {
    route: RouteProp<RootNavigatorParamList, 'NewsDetail'>;
}

const NewsDetailScreen = (props: NewsDetailProps) => {
    const { params } = props.route;
    const { t } = useSetting();
    const dispatch = useDispatch<AppDispatch>();

    const [newsDetail, setNewsDetail] = useState<tokenDetail.NewsUriData>();
    const [isWebViewLoaded, setIsWebViewLoaded] = useState(false);

    useEffect(() => {
        getNewsUri(params.newsId);
    }, []);

    const getNewsUri = (newsId: string) => {
        try {
            showLoading();
            const payload: tokenDetail.GetNewsUriActionPayload = {
                newsId,
                onSuccess,
                onFailure,
            }
            dispatch(tokenDetailActionCreators.getNewsUri(payload))
        } catch (error) {
            hideLoading();
        }
    }

    const onSuccess = async (res: tokenDetail.NewsUriData) => {
        hideLoading();
        setNewsDetail(res)
    }

    const onFailure = () => {
        showToastError(t('get_news_uri_fail'));
        hideLoading();
    }

    const handleLoadStart = () => setIsWebViewLoaded(false);

    const handleLoadEnd = () => setIsWebViewLoaded(true);

    const renderHeader = () => <Header title={t('news')} />;

    const renderContent = () => (
        <View style={styles.container}>
            {renderWebView()}
            {!isWebViewLoaded && renderLoadingWebviewContent()}
        </View>
    );

    const renderWebView = () => (
        <WebView
            originWhitelist={['*']}
            source={{ uri: newsDetail.url }}
            onLoadStart={handleLoadStart}
            onLoadEnd={handleLoadEnd}

        />
    );

    const renderLoadingWebviewContent = () => <ActivityIndicator />;

    return (
        <View style={styles.container}>
            {renderHeader()}
            {newsDetail && renderContent()}
        </View>
    )
}

export default NewsDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.color_FFFFFF,
    },
});
