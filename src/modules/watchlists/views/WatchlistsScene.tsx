import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, ListRenderItem, RefreshControl, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { Subscription } from 'rxjs';

import EmptyView from 'components/skeleton/EmptyView';
import { START_PAGE } from 'constants/constants';
import { CurrencyUnit, NFTS_DATA } from 'modules/markets/src/constants';
import HeaderMarket from 'modules/markets/views/components/HeaderMarket';
import MarketListSkeleton from 'modules/markets/views/components/MarketListSkeleton';
import { isTokenKey } from 'modules/tokenDetail/src/utils';
import { watchlistActionCreators } from 'modules/watchlists/src/actions';
import { getWatchliststHeader, isWatchlistsNftsRoute, isWatchlistsTokensRoute } from 'modules/watchlists/src/utils';
import WatchListItem from 'modules/watchlists/views/components/WatchListItem';
import EventBus, { EventBusName } from 'services/event-bus';
import { Colors } from 'themes';
import scales from 'utils/scales';

interface WatchlistsProps {
    currentIndex: number;
    index: number;
}

interface WatchlistsDispatchProps {
    getWatchlistsToken: typeof watchlistActionCreators.getWatchlistsToken;
    getWatchlistsNft: typeof watchlistActionCreators.getWatchlistsNft;
}

interface WatchlistsStateProps {
    unitSelected: CurrencyUnit;
}

type WatchListSceneProps = WatchlistsProps & WatchlistsDispatchProps & WatchlistsStateProps;

const WatchlistsScene = (props: WatchListSceneProps) => {
    const { currentIndex, index, getWatchlistsToken, getWatchlistsNft, unitSelected } = props;
    const [data, setData] = useState<markets.NftsData & FlatListLoadData>(NFTS_DATA);

    const header = useMemo(() => {
        return getWatchliststHeader(index)
    }, [index]);

    useEffect(() => {
        onRegisterEventBus();
        return () => {
            subScription?.unsubscribe?.();
        };
    }, []);

    const subScription = new Subscription();

    const onRegisterEventBus = () => {
        subScription.add(
            EventBus.getInstance().events.subscribe((res) => {
                const indexOfEvent = isTokenKey(res.payload) ? 0 : 1;
                if (indexOfEvent === index) {
                    switch (res.type) {
                        case EventBusName.CHANGE_WATCHLISTS:
                            getWatchlists();
                            return;
                        default:
                            return;
                    }
                }
            })
        );
    };


    useEffect(() => {
        getWatchlists();
    }, []);

    const getWatchlists = (page: number = START_PAGE, oldTableData: markets.TableData[] = []) => {
        if (isWatchlistsTokensRoute(index)) {
            _getTokens(page, oldTableData);
        } else if (isWatchlistsNftsRoute(index)) {
            _getNfts(page, oldTableData);
        }
    };

    const _getTokens = (page: number = START_PAGE, oldTableData: markets.TableData[] = []) => {
        const payload: watchlists.GetWatchlistsTokensActionPayload = {
            page,
            oldTableData,
            onSuccess,
            onFailure,
        }
        getWatchlistsToken(payload);
    }

    const _getNfts = (page: number = START_PAGE, oldTableData: markets.TableData[] = []) => {
        const payload: watchlists.GetWatchlistsNftsActionPayload = {
            page,
            oldTableData,
            onSuccess,
            onFailure,
        }
        getWatchlistsNft(payload);
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
        getWatchlists();
    }

    const onLoadMore = () => {
        if (data.canLoadMore) {
            getWatchlists(data.page + 1, data.table_data);
        }
    }

    const renderItem: ListRenderItem<markets.TableData> = ({ item }) => (
        <WatchListItem
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
            isTokensRoute={isWatchlistsTokensRoute(index)}
            isFooter
        />
    ) : null;

    return data.fetching ? (
        <MarketListSkeleton
            header={header}
            isTokensRoute={isWatchlistsTokensRoute(index)}
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
            ListFooterComponent={renderFooter}
            ItemSeparatorComponent={renderSeparator}
            onEndReached={onLoadMore}
            onEndReachedThreshold={0.01}
            showsVerticalScrollIndicator={false}
        />
    )
};

const mapStateToProps = (state: GlobalState) => ({
    unitSelected: state.masterdata.unitSelected,
});

const mapDispatchToProps = {
    getWatchlistsToken: watchlistActionCreators.getWatchlistsToken,
    getWatchlistsNft: watchlistActionCreators.getWatchlistsNft,
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(WatchlistsScene, (prev, next) => {
    const condition = prev.unitSelected === next.unitSelected;
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


