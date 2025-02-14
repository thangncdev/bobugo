import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import Skeleton from 'components/skeleton/Skeleton';
import { getWidthOfColumn } from 'modules/markets/src/utils';
import HeaderView from 'modules/markets/views/components/HeaderView';
import { REWARDS_INIT_DATA } from 'modules/walletDetail/src/constants';
import PortfolioChartSkeleton from 'modules/walletDetail/views/components/PortfolioChartSkeleton';
import PortfolioPercentSkeleton from 'modules/walletDetail/views/components/PortfolioPercentSkeleton';
import { Colors } from 'themes';
import scales from 'utils/scales';

const PortfolioAssetsSkeleton = () => {
    const header = REWARDS_INIT_DATA.table_header;
    const widthColumnOne = useMemo(() => getWidthOfColumn(header.widthArr[0], header), []);
    const widthColumnTwo = useMemo(() => getWidthOfColumn(header.widthArr[1], header), []);
    const widthColumnThree = useMemo(() => getWidthOfColumn(header.widthArr[2], header), []);

    const renderHeader = () => <View style={styles.header} />;

    const renderItemSkeleton = () => (
        <View style={styles.container}>
            <HeaderView
                flex={Number(header.widthArr[1])}
                alignItems={header.alignItems[1]}
            >
                <Skeleton width={widthColumnTwo * 2 / 5} height={scales(20)} />
                <View style={{ height: scales(2) }} />
                <Skeleton width={widthColumnTwo * 4 / 5} height={scales(20)} />
            </HeaderView>
            <HeaderView
                flex={Number(header.widthArr[0])}
                alignItems={header.alignItems[0]}
            >
                <Skeleton width={widthColumnOne} height={scales(20)} />
                <View style={{ height: scales(2) }} />
                <Skeleton width={widthColumnOne} height={scales(20)} />
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

    return (
        <>
            <PortfolioPercentSkeleton />
            <PortfolioChartSkeleton />
            {renderHeader()}
            {renderItemSkeleton()}
            {renderItemSkeleton()}
            {renderItemSkeleton()}
            {renderItemSkeleton()}
        </>
    );
};

export default PortfolioAssetsSkeleton;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scales(10),
        paddingVertical: scales(8),
    },
    header: {
        height: scales(38),
        backgroundColor: Colors.color_199744,
    },
})
