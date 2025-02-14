import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PieChart from 'react-native-pie-chart';

import { useSetting } from 'contexts/SettingProvider';
import { getAssetColor, getFinalAssets, stringToFloat } from 'modules/walletDetail/src/utils';
import PortfolioChartItem from 'modules/walletDetail/views/components/PortfolioChartItem';
import { Colors, Fonts } from 'themes';
import scales from 'utils/scales';

interface Props {
    portfolio: walletDetail.PortfolioData & FlatListLoadData,
}

const SIZE_CHART = scales(118);

const PortfolioChart: React.FC<Props> = ({ portfolio }) => {
    const { t } = useSetting();

    const [series, setSeries] = useState([]);
    const [sliceColor, setSliceColor] = useState([]);

    const assets = portfolio?.asset_percenter || [];
    const assetsFinal = getFinalAssets(assets);

    useEffect(() => {
        const _series = []
        const _sliceColorseries = []
        assetsFinal.forEach((assetFinal, index) => {
            const percent = stringToFloat(assetFinal.percenter.replace('%', ''))
            _series.push(percent)
            _sliceColorseries.push(getAssetColor(index))
        });

        setSeries(_series)
        setSliceColor(_sliceColorseries)
    }, [portfolio]);

    const renderChart = () => series.length && sliceColor.length ? (
        <PieChart
            widthAndHeight={SIZE_CHART}
            series={series}
            sliceColor={sliceColor}
            coverRadius={0.8}
            coverFill={'#FFF'}
        />
    ) : null;

    const renderPercentDetail = () => (
        <View style={styles.percentContainer} >
            {assetsFinal.map((assetFinal, index) => (
                <PortfolioChartItem
                    key={assetFinal?.name + index.toString()}
                    color={sliceColor[index]}
                    name={assetFinal?.name}
                    percent={series[index]?.toString()}
                />
            ))}
        </View>
    );

    const renderAssetNull = () => (
        <View style={styles.assetNull}>
            <View>
                <View style={styles.chartSkeletonContainer} />
                <View style={styles.chartSkeleton} />
            </View>
            <Text style={styles.textAssetNull}>{t('no_assets_found')}</Text>
        </View>
    );

    return assets.length ? (
        <View style={styles.container}>
            {renderChart()}
            {renderPercentDetail()}
        </View>
    ) : renderAssetNull();
};
export default PortfolioChart;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scales(16),
        paddingBottom: scales(12),
    },
    percentContainer: {
        marginLeft: scales(30),
        flex: 1,
    },
    chartSkeletonContainer: {
        width: SIZE_CHART,
        height: SIZE_CHART,
        backgroundColor: Colors.color_A2A4AA,
        borderRadius: scales(SIZE_CHART / 2),
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
    assetNull: {
        flexDirection: 'row',
        paddingHorizontal: scales(16),
        alignItems: 'center',
    },
    textAssetNull: {
        ...Fonts.w600,
        color: Colors.color_090F24,
        fontSize: scales(14),
        paddingLeft: scales(30),
    },
});
