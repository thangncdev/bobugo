import { StyleSheet, Text, View } from 'react-native';

import { useSetting } from 'contexts/SettingProvider';
import { stringToFloat } from 'modules/walletDetail/src/utils';
import { Colors } from 'themes';
import TextStyles from 'themes/textStyles';
import scales from 'utils/scales';

interface Props {
    portfolio: walletDetail.PortfolioData & FlatListLoadData,
}

const PortfolioPercent = (props: Props) => {
    const { t } = useSetting();

    const { portfolio } = props;

    const _percentToken = portfolio?.percenter_token || '0%';
    const _percentNft = portfolio?.percenter_nft || '0%';

    const getPercentValue = (percent: string) => {
        if (!percent) {
            return 0;
        }

        const percentValue = percent.replace('%', '');
        const floatNumber = stringToFloat(percentValue)

        if (floatNumber === 0) {
            return 0;
        } else {
            return (floatNumber / 100);
        }
    }

    const renderTitle = () => (
        <View style={styles.rowBetween}>
            <Text style={[styles.tokenNFT, { marginRight: scales(16) }]}>{t('tokens')} {`(${_percentToken})`}</Text>
            <Text style={styles.tokenNFT}>{t('nfts')}  {`(${_percentNft})`}</Text>
        </View>
    );

    const renderPercent = () => {
        const percentToken = getPercentValue(_percentToken);
        const percentNft = getPercentValue(_percentNft);

        return (
            <View style={styles.percentContainer}>
                <View style={styles.radiusContainer}>
                    {!percentToken && !percentNft ? <View style={styles.percentNull} /> : null}
                    {percentToken !== 0 ? (
                        <View style={[styles.tokensPercent, { flex: percentToken }]}  />
                    ) : null}
                    {percentNft !== 0 ? (
                        <View style={[styles.nftsPercent, { flex: percentNft }]}  />
                    ) : null}
                </View>
            </View>
        )
    };

    return (
        <View style={styles.container}>
            {renderTitle()}
            {renderPercent()}
        </View>
    )
};
export default PortfolioPercent;

const styles = StyleSheet.create({
    container: {
        width: scales(244),
        marginBottom: scales(24),
        marginHorizontal: scales(18),
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tokenNFT: {
        ...TextStyles.ToolTip,
        color: Colors.color_5E626F,
    },
    percent: {
        ...TextStyles.ToolTip,
        color: Colors.color_090F24,
        marginRight: scales(16),
    },
    percentContainer: {
        marginTop: scales(4),
        borderRadius: scales(100),
        width: scales(244),
        height: scales(14),
        overflow: 'hidden',
    },
    percentNull: {
        flex: 1,
        backgroundColor: Colors.color_A2A4AA,
    },
    tokensPercent: {
        backgroundColor: Colors.color_199744,
    },
    nftsPercent: {
        backgroundColor: Colors.color_FFCC00,
    },
    radiusContainer: {
        flex: 1,
        flexDirection: 'row',
    },
});
