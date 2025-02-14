import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItem, RefreshControl, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import EmptyView from 'components/skeleton/EmptyView';
import { ITEM_LOAD, START_PAGE } from 'constants/constants';
import { useSetting } from 'contexts/SettingProvider';
import NewsSkeleton from 'modules/news/views/components/NewsSkeleton';
import { tokenDetailActionCreators } from 'modules/tokenDetail/src/actions';
import { INIT_RESPONSE_NEWS } from 'modules/tokenDetail/src/constants';
import { isTokenKey } from 'modules/tokenDetail/src/utils';
import NewItem from 'modules/tokenDetail/views/components/NewItem';
import { AppDispatch } from 'redux/store';
import { Colors, Sizes } from 'themes';
import scales from 'utils/scales';

interface NewsScreenProps {
    token: tokenDetail.RouteParams;
}

const NewsScene = (props: NewsScreenProps) => {
    const { t } = useSetting();
    const dispatch = useDispatch<AppDispatch>();

    const [loading, setLoading] = useState<boolean>(false);
    const [newsData, setNewsData] = useState<tokenDetail.NewsData>(INIT_RESPONSE_NEWS);

    const tokenKey = props.token.key as markets.TokenKey;
    const nftKey = props.token.key as markets.NftKey;

    useEffect(() => {
        getNews();
    }, []);

    const getNews = (page: number = START_PAGE, currentData: tokenDetail.NewsItem[] = []) => {
        setLoading(true);
        const payload: tokenDetail.GetNewsActionPayload = {
            page,
            per_page: ITEM_LOAD,
            currentData,
            key: isTokenKey(props.token.key) ? tokenKey.unit : nftKey.policy,
            onSuccess,
            onFailure,
        }
        dispatch(tokenDetailActionCreators.getNews(payload))
    }

    const onSuccess = (res: tokenDetail.NewsData) => {
        setNewsData({ ...res });
        setLoading(false);
    }

    const onFailure = () => {
        setNewsData(INIT_RESPONSE_NEWS);
        setLoading(false);
    }

    const renderItem: ListRenderItem<tokenDetail.NewsItem> = ({ item }) => <NewItem item={item} />;

    const onRefresh = () => getNews();

    const refreshControl = () => (
        <RefreshControl
            refreshing={false}
            onRefresh={onRefresh}
            tintColor={Colors.color_199744}
            colors={[Colors.color_199744]}
        />
    );

    const keyExtractor = (item: tokenDetail.NewsItem, index: number) => `${item.id}${index}`;

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

export default NewsScene;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: scales(16),
        paddingBottom: Sizes.bottomSpace + scales(16),
    },
    skeletonItemContainer: {
        marginBottom: scales(16),
    },
    footerLoading: {
        marginVertical: scales(8),
    },

})
