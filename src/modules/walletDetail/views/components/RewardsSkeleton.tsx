import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import Skeleton from 'components/skeleton/Skeleton';
import { getWidthOfColumn } from 'modules/markets/src/utils';
import HeaderView from 'modules/markets/views/components/HeaderView';
import { REWARDS_INIT_DATA } from 'modules/walletDetail/src/constants';
import { Colors } from 'themes';
import scales from 'utils/scales';

const RewardsSkeleton = ({ isFooter = false }) => {
    const header = REWARDS_INIT_DATA.table_header;
    const widthColumnOne = useMemo(() => getWidthOfColumn(header.widthArr[0], header), []);
    const widthColumnTwo = useMemo(() => getWidthOfColumn(header.widthArr[1], header), []);
    const widthColumnThree = useMemo(() => getWidthOfColumn(header.widthArr[2], header), []);

    const renderItemSkeleton = () => (
        <View style={styles.container}>
            <HeaderView
                flex={Number(header.widthArr[0])}
                alignItems={header.alignItems[0]}
            >
                <Skeleton width={widthColumnOne} height={scales(20)} />
            </HeaderView>
            <HeaderView
                flex={Number(header.widthArr[1])}
                alignItems={header.alignItems[1]}
            >
                <Skeleton width={widthColumnTwo * 4 / 5} height={scales(20)} />
            </HeaderView>
            <HeaderView
                flex={Number(header.widthArr[2])}
                alignItems={header.alignItems[2]}
            >
                <Skeleton width={widthColumnThree * 2 / 3} height={scales(20)} />
                <View style={{ height: scales(2) }} />
                <Skeleton width={widthColumnThree} height={scales(20)} />
            </HeaderView>
        </View>
    );

    return isFooter ? (
        <>
            {renderItemSkeleton()}
            {renderItemSkeleton()}
            {renderItemSkeleton()}
        </>
    ) : (
        <>
            {renderItemSkeleton()}
            {renderItemSkeleton()}
            {renderItemSkeleton()}
            {renderItemSkeleton()}
            {renderItemSkeleton()}
            {renderItemSkeleton()}
            {renderItemSkeleton()}
            {renderItemSkeleton()}
        </>
    );
};

export default RewardsSkeleton;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scales(16),
        paddingTop: scales(4),
        paddingBottom: scales(8),
        borderBottomWidth: scales(1),
        borderBottomColor: Colors.color_A2A4AA,
    },
})
