import { isEqual, upperFirst } from 'lodash';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts } from 'themes';
import scales from 'utils/scales';

interface HeaderMarketProps {
    currentIndex: number;
    index: number;
    header: masterdata.NftHeader;
}

const HeaderMarket = (props: HeaderMarketProps) => {
    const { header } = props;

    const renderSeparator = () => <View style={styles.separator} />

    return (
        <>
            <View style={styles.headerList}>
                {header?.colums?.map((colum, index) => {
                    return (
                        <View
                            key={index.toString()}
                            style={{
                                flex: Number(header.widthArr[index]) || 1,
                                alignItems: header.alignItems[index] || 'flex-start',
                                marginRight: index + 1 !== header.colums.length ? scales(5) : 0,
                            }}
                        >
                            <Text style={styles.labelHeader}>{upperFirst(colum)}</Text>
                        </View>
                    )
                })}
            </View>
            {renderSeparator()}
        </>
    )
}

export default React.memo(HeaderMarket, (prev, next) => {
    const condition = isEqual(prev.header.colums, next.header.colums)
        && isEqual(prev.header.widthArr, next.header.widthArr)
        && isEqual(prev.header.alignItems, next.header.alignItems);
    const isCurrentRoute = prev.currentIndex === prev.index;
    return isCurrentRoute ? condition : true;
});

const styles = StyleSheet.create({
    headerList: {
        height: scales(36),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scales(16),
        backgroundColor: Colors.color_FFFFFF,
    },
    labelHeader: {
        ...Fonts.w400,
        fontSize: scales(14),
        lineHeight: scales(20),
        color: Colors.color_090F24,
    },
    separator: {
        height: scales(1),
        backgroundColor: Colors.color_5E626F,
        marginHorizontal: scales(16),
    },
})
