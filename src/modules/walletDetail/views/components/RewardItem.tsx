import { StyleSheet, Text, View } from 'react-native';

import HeaderView from 'modules/markets/views/components/HeaderView';
import { Colors, Fonts } from 'themes';
import scales from 'utils/scales';
import { getHeader } from 'utils/string';

interface RewardItemProps {
    item: walletDetail.RewardItem;
    header: masterdata.NftHeader;
}

const RewardItem = (props: RewardItemProps) => {
    const { item, header } = props;

    const renderReward = () => {
        const split = item?.colums[2].split('\n') || ['', ''];

        return (
            <HeaderView
                flex={Number(header.widthArr[2])}
                alignItems={getHeader(header, 'alignItems', 2)}
            >
                <Text style={styles.rewards}>
                    {split[0]}
                </Text>
                <Text style={styles.time}>
                    {split[1]}
                </Text>
            </HeaderView>
        );
    };

    return (
        <View style={styles.container} >
            <HeaderView
                flex={Number(header.widthArr[0])}
                alignItems={getHeader(header, 'alignItems', 0)}
                marginRight={scales(5)}
            >
                <Text style={styles.epoch}>
                    {props.item.colums[0]}
                </Text>
            </HeaderView>
            <HeaderView
                flex={Number(header.widthArr[1])}
                alignItems={getHeader(header, 'alignItems', 1)}
                marginRight={scales(5)}
            >
                <Text style={styles.epoch} numberOfLines={2}>
                    {props.item.colums[1]}
                </Text>
            </HeaderView>
            {renderReward()}
        </View>
    );
}

export default RewardItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: scales(4),
        paddingBottom: scales(8),
        borderBottomWidth: scales(1),
        borderBottomColor: Colors.color_A2A4AA,
        paddingHorizontal: scales(16),
    },
    epoch: {
        ...Fonts.w500,
        fontSize: scales(12),
        lineHeight: scales(16),
        color: Colors.color_090F24,
    },
    rewards: {
        ...Fonts.w500,
        fontSize: scales(12),
        lineHeight: scales(14),
        color: Colors.color_199744,
        textAlign: 'right',
        paddingBottom: scales(2),
    },
    time: {
        ...Fonts.w500,
        fontSize: scales(10),
        lineHeight: scales(14),
        color: Colors.color_A2A4AA,
        textAlign: 'right',
    },
})
