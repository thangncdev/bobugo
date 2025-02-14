import { upperFirst } from 'lodash';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import HeaderView from 'modules/markets/views/components/HeaderView';
import { Colors, Fonts } from 'themes';
import scales from 'utils/scales';
import { getHeader } from 'utils/string';

interface Props {
    item: tokenDetail.TableData;
    header: masterdata.NftHeader;
}

const TokenHistoryItem: React.FC<Props> = (props) => {
    const { item, header } = props;
    const key = item?.key as tokenDetail.TokenKey;
    const color = key?.color || Colors.color_090F24;

    const renderDate = () => (
        <HeaderView
            flex={Number(header.widthArr[0])}
            alignItems={getHeader(header, 'alignItems', 0)}
            marginRight={scales(5)}
        >
            <Text numberOfLines={2} style={[styles.textName, { color }]}>
                {item?.colums[0]}
            </Text>
        </HeaderView>
    );

    const renderType = () => (
        <HeaderView
            flex={Number(header.widthArr[1])}
            alignItems={getHeader(header, 'alignItems', 1)}
            marginRight={scales(5)}
        >
            <Text numberOfLines={2} style={[styles.textName, { color }]}>
                {upperFirst(item?.colums[1])}
            </Text>
        </HeaderView>
    );

    const renderPrice = () => (
        <HeaderView
            flex={Number(header.widthArr[2])}
            alignItems={getHeader(header, 'alignItems', 2)}
            marginRight={scales(5)}
        >
            <Text numberOfLines={1} style={[styles.textName, { color }]}>
                {item?.colums[2]}
            </Text>
        </HeaderView>
    );

    const renderTotalToken = () => (
        <HeaderView
            flex={Number(header.widthArr[3])}
            alignItems={getHeader(header, 'alignItems', 3)}
            marginRight={scales(5)}
        >
            <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={[styles.textName, { color }]}
            >
                {item?.colums[3]}
            </Text>
        </HeaderView>
    );

    const renderTotalADA = () => (
        <HeaderView
            flex={Number(header.widthArr[4])}
            alignItems={getHeader(header, 'alignItems', 4)}
            marginRight={scales(5)}
        >
            <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={[styles.textName, { color }]}
            >
                {item?.colums[4]}
            </Text>
        </HeaderView>
    );

    const renderProfile = () => (
        <HeaderView
            flex={Number(header.widthArr[5])}
            alignItems={getHeader(header, 'alignItems', 5)}
        >
            <Text numberOfLines={1} style={[styles.textName, { color }]}>
                {item?.colums[5]}
            </Text>
        </HeaderView>
    );

    return (
        <View style={styles.container}>
            {renderDate()}
            {renderType()}
            {renderPrice()}
            {renderTotalToken()}
            {renderTotalADA()}
            {renderProfile()}
        </View>
    )
};

export default TokenHistoryItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: scales(8),
    },
    imageCurrency: {
        width: scales(24),
        height: scales(24),
        resizeMode: 'contain',
    },
    textName: {
        ...Fonts.w500,
        fontSize: scales(12),
        color: Colors.color_090F24,
        lineHeight: scales(14),
    },
});
