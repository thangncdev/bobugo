import React from 'react';
import { StyleSheet, View } from 'react-native';

import Skeleton from 'components/skeleton/Skeleton';
import scales from 'utils/scales';

const PortfolioPercentSkeleton = () => {
    return (
        <View style={styles.container}>
            <View style={styles.rowBetween}>
                <Skeleton width={scales(40)} height={scales(14)} />
                <Skeleton width={scales(40)} height={scales(14)} />
            </View>
            <View style={{ height: scales(4) }} />
            <Skeleton width={scales(244)} height={scales(14)} />
        </View>
    )
}

export default PortfolioPercentSkeleton;

const styles = StyleSheet.create({
    container: {
        paddingVertical: scales(16),
        paddingHorizontal: scales(16),
    },
    rowBetween: {
        flexDirection: 'row',
        width: scales(244),
        justifyContent: 'space-between',
    },
});
