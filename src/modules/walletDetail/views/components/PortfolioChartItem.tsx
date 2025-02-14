import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from 'themes';
import TextStyles from 'themes/textStyles';
import scales from 'utils/scales';

interface Props {
    color: string,
    name: string,
    percent: string,
}

const PortfolioChartItem: React.FC<Props> = ({ color, name, percent }) => {
    return (
        <View style={styles.container}>
            <View style={[styles.circle, { backgroundColor: color }]} />
            <Text style={styles.assetText}>{name}</Text>
            <Text style={styles.percent}>{percent}%</Text>
        </View>
    )
}

export default PortfolioChartItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: scales(4),
    },
    circle: {
        marginRight: scales(8),
        width: scales(8),
        height: scales(8),
        borderRadius: scales(8),
    },
    assetText: {
        flex: 1,
        ...TextStyles.SubTitle3,
        color: Colors.color_090F24,
    },
    percent: {
        ...TextStyles.SubTitle3,
        color: Colors.color_090F24,
    },
})
