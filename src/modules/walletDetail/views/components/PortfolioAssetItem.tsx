import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Svgs from 'assets/svgs';
import { Image } from 'components/base';
import { getWidthOfColumn } from 'modules/markets/src/utils';
import HeaderView from 'modules/markets/views/components/HeaderView';
import { Colors } from 'themes';
import TextStyles from 'themes/textStyles';
import scales from 'utils/scales';
import { getHeader } from 'utils/string';

interface AssetDataItemProps {
    showBalance: boolean
    item: walletDetail.AssetItem;
    header: masterdata.NftHeader;
}

const PortfolioAssetItem = (props: AssetDataItemProps) => {
    const { item, showBalance, header } = props;

    const widthColumnOne = useMemo(() => getWidthOfColumn(header.widthArr[0], header), []);

    const renderImage = () => (
        <HeaderView
            flex={Number(header.widthArr[0])}
            alignItems={getHeader(header, 'alignItems', 0)}
            marginRight={scales(5)}
        >
            <Image
                uri={item?.colums[0]}
                style={{
                    width: widthColumnOne,
                    height: widthColumnOne * 1.00002,
                    resizeMode: 'contain',
                    borderRadius: scales(2),
                }}
            />
        </HeaderView>
    );

    const renderAsset = () => {
        const asset = item?.colums[1].split('\n') || ['', ''];
        return (
            <HeaderView
                flex={Number(header.widthArr[1])}
                alignItems={getHeader(header, 'alignItems', 1)}
                marginRight={scales(5)}
            >
                <View>
                    <Text style={styles.assetName} numberOfLines={1}>{asset[0]}</Text>
                    <Text style={styles.assetType}>{asset[1]}</Text>
                </View>
            </HeaderView>
        )
    };

    const renderPrice = () => {
        const price = item?.colums[2].split('\n') || ['', ''];
        const value = price[0];
        const percentChange = price[1];
        const isDown = percentChange.includes('-');
        const IconPercent = Svgs[`IcPrice${isDown ? 'Down' : 'Increase'}`]
        return (
            <HeaderView
                flex={Number(header.widthArr[2])}
                alignItems={getHeader(header, 'alignItems', 2)}
                marginRight={scales(5)}
            >
                <Text style={isDown ? styles.priceDown : styles.priceIncrease}>{value}</Text>
                <View style={styles.row}>
                    <IconPercent width={scales(10)} height={scales(10)} />
                    <Text style={isDown ? styles.priceDown : styles.priceIncrease}>{percentChange}</Text>
                </View>
            </HeaderView>
        )
    };

    const renderAllocation = () => {
        const allocation = item?.colums[3].split('\n') || ['', ''];
        return (
            <HeaderView
                flex={Number(header.widthArr[3])}
                alignItems={getHeader(header, 'alignItems', 3)}
            >
                <Text style={styles.assetName}>{allocation[0]}</Text>
                <Text style={styles.assetType} numberOfLines={1}>{showBalance ? allocation[1] : '******'}</Text>
            </HeaderView>
        )
    }

    return (
        <View style={styles.container} >
            {renderImage()}
            {renderAsset()}
            {renderPrice()}
            {renderAllocation()}
        </View>
    );
}

export default PortfolioAssetItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: scales(10),
    },

    assetName: {
        ...TextStyles.SubTitle12,
        color: Colors.color_090F24,
    },
    assetType: {
        ...TextStyles.SubTitle12,
        color: Colors.color_5E626F,
    },
    priceIncrease: {
        ...TextStyles.SubTitle12,
        color: Colors.color_199744,
    },
    priceDown: {
        ...TextStyles.SubTitle12,
        color: Colors.color_CC0A00,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})
