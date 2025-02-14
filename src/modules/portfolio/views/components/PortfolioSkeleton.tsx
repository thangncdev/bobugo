import React from 'react';
import { StyleSheet, View } from 'react-native';

import Skeleton from 'components/skeleton/Skeleton';
import { Colors, Sizes } from 'themes';
import scales from 'utils/scales';

const ITEM_WIDTH = Sizes.screenWidth - scales(32);

const PortfolioSkeleton = ({ isFooter = false }) => {
    const renderSkeleton = () => (
        <View style={styles.item}>
            <Skeleton height={scales(80)} width={ITEM_WIDTH} borderRadius={scales(10)} />
            <View style={styles.name} />
            <View style={styles.address} />
        </View>
    );

    return isFooter ? renderSkeleton() : (
        <View style={styles.container}>
            {renderSkeleton()}
            {renderSkeleton()}
            {renderSkeleton()}
            {renderSkeleton()}
        </View>
    );
};

export default PortfolioSkeleton;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: scales(16),
        marginTop: scales(16),
        backgroundColor: Colors.color_FFFFFF,
    },
    item: {
        marginBottom: scales(10),
    },
    name: {
        position: 'absolute',
        top: scales(16),
        left: scales(16),
        width: ITEM_WIDTH / 3,
        height: scales(24),
        backgroundColor: 'white',
    },
    address: {
        position: 'absolute',
        bottom: scales(16),
        left: scales(16),
        width: ITEM_WIDTH * 3 / 4,
        height: scales(20),
        backgroundColor: 'white',
    },
});
