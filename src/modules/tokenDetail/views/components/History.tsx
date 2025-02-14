import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import EmptyView from 'components/skeleton/EmptyView';
import { START_PAGE } from 'constants/constants';
import { tokenDetailActionCreators } from 'modules/tokenDetail/src/actions';
import { HISTORY_DATA } from 'modules/tokenDetail/src/constants';
import { isTokenKey } from 'modules/tokenDetail/src/utils';
import HeaderHistory from 'modules/tokenDetail/views/components/HeaderHistory';
import HistorySkeleton from 'modules/tokenDetail/views/components/HistorySkeleton';
import NftHistoryItem from 'modules/tokenDetail/views/components/NftHistoryItem';
import TokenHistoryItem from 'modules/tokenDetail/views/components/TokenHistoryItem';
import TradingView from 'modules/tokenDetail/views/components/TradingView';
import { Colors, Sizes } from 'themes';
import scales from 'utils/scales';

interface DispatchProps {
    getHistory: typeof tokenDetailActionCreators.getHistory;
}

interface Props {
    token: tokenDetail.RouteParams;
}

type HistoryProps = Props & DispatchProps;

const History: React.FC<HistoryProps> = (props) => {
    const { token, getHistory } = props;

    const [history, setHistory] = useState<
        tokenDetail.HistoryData & FlatListLoadData
        >(HISTORY_DATA);

    useEffect(() => {
        _getHistory();
    }, []);

    const _getHistory = (page: number = START_PAGE, oldTableData: tokenDetail.TableData[] = []) => {
        const payload: tokenDetail.GetHistoryActionPayload = {
            key: token.key,
            page,
            oldTableData,
            timeframe: '30d',
            onSuccess,
            onFailure,
        };
        getHistory(payload);
    };

    const onSuccess = (data: tokenDetail.HistoryData, canLoadMore: boolean) => {
        setHistory({
            ...data,
            fetching: false,
            refreshing: false,
            canLoadMore,
        });
    };

    const onFailure = () => {
        setHistory((prevState) => {
            return {
                ...prevState,
                fetching: false,
                refreshing: false,
            }
        });
    };

    const renderTradingView = () => <TradingView token={token} />;

    const renderItem = ({ item, index }) => {
        if (index === 0 && item === 0) {
            return (
                <HeaderHistory
                    header={history.table_header}
                />
            );
        } else {
            return !isTokenKey(token.key) ? (
                <NftHistoryItem
                    token={token}
                    item={item}
                    header={history.table_header}
                />
            ) : (
                <TokenHistoryItem
                    item={item}
                    header={history.table_header}
                />
            );
        }
    }

    const keyExtractor = (item: tokenDetail.TableData, index: number) => (item?.key?.hash || '') + index;

    const renderSeparator = () => <View style={styles.separator} />

    const renderEmpty = () => <EmptyView />;

    const onLoadMore = () => {
        if (history.canLoadMore) {
            _getHistory(history.page + 1, history.table_data);
        }
    };

    const renderFooter = () => {
        if (history.fetching) {
            return <HistorySkeleton />
        } else if (history.canLoadMore) {
            return <HistorySkeleton isFooter />
        }
        return null;
    }

    return (
        <FlatList
            style={styles.container}
            contentContainerStyle={styles.content}
            data={[0, ...history.table_data]}
            stickyHeaderIndices={[1]}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ListEmptyComponent={renderEmpty()}
            ListHeaderComponent={renderTradingView()}
            ItemSeparatorComponent={renderSeparator}
            onEndReached={onLoadMore}
            onEndReachedThreshold={0.01}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={renderFooter}
        />
    )
};

const mapDispatch = {
    getHistory: tokenDetailActionCreators.getHistory,
}

export default connect(undefined, mapDispatch)(History);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        paddingBottom: Sizes.bottomSpace + scales(10),
    },
    separator: {
        height: scales(16),
        backgroundColor: Colors.transparent,
    },
});
