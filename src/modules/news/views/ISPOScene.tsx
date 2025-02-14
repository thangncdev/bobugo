import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItem, RefreshControl, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import EmptyView from 'components/skeleton/EmptyView';
import { ITEM_LOAD, START_PAGE } from 'constants/constants';
import { useSetting } from 'contexts/SettingProvider';
import { newsActionCreators } from 'modules/news/src/actions';
import { INIT_RESPONSE_NEWS, NewsType } from 'modules/news/src/constants';
import NewItem from 'modules/news/views/components/NewItem';
import NewsSkeleton from 'modules/news/views/components/NewsSkeleton';
import { AppDispatch } from 'redux/store';
import { Colors } from 'themes';
import scales from 'utils/scales';

const ISPOScene = () => {
    const { t } = useSetting();
    const dispatch = useDispatch<AppDispatch>();

    const [loading, setLoading] = useState<boolean>(false);
    const [newsData, setNewsData] = useState<news.NewsData>(INIT_RESPONSE_NEWS);

    useEffect(() => {
        getNews();
    }, []);

    const getNews = (page: number = START_PAGE, currentData: news.NewsItem[] = []) => {
        setLoading(true);
        const payload: news.GetNewsActionPayload = {
            page,
            per_page: ITEM_LOAD,
            currentData,
            type: NewsType.ISPO,
            onSuccess,
            onFailure,
        }
        dispatch(newsActionCreators.getNews(payload))
    }

    const onSuccess = (res: news.NewsData) => {
        setNewsData({ ...res });
        setLoading(false);
    }

    const onFailure = () => {
        setNewsData(INIT_RESPONSE_NEWS);
        setLoading(false);
    }

    const renderItem: ListRenderItem<news.NewsItem> = ({ item }) => <NewItem item={item} />;

    const onRefresh = () => getNews();

    const refreshControl = () => (
        <RefreshControl
            refreshing={false}
            onRefresh={onRefresh}
            tintColor={Colors.color_199744}
            colors={[Colors.color_199744]}
        />
    );

    const keyExtractor = (item: news.NewsItem, index: number) => `${item.id}${index}`;

    const onLoadMore = () => {
        if (newsData.page * newsData.perPage < newsData.total && !loading) {
            getNews(newsData.page + 1, newsData.table_data);
        }
    }

    const renderFooterLoading = () => loading ? (
        <View style={styles.footerLoading}>
            <NewsSkeleton />
        </View>
    ) : null;

    return (
        <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
            refreshControl={refreshControl()}
            data={newsData.table_data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            onEndReached={onLoadMore}
            onEndReachedThreshold={0.01}
            ListEmptyComponent={!loading && <EmptyView description={t('empty_news')} />}
            ListFooterComponent={renderFooterLoading}
        />
    );
};

export default ISPOScene;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: scales(16),
        paddingBottom: scales(16),
    },
    skeletonItemContainer: {
        marginBottom: scales(16),
    },
    footerLoading: {
        marginVertical: scales(8),
    },
})
