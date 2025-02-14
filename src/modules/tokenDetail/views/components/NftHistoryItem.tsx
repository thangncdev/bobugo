import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Image } from 'components/base';
import { getWidthOfColumn } from 'modules/markets/src/utils';
import HeaderView from 'modules/markets/views/components/HeaderView';
import { Colors, Fonts } from 'themes';
import scales from 'utils/scales';
import { getHeader } from 'utils/string';

interface Props {
    token: tokenDetail.RouteParams;
    item: tokenDetail.TableData;
    header: masterdata.NftHeader;
}

const NftHistoryItem: React.FC<Props> = (props) => {
    const { token, item, header } = props;

    const widthColumnOne = useMemo(() => getWidthOfColumn(header.widthArr[0], header), []);

    const renderImage = () => (
        <HeaderView
            flex={Number(header.widthArr[0])}
            alignItems={getHeader(header, 'alignItems', 0)}
            marginRight={scales(5)}
        >
            <Image
                uri={token?.logo}
                style={{
                    width: widthColumnOne,
                    height: widthColumnOne * 1.00002,
                    resizeMode: 'contain',
                    borderRadius: scales(2),
                }}
            />
        </HeaderView>
    );

    const renderName = () => (
        <HeaderView
            flex={Number(header.widthArr[1])}
            alignItems={getHeader(header, 'alignItems', 1)}
            marginRight={scales(5)}
        >
            <Text numberOfLines={2} style={styles.textName}>
                {item?.colums[1]}
            </Text>
        </HeaderView>
    );

    const renderTime = () => (
        <HeaderView
            flex={Number(header.widthArr[2])}
            alignItems={getHeader(header, 'alignItems', 2)}
            marginRight={scales(5)}
        >
            <Text numberOfLines={1} style={styles.textName}>
                {item?.colums[2]}
            </Text>
        </HeaderView>
    );

    const renderPrice = () => (
        <HeaderView
            flex={Number(header.widthArr[3])}
            alignItems={getHeader(header, 'alignItems', 3)}
            marginRight={scales(5)}
        >
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.textName}>
                {item?.colums[3]}
            </Text>
        </HeaderView>
    );

    const renderProfile = () => {
        const split = item?.colums[4].split('\n') || ['', ''];

        return (
            <HeaderView
                flex={Number(header.widthArr[4])}
                alignItems={getHeader(header, 'alignItems', 4)}
                marginRight={scales(5)}
            >
                <Text numberOfLines={2} style={styles.textName}>
                    {split[0]}
                </Text>
                <View style={{ height: scales(8) }} />
                <Text numberOfLines={2} style={styles.textName}>
                    {split[1]}
                </Text>
            </HeaderView>
        );
    }

    return (
        <View style={styles.container}>
            {renderImage()}
            {renderName()}
            {renderTime()}
            {renderPrice()}
            {renderProfile()}
        </View>
    )
};

export default NftHistoryItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scales(8),
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
