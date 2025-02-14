import React from 'react';
import { StyleSheet, View } from 'react-native';

import Skeleton from 'components/skeleton/Skeleton';
import { Colors } from 'themes';
import scales from 'utils/scales';

interface Props {
    isFooter?: boolean;
}

const AlertsSkeleton: React.FC<Props> = ({ isFooter = false }) => {
    const renderSkeleton = () => (
        <View style={styles.container}>
            <Skeleton />
            <View style={{ height: scales(2) }} />
            <View style={styles.contentRow}>
                <View style={styles.leftContent}>
                    <Skeleton />
                    <View style={{ height: scales(2) }} />
                    <View style={{ flexDirection: 'row' }}>
                        <Skeleton />
                        <Skeleton />
                    </View>
                </View>
                <View style={styles.rightContent}>
                    <View style={styles.columnRight}>
                        <Skeleton />
                        <View style={{ height: scales(2) }} />
                        <Skeleton />
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Skeleton height={scales(24)} width={scales(24)} />
                    </View>
                </View>
            </View>
            <View />
        </View>
    );

    const renderSeparator = () => <View style={styles.separator} />;

    return isFooter ? renderSkeleton() : (
        <>
            {renderSkeleton()}
            {renderSeparator()}
            {renderSkeleton()}
            {renderSeparator()}
            {renderSkeleton()}
            {renderSeparator()}
            {renderSkeleton()}
        </>
    );
};

export default AlertsSkeleton;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.color_FFFFFF,
        flexDirection: 'column',
        padding: scales(16),
    },
    contentRow: { flexDirection: 'row', justifyContent: 'space-between' },
    leftContent: { flexDirection: 'column', justifyContent: 'center' },
    rightContent: { flexDirection: 'row' },
    columnRight: {
        marginRight: scales(8),
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    separator: {
        height: scales(1),
        backgroundColor: Colors.color_A2A4AA,
    },
});
