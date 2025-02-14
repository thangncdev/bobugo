import React from 'react';
import { StyleSheet, View } from 'react-native';

import Skeleton from 'components/skeleton/Skeleton';
import { Colors } from 'themes';
import scales from 'utils/scales';

const SIZE_CHART = scales(118);

const PortfolioChartSkeleton = () => {
    return (
        <View style={styles.container}>
            <View>
                <Skeleton width={SIZE_CHART} height={SIZE_CHART} borderRadius={SIZE_CHART} />
                <View style={styles.chartSkeleton} />
            </View>
            <View style={{ width: scales(30) }} />
            <View style={{ flex: 1 }}>
                <Skeleton width={scales(160)} height={scales(20)} />
                <View style={{ height: scales(4) }} />
                <Skeleton width={scales(160)} height={scales(20)} />
                <View style={{ height: scales(4) }} />
                <Skeleton width={scales(160)} height={scales(20)} />
            </View>
        </View>
    )
}

export default PortfolioChartSkeleton;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scales(16),
        paddingBottom: scales(12),
    },
    chartSkeleton: {
        position: 'absolute',
        top: scales(10),
        left: scales(10),
        bottom: scales(10),
        right: scales(10),
        width: SIZE_CHART - scales(20),
        height: SIZE_CHART - scales(20),
        backgroundColor: Colors.color_FFFFFF,
        borderRadius: scales(SIZE_CHART / 2),
    },
});
