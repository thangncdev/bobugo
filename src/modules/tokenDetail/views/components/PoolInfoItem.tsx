import { StyleSheet, Text, View } from 'react-native';

import { Colors } from 'themes';
import TextStyles from 'themes/textStyles';
import scales from 'utils/scales';

interface PoolInfoItemProps {
    title: string;
    value: string;
    lastItem: boolean;
}

const PoolInfoItem = (props: PoolInfoItemProps) => {
    const { title, value, lastItem } = props;

    return (
        <View style={[styles.container, lastItem ? { borderBottomWidth: 0 } : {}]}>
            <Text style={styles.textStyle}>{title}:</Text>
            <Text style={styles.textStyle}>{value}</Text>
        </View>
    )
}

export default PoolInfoItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: scales(36),
        alignItems: 'center',
        borderBottomWidth: scales(1),
        borderBottomColor: Colors.color_090F24,
        marginHorizontal: scales(16),
    },
    textStyle: {
        ...TextStyles.SubTitle3,
        color: Colors.color_090F24,
        flex: 1,
    },
})
