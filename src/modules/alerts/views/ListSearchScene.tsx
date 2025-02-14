import { isEmpty } from 'lodash'
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux'

import { Image, TouchableOpacity } from 'components/base'
import { START_PAGE } from 'constants/constants'
import { goToAddNftAlert, goToAddTokenAlert } from 'modules/alerts/src/utils';
import { marketActionCreators } from 'modules/markets/src/actions'
import { MarketsRanking, SEARCH_NFTS_DATA, SEARCH_TOKENS_DATA } from 'modules/markets/src/constants';
import { getMarketHeader } from 'modules/markets/src/utils';
import HeaderView from 'modules/markets/views/components/HeaderView'
import MarketListSkeleton from 'modules/markets/views/components/MarketListSkeleton';
import { Colors, Fonts } from 'themes'
import scales from 'utils/scales'

interface DispatchProps {
    searchTokens: typeof marketActionCreators.searchTokens;
    searchNfts: typeof marketActionCreators.searchNfts;
}

interface ListSearchProps {
    isTokenSearch: boolean;
    searchText: string;
}

export type Timeout = ReturnType<typeof setTimeout>;

const ListSearchScene = (props: ListSearchProps & DispatchProps) => {
    const { searchTokens, searchNfts, isTokenSearch, searchText } = props
    const searchProjectRef = useRef<Timeout>();

    const [dataNfts, setNftsData] = useState<markets.SearchNftsData & FlatListLoadData>(SEARCH_NFTS_DATA);
    const [dataTokens, setTokensData] = useState<markets.SearchTokensData & FlatListLoadData>(SEARCH_TOKENS_DATA);

    useEffect(() => {
          if (searchProjectRef?.current) {
              clearTimeout(searchProjectRef.current);
          }
          searchProjectRef.current = setTimeout(() => {
              if (isEmpty(searchText.trim())) {
                  return;
              }
              if (isTokenSearch) {
                  _searchTokens();
              } else {
                  _searchNfts();
              }
          }, 500);
        return () => clearTimeout(searchProjectRef.current);
    }, [searchText])

    const _searchTokens = (isFetching: boolean = true, page: number = START_PAGE, oldData: markets.SearchTokensItem[] = []) => {
        if (isFetching) {
            setTokensData((prevState) => {
                return {
                    ...prevState,
                    fetching: true,
                }
            });
        }
        const payload: markets.SearchTokensActionPayload = {
            name: searchText,
            page,
            oldData,
            onTokensSuccess,
            onTokensFailure,
        }
        searchTokens(payload);
    }

    const _searchNfts = (isFetching: boolean = true, page: number = START_PAGE, oldData: markets.SearchNftItem[] = []) => {
        if (isFetching) {
            setNftsData((prevState) => {
                return {
                    ...prevState,
                    fetching: true,
                }
            });
        }
        const payload: markets.SearchNftsActionPayload = {
            name: searchText,
            page,
            oldData,
            onNftsSuccess,
            onNftsFailure,
        }
        searchNfts(payload);
    }

    const onNftsSuccess = (_data: markets.SearchNftsData, canLoadMore: boolean) => {
        setNftsData({
            ..._data,
            fetching: false,
            refreshing: false,
            canLoadMore,
        });
    };

    const onNftsFailure = () => {
        setNftsData((prevState) => {
            return {
                ...prevState,
                fetching: false,
                refreshing: false,
            }
        });
    };

    const onTokensSuccess = (_data: markets.SearchTokensData, canLoadMore: boolean) => {
        setTokensData({
            ..._data,
            fetching: false,
            refreshing: false,
            canLoadMore,
        });
    };

    const onTokensFailure = () => {
        setTokensData((prevState) => {
            return {
                ...prevState,
                fetching: false,
                refreshing: false,
            }
        });
    };

    const onLoadMoreNfts = () => {
        if (dataNfts.canLoadMore) {
            _searchNfts(false, dataNfts.page + 1, dataNfts.dt);
        }
    }

    const onLoadMoreTokens = () => {
        if (dataTokens.canLoadMore) {
            _searchTokens(false,dataTokens.page + 1, dataTokens.dt);
        }
    }

    const renderPrice = (priceAbove, priceBelow) => (
        <HeaderView
            marginRight={scales(5)} flex={0.35} alignItems={'center'}
        >
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.textNumber}>
                {priceAbove}
            </Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.subTextNumber}>
                {priceBelow}
            </Text>
        </HeaderView>
    );

    const renderCap = (volumeAbove, volumeBelow) => (
        <HeaderView flex={0.35} alignItems={'center'}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.textNumber}>
                {volumeAbove}
            </Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.subTextNumber}>
                {volumeBelow}
            </Text>
        </HeaderView>
    );

    const renderTokenItem: ListRenderItem<markets.SearchTokensItem> = ({ item, index }) => (
        <TouchableOpacity
            style={[styles.tokenResultRow, index === 0 && { paddingTop: scales(16) }]}
            onPress={() => goToAddTokenAlert(item?.unit, item?.name, item?.price_ada, item?.price_usd)}
        >
            <Text>{index + 1}</Text>
            <View style={styles.contentItem}>
                <Image uri={item?.icon} style={styles.imageCurrency} />
                <View style={{ justifyContent: 'center' }}>
                    <Text numberOfLines={1} style={styles.textName}>
                        {item.name.trim()}
                    </Text>
                </View>
            </View>
            {renderPrice(item?.price_ada, item?.price_usd)}
            {renderCap(item?.volume_ada, item?.volume_usd)}
        </TouchableOpacity>
    );

    const renderNftItem: ListRenderItem<markets.SearchNftItem> = ({ item, index }) => (
        <TouchableOpacity
            style={[styles.tokenResultRow, index === 0 && { paddingTop: scales(16) }]}
            onPress={() => goToAddNftAlert(item?.policy, item?.name, item?.logo, item?.price_ada)}
        >
            <Text>{index}</Text>
            <View style={styles.contentItem}>
                <Image uri={item?.logo} style={styles.imageCurrency} />
                <View style={{ justifyContent: 'center' }}>
                    <Text numberOfLines={1} style={styles.textName}>
                        {item.name.trim()}
                    </Text>
                </View>
            </View>
            {renderPrice(item?.price_ada, item?.price_usd)}
            {renderCap(item?.volume_ada, item?.volume_usd)}
        </TouchableOpacity >
    );

    const renderHeader = () => (
        <ActivityIndicator
            size='large'
            color={Colors.color_199744}
            style={{ paddingTop: scales(15) }}
        />
    );


    const renderFooter = () => {
        const header = useMemo(() => getMarketHeader(0, MarketsRanking.MARKET_CAP), []);
        return (
            <MarketListSkeleton
                header={header}
                isTokensRoute
                isFooter
            />
        );
    };

    const renderResults = () => isTokenSearch ? (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={dataTokens.dt}
            renderItem={renderTokenItem}
            keyExtractor={(_item, index) => `Alert${index}`}
            ListHeaderComponent={dataTokens.fetching ? renderHeader : null}
            ListFooterComponent={dataTokens.canLoadMore ? renderFooter : null}
            // ListEmptyComponent={!dataTokens.fetching && searchText ? <EmptyView /> : null}
            onEndReached={onLoadMoreTokens}
            onEndReachedThreshold={0.01}
            keyboardShouldPersistTaps='always'
        />
    ) : (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={dataNfts.dt}
            renderItem={renderNftItem}
            keyExtractor={(_item, index) => `Alert${index}`}
            ListHeaderComponent={dataNfts.fetching ? renderHeader : null}
            ListFooterComponent={dataNfts.canLoadMore ? renderFooter : null}
            // ListEmptyComponent={!dataNfts.fetching && searchText ? <EmptyView /> : null}
            onEndReached={onLoadMoreNfts}
            onEndReachedThreshold={0.01}
            keyboardShouldPersistTaps='always'
        />
    );

    return (
        <View style={styles.contentView}>
            <View style={styles.shadow} />
            {renderResults()}
        </View>
    )
}

const mapDispatchToProps = {
    searchTokens: marketActionCreators.searchTokens,
    searchNfts: marketActionCreators.searchNfts,
}

export default connect(undefined, mapDispatchToProps)(ListSearchScene);

const styles = StyleSheet.create({
    contentView: {
        backgroundColor: Colors.color_FFFFFF,
        flex: 1,
    },

    tokenResultRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: scales(16),
        marginHorizontal: scales(16),
        borderBottomWidth: scales(1),
        borderColor: Colors.color_5E626F,
        paddingBottom: scales(8),
    },
    contentItem: {
        marginLeft: scales(18),
        flex: 1,
        flexDirection: 'row',
    },
    imageCurrency: {
        width: scales(24),
        height: scales(24),
        borderRadius: scales(24),
        resizeMode: 'cover',
        marginRight: scales(8),
    },
    textName: {
        ...Fonts.w500,
        fontSize: scales(12),
        color: Colors.color_090F24,
        lineHeight: scales(20),
        maxWidth: scales(160),
    },
    subTextName: {
        ...Fonts.w400,
        fontSize: scales(8),
        color: Colors.color_A2A4AA,
        lineHeight: scales(10),
    },
    textNumber: {
        ...Fonts.w500,
        fontSize: scales(12),
        color: Colors.color_090F24,
        lineHeight: scales(20),
    },
    subTextNumber: {
        ...Fonts.w400,
        fontSize: scales(10),
        color: Colors.color_A2A4AA,
        lineHeight: scales(10),
    },
    shadow: {
        height: scales(8),
        backgroundColor: Colors.color_FFFFFF,
        elevation: 1,
        shadowColor: Colors.color_000000,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
})
