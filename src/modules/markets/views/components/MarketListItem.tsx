import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Svgs from 'assets/svgs';
import { GradientText, Image, TouchableOpacity } from 'components/base';
import { CurrencyUnit } from 'modules/markets/src/constants';
import { isTokensRoute } from 'modules/markets/src/utils';
import HeaderView from 'modules/markets/views/components/HeaderView';
import { goToTokenDetail } from 'modules/tokenDetail/src/utils';
import { Colors, Fonts } from 'themes';
import scales from 'utils/scales';

interface MarketListItemProps {
    currentIndex: number;
    item: markets.TableData,
    header: masterdata.NftHeader;
    unitSelected: CurrencyUnit;
}

const MarketListItem: React.FC<MarketListItemProps> = (props) => {
    const { currentIndex, item, header, unitSelected } = props;
    const isTokens = useMemo(() => isTokensRoute(currentIndex), [currentIndex]);

    const renderIndex = () => (
        <HeaderView
            flex={Number(header.widthArr[0])}
            alignItems={header.alignItems[0]}
            marginRight={scales(5)}
        >
            <Text style={styles.textNumber}>
                {item?.colums[0]}
            </Text>
        </HeaderView>
    )

    const renderImage = () => (
        <HeaderView
            flex={Number(header.widthArr[1])}
            alignItems={header.alignItems[1]}
            marginRight={scales(5)}
        >
            <Image uri={item?.colums[1]} style={styles.imageCurrency} />
        </HeaderView>
    );

    const renderName = () => {
        const split = item?.colums[2].split('\n') || ['', ''];

        return (
            <HeaderView
                flex={Number(header.widthArr[2])}
                alignItems={header.alignItems[2]}
                marginRight={scales(5)}
            >
                <Text numberOfLines={1} style={styles.textName}>
                    {split[0]}
                </Text>
                <Text numberOfLines={1} style={styles.subTextName}>
                    {split[1]}
                </Text>
            </HeaderView>
        );
    }

    const renderPrice = () => {
        const split = item?.colums[3].split('\n') || ['', ''];
        const priceBelow = unitSelected === CurrencyUnit.ADA ? split[0] : split[1]
        const priceAbove = unitSelected === CurrencyUnit.ADA ? split[1] : split[0]
        return (
            <HeaderView
                flex={Number(header.widthArr[3])}
                alignItems={header.alignItems[3]}
                marginRight={scales(5)}
            >
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.textNumber}>
                    {priceBelow}
                </Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.subTextNumber}>
                    {priceAbove}
                </Text>
            </HeaderView>
        );
    }

    const renderCap = () => {
        const split = item?.colums[4].split('\n') || ['', ''];
        const capBelow = unitSelected === CurrencyUnit.ADA ? split[0] : split[1]
        const capAbove = unitSelected === CurrencyUnit.ADA ? split[1] : split[0]
        return (
            <HeaderView
                flex={Number(header.widthArr[4])}
                alignItems={header.alignItems[4]}
                marginRight={isTokens ? 0 : scales(5)}
            >
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.textNumber}>
                    {capBelow}
                </Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.subTextNumber}>
                    {capAbove}
                </Text>
            </HeaderView>
        );
    }

    const render24h = () => {
        if (!item?.colums[5] && header?.widthArr[5]) {
            return (
                <HeaderView
                    flex={Number(header.widthArr[5])}
                    alignItems={header.alignItems[5]}
                >
                    <View />
                </HeaderView>
            );
        }

        const isNegative24h = item?.colums[5].includes('-');
        const colorsPositive = [Colors.color_8AF4EA, Colors.color_25C269];
        const colorsNegative = [Colors.color_F02A79, Colors.color_F03A39];

        return (
            <HeaderView
                flex={Number(header.widthArr[5])}
                alignItems={header.alignItems[5]}
            >
                {item ? (
                    <View style={styles.view24h}>
                        {isNegative24h ? (
                            <Svgs.IcLosersGradient height={scales(20)} width={scales(20)} />
                        ) : (
                            <Svgs.IcTopGainersGradient height={scales(20)} width={scales(20)} />
                        )}
                        <GradientText
                            style={styles.text24h}
                            colors={isNegative24h ? colorsNegative : colorsPositive}
                        >
                            {item?.colums[5]}
                        </GradientText>
                    </View>
                ) : null}
            </HeaderView>
        );
    }

    const _goToTokenDetail = () => {
        goToTokenDetail({ name: item?.colums[2].split('\n')[0], logo: item?.colums[1], key: item.key });
    }

    return (
        <TouchableOpacity style={[styles.container]} onPress={_goToTokenDetail}>
            {renderIndex()}
            {renderImage()}
            {renderName()}
            {renderPrice()}
            {renderCap()}
            {isTokens ? null : render24h()}
        </TouchableOpacity>
    );
};

export default React.memo(MarketListItem);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: scales(16),
        height: scales(44),
    },
    imageCurrency: {
        width: scales(24),
        height: scales(24),
        borderRadius: scales(24),
        resizeMode: 'contain',
    },
    textName: {
        ...Fonts.w500,
        fontSize: scales(12),
        color: Colors.color_090F24,
        lineHeight: scales(20),
    },
    subTextName: {
        ...Fonts.w400,
        fontSize: scales(9),
        color: Colors.color_A2A4AA,
        lineHeight: scales(10),
    },
    textNumber: {
        ...Fonts.w500,
        fontSize: scales(12),
        color: Colors.color_090F24,
        lineHeight: scales(20),
    },
    subTextNumber: {
        ...Fonts.w400,
        fontSize: scales(10),
        color: Colors.color_A2A4AA,
        lineHeight: scales(10),
    },
    view24h: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text24h: {
        ...Fonts.w500,
        fontSize: scales(11),
        lineHeight: scales(20),
    },
    space: {
        height: scales(3),
    },
});
