import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, ListRenderItem, RefreshControl, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import EmptyView from 'components/skeleton/EmptyView';
import { START_PAGE } from 'constants/constants';
import { marketActionCreators } from 'modules/markets/src/actions';
import { CurrencyUnit, MarketsRanking, NFTS_DATA } from 'modules/markets/src/constants';
import { getMarketHeader, isNftsRoute, isTokensRoute } from 'modules/markets/src/utils';
import HeaderMarket from 'modules/markets/views/components/HeaderMarket';
import MarketListItem from 'modules/markets/views/components/MarketListItem';
import MarketListSkeleton from 'modules/markets/views/components/MarketListSkeleton';
import { Colors } from 'themes';
import scales from 'utils/scales';

interface MarketListProps {
    currentIndex: number;
    index: number;
    ranking: MarketsRanking;
}

interface MarketListDispatchProps {
    getTokens: typeof marketActionCreators.getTokens;
    getNfts: typeof marketActionCreators.getNfts;
}

interface MarketListStateProps {
    unitSelected: CurrencyUnit;
}

type MarketListSceneProps = MarketListProps & MarketListDispatchProps & MarketListStateProps;

const MarketListScene = (props: MarketListSceneProps) => {
    const { currentIndex, index, ranking, getTokens, getNfts, unitSelected } = props;
    const [data, setData] = useState<markets.NftsData & FlatListLoadData>(NFTS_DATA);

    const header = useMemo(() => getMarketHeader(index, ranking), [index, ranking]);

    useEffect(() => {
        getMarkets();
    }, []);

    const getMarkets = (page: number = START_PAGE, oldTableData: markets.TableData[] = []) => {
        if (isTokensRoute(index)) {
            _getTokens(page, oldTableData);
        } else if (isNftsRoute(index)) {
            _getNfts(page, oldTableData);
        }
    };

    const _getTokens = (page: number = START_PAGE, oldTableData: markets.TableData[] = []) => {
        const payload: markets.GetTokensActionPayload = {
            page,
            type: ranking,
            oldTableData,
            onSuccess,
            onFailure,
        }
        getTokens(payload);
    }

    const _getNfts = (page: number = START_PAGE, oldTableData: markets.TableData[] = []) => {
        const payload: markets.GetNftsActionPayload = {
            page,
            ranking,
            oldTableData,
            onSuccess,
            onFailure,
        }
        getNfts(payload);
    }

    const onSuccess = (_data: markets.NftsData, canLoadMore: boolean) => {
        setData({
            ..._data,
            fetching: false,
            refreshing: false,
            canLoadMore,
        });
    };

    const onFailure = () => {
        setData((prevState) => {
            return {
                ...prevState,
                fetching: false,
                refreshing: false,
            }
        });
    };

    const refreshControl = () => (
        <RefreshControl
            refreshing={data.refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.color_199744}
            colors={[Colors.color_199744]}
        />
    );

    const onRefresh = () => {
        setData((prevState) => {
            return {
                ...prevState,
                refreshing: true,
            }
        });
        getMarkets();
    }

    const onLoadMore = () => {
        if (data.canLoadMore) {
            getMarkets(data.page + 1, data.table_data);
        }
    }

    const renderItem: ListRenderItem<markets.TableData> = ({ item }) => (
        <MarketListItem
            currentIndex={index}
            item={item}
            header={header}
            unitSelected={unitSelected}
        />
    );

    const keyExtractor = (item: markets.TableData, _index: number) => {
        const tokenKey = item?.key as markets.TokenKey;
        const nftKey = item?.key as markets.NftKey;
        return (tokenKey?.unit || nftKey?.policy || '') + _index;
    }

    const renderHeader = () => (
        <HeaderMarket
            currentIndex={currentIndex}
            index={index}
            header={header}
        />
    );

    const renderSeparator = () => <View style={styles.separator} />

    const renderEmpty = () => <EmptyView />;

    const renderFooter = () => data.canLoadMore ? (
        <MarketListSkeleton
            header={header}
            isTokensRoute={isTokensRoute(index)}
            isFooter
        />
    ) : null;

    return data.fetching ? (
        <MarketListSkeleton
            header={header}
            isTokensRoute={isTokensRoute(index)}
        />
    ) : (
        <FlatList
            style={styles.container}
            refreshControl={refreshControl()}
            data={data.table_data}
            stickyHeaderIndices={[0]}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ListEmptyComponent={renderEmpty()}
            ListHeaderComponent={renderHeader()}
            ItemSeparatorComponent={renderSeparator}
            onEndReached={onLoadMore}
            onEndReachedThreshold={0.01}
            ListFooterComponent={renderFooter}
            showsVerticalScrollIndicator={false}
        />
    )
};

const mapStateToProps = (state: GlobalState) => ({
    unitSelected: state.masterdata.unitSelected,
});

const mapDispatchToProps = {
    getTokens: marketActionCreators.getTokens,
    getNfts: marketActionCreators.getNfts,
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(MarketListScene, (prev, next) => {
    const condition = prev.ranking === next.ranking && prev.unitSelected === next.unitSelected;
    const isCurrentRoute = next.currentIndex === next.index;

    return isCurrentRoute ? condition : true;
}));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.color_FFFFFF,
    },
    separator: {
        height: scales(1),
        backgroundColor: Colors.color_5E626F,
        marginHorizontal: scales(16),
    },
});
