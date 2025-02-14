import { StyleSheet, Text, View } from 'react-native';

import Svgs from 'assets/svgs';
import { TouchableOpacity } from 'components/base';
import { useSetting } from 'contexts/SettingProvider';
import { navigate } from 'modules/navigation/src/utils';
import { Colors } from 'themes';
import TextStyles from 'themes/textStyles';
import scales from 'utils/scales';

const General = () => {
    const { t } = useSetting();

    const navigateAlertsSetting = () => navigate('AlertsSetting');

    return (
        <View>
            <Text style={styles.textGreen}>{t('general')}</Text>
            <TouchableOpacity onPress={navigateAlertsSetting} style={styles.row}>
                <Svgs.IcAlertSetting width={scales(24)} height={scales(24)} />
                <Text style={styles.textBlack}>
                    {t('alerts_settings')}
                </Text>
            </TouchableOpacity>
        </View>
    )
};

export default General;

const styles = StyleSheet.create({
    textGreen: {
        ...TextStyles.SubTitle2,
        color: Colors.color_199744,
        marginVertical: scales(16),

    },
    textBlack: {
        ...TextStyles.SubTitle2,
        color: Colors.color_090F24,
        marginLeft: scales(8),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: scales(16),
    },
    lineVetical: {
        height: scales(24),
        width: scales(1),
        backgroundColor: Colors.color_A2A4AA,
        marginHorizontal: scales(8),
    },
});
