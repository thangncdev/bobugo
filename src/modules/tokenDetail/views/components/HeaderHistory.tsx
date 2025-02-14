import { isEqual, upperFirst } from 'lodash';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts } from 'themes';
import scales from 'utils/scales';

interface Props {
    header: masterdata.NftHeader;
}

const HeaderHistory = (props: Props) => {
    const { header } = props;

    return (
        <View style={styles.headerList}>
            {header?.colums?.map((colum, index) => {
                return (
                    <View
                        key={index.toString()}
                        style={{
                            flex: Number(header.widthArr[index]) || 1,
                            alignItems: header.alignItems ? header.alignItems[index] : 'flex-start',
                            marginRight: index + 1 !== header.colums.length ? scales(5) : 0,
                        }}
                    >
                        <Text style={styles.labelHeader} numberOfLines={2}>{upperFirst(colum)}</Text>
                    </View>
                )
            })}
        </View>
    )
}

export default React.memo(HeaderHistory, (prev, next) => {
    return isEqual(prev.header.colums, next.header.colums)
        && isEqual(prev.header.widthArr, next.header.widthArr)
        && isEqual(prev.header.alignItems, next.header.alignItems);
});

const styles = StyleSheet.create({
    headerList: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scales(8),
        paddingVertical: scales(10),
        backgroundColor: Colors.color_199744,
        minHeight: scales(40),
    },
    labelHeader: {
        ...Fonts.w400,
        fontSize: scales(14),
        lineHeight: scales(20),
        color: Colors.color_FFFFFF,
        textAlign: 'center',
    },
});
