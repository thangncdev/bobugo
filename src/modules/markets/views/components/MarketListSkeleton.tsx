import { upperFirst } from 'lodash';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Skeleton from 'components/skeleton/Skeleton';
import { getWidthOfColumn } from 'modules/markets/src/utils';
import HeaderView from 'modules/markets/views/components/HeaderView';
import { Colors, Fonts } from 'themes';
import scales from 'utils/scales';

interface MarketListSkeletonProps {
    header: masterdata.NftHeader;
    isTokensRoute: boolean;
    isFooter?: boolean;
}

const MarketListSkeleton = (props: MarketListSkeletonProps) => {
    const { header, isTokensRoute, isFooter = false } = props;

    const widthColumnOne = useMemo(() => getWidthOfColumn(header.widthArr[0], header), []);
    const widthColumnThree = useMemo(() => getWidthOfColumn(header.widthArr[2], header), []);
    const widthColumnFour = useMemo(() => getWidthOfColumn(header.widthArr[3], header), []);
    const widthColumnFive = useMemo(() => getWidthOfColumn(header.widthArr[4], header), []);
    const widthColumnSix = useMemo(() => getWidthOfColumn(header.widthArr[5], header), []);

    const renderHeaderSkeleton = () => (
        <View style={styles.header}>
            {header?.colums?.map((colum, index) => {
                return (
                    <View
                        key={index.toString()}
                        style={{
                            flex: Number(header.widthArr[index]) || 1,
                            alignItems: header.alignItems[index] || 'flex-start',
                            marginRight: index + 1 !== header.colums.length ? scales(5) : 0,
                        }}
                    >
                        <Text style={styles.labelHeader}>{upperFirst(colum)}</Text>
                    </View>
                )
            })}
        </View>
    );

    const renderSeparator = () => <View style={styles.separator} />

    const renderItemSkeleton = () => (
        <View style={styles.container}>
            <HeaderView
                flex={Number(header.widthArr[0])}
                alignItems={header.alignItems[0]}
            >
                <Skeleton width={widthColumnOne} height={10} />
            </HeaderView>
            <HeaderView
                flex={Number(header.widthArr[1])}
                alignItems={header.alignItems[1]}
            >
                <Skeleton width={scales(24)} height={scales(24)} borderRadius={scales(24)} />
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
            {isTokensRoute ? null : (
                <HeaderView
                    flex={Number(header.widthArr[5])}
                    alignItems={header.alignItems[5]}
                >
                    <Skeleton width={widthColumnSix} height={12} />
                </HeaderView>
            )}
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
            {renderHeaderSkeleton()}
            {renderSeparator()}
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

export default MarketListSkeleton;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: scales(44),
        paddingHorizontal: scales(16),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: scales(36),
        paddingHorizontal: scales(16),
    },
    separator: {
        height: scales(1),
        backgroundColor: Colors.color_5E626F,
        marginHorizontal: scales(16),
    },
    labelHeader: {
        ...Fonts.w400,
        fontSize: scales(14),
        lineHeight: scales(20),
        color: Colors.color_090F24,
    },
})
