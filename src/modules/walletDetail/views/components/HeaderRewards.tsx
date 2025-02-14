import { isEqual, upperFirst } from 'lodash';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Colors, Fonts } from 'themes';
import scales from 'utils/scales';

interface Props {
    header: masterdata.NftHeader;
}

const HeaderRewards = (props: Props) => {
    const { header } = props;

    return (
        <>
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
            <LinearGradient
                colors={[Colors.color_000000_10, Colors.transparent]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{ height: scales(8) }}
            />
        </>
    );
}

export default React.memo(HeaderRewards, (prev, next) => {
    return isEqual(prev.header.colums, next.header.colums)
        && isEqual(prev.header.widthArr, next.header.widthArr)
        && isEqual(prev.header.alignItems, next.header.alignItems);
});

const styles = StyleSheet.create({
    headerList: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scales(16),
        height: scales(52),
        backgroundColor: Colors.color_FFFFFF,
    },
    labelHeader: {
        ...Fonts.w500,
        fontSize: scales(14),
        lineHeight: scales(20),
        color: Colors.color_090F24,
        textAlign: 'center',
    },
});
