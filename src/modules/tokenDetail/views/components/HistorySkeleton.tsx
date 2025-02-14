import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import Skeleton from 'components/skeleton/Skeleton';
import { getWidthOfColumn } from 'modules/markets/src/utils';
import HeaderView from 'modules/markets/views/components/HeaderView';
import { MASTERDATA_INITIAL_STATE } from 'modules/masterdata/src/constants';
import { Colors, Fonts } from 'themes';
import scales from 'utils/scales';

const HistorySkeleton = ({ isFooter = false }) => {
    const header = MASTERDATA_INITIAL_STATE.nftHeader;
    const widthColumnTwo = useMemo(() => getWidthOfColumn(header.widthArr[1], header), []);
    const widthColumnThree = useMemo(() => getWidthOfColumn(header.widthArr[2], header), []);
    const widthColumnFour = useMemo(() => getWidthOfColumn(header.widthArr[3], header), []);
    const widthColumnFive = useMemo(() => getWidthOfColumn(header.widthArr[4], header), []);
    const widthColumnSix = useMemo(() => getWidthOfColumn(header.widthArr[5], header), []);

    const renderItemSkeleton = () => (
        <View style={styles.container}>
            <HeaderView
                flex={Number(header.widthArr[1])}
                alignItems={header.alignItems[1]}
            >
                <Skeleton width={widthColumnTwo} height={scales(15)} />
            </HeaderView>
            <HeaderView
                flex={Number(header.widthArr[2])}
                alignItems={header.alignItems[2]}
            >
                <Skeleton width={widthColumnThree} height={16} />
                <View style={{ height: scales(5) }} />
                <Skeleton width={widthColumnThree * 2 / 3} height={10} />
            </HeaderView>
            <HeaderView
                flex={Number(header.widthArr[3])}
                alignItems={header.alignItems[3]}
            >
                <Skeleton width={widthColumnFour} height={16} />
                <View style={{ height: scales(5) }} />
                <Skeleton width={widthColumnFour * 2 / 3} height={10} />
            </HeaderView>
            <HeaderView
                flex={Number(header.widthArr[4])}
                alignItems={header.alignItems[4]}
            >
                <Skeleton width={widthColumnFive} height={16} />
                <View style={{ height: scales(5) }} />
                <Skeleton width={widthColumnFive * 2 / 3} height={10} />
            </HeaderView>
            <HeaderView
                flex={Number(header.widthArr[5])}
                alignItems={header.alignItems[5]}
            >
                <Skeleton width={widthColumnSix} height={12} />
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

export default HistorySkeleton;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: scales(44),
        paddingHorizontal: scales(16),
    },
    header: {
        height: scales(40),
        backgroundColor: Colors.color_199744,
    },
    labelHeader: {
        ...Fonts.w400,
        fontSize: scales(14),
        lineHeight: scales(20),
        color: Colors.color_090F24,
    },
})
