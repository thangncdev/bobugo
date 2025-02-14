import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItem, RefreshControl, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import EmptyView from 'components/skeleton/EmptyView';
import { START_PAGE } from 'constants/constants';
import { walletDetailActionCreators } from 'modules/walletDetail/src/actions';
import { REWARDS_INIT_DATA } from 'modules/walletDetail/src/constants';
import HeaderRewards from 'modules/walletDetail/views/components/HeaderRewards';
import RewardItem from 'modules/walletDetail/views/components/RewardItem';
import RewardsSkeleton from 'modules/walletDetail/views/components/RewardsSkeleton';
import { AppDispatch } from 'redux/store';
import { Colors, Sizes } from 'themes';
import scales from 'utils/scales';

interface RewardsProps {
    id: number;
}

const RewardsScreen = (props: RewardsProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const [rewards, setRewards] = useState<walletDetail.RewardsData & FlatListLoadData>(REWARDS_INIT_DATA);

    useEffect(() => {
        getRewards();
    }, []);

    const getRewards = (page: number = START_PAGE, oldTableData: walletDetail.RewardItem[] = []) => {
        const payload: walletDetail.GetRewardsActionPayload = {
            id: props.id,
            page,
            oldTableData,
            onSuccess,
            onFailure,

        }
        dispatch(walletDetailActionCreators.getRewards(payload))
    }

    const onSuccess = (data: walletDetail.RewardsData, canLoadMore: boolean) => {
        setRewards({
            ...data,
            fetching: false,
            refreshing: false,
            canLoadMore,
        });
    }

    const onFailure = () => {
        setRewards((prevState) => {
            return {
                ...prevState,
                fetching: false,
                refreshing: false,
            }
        });
    }

    const onRefresh = () => {
        setRewards((prevState) => {
            return {
                ...prevState,
                refreshing: true,
            }
        });
        getRewards();
    }

    const refreshControl = () => (
        <RefreshControl
            refreshing={rewards.refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.color_199744}
            colors={[Colors.color_199744]}
        />
    );

    const keyExtractor = (item: walletDetail.RewardItem, index: number) => `${index}${item.colums[0]}`;

    const onLoadMore = () => {
        if (rewards.canLoadMore) {
            getRewards(rewards.page + 1, rewards.table_data);
        }
    }

    const renderHeader = () => <HeaderRewards header={rewards.table_header} />;

    const renderItem: ListRenderItem<walletDetail.RewardItem> = ({ item }) => (
        <RewardItem
            item={item}
            header={rewards.table_header}
        />
    );

    const renderFooter = () => rewards.canLoadMore ? <RewardsSkeleton isFooter /> : null;

    const renderListRewards = () => rewards.fetching ? <RewardsSkeleton /> : (
        <FlatList
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            refreshControl={refreshControl()}
            data={rewards.table_data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ListFooterComponent={renderFooter}
            onEndReached={onLoadMore}
            onEndReachedThreshold={0.01}
            ListEmptyComponent={<EmptyView />}
        />
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderListRewards()}
        </View>
    )
};

export default RewardsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        paddingBottom: Sizes.bottomSpace + scales(10),
    },
    footerLoading: {
        marginVertical: scales(8),
    },
});

