import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import Svgs from 'assets/svgs';
import { TouchableOpacity } from 'components/base';
import { useSetting } from 'contexts/SettingProvider';
import { masterdataSupportWebsiteSelector } from 'modules/masterdata/src/selectors';
import { goToWebView } from 'modules/webview/src/utils';
import { Colors } from 'themes';
import TextStyles from 'themes/textStyles';
import scales from 'utils/scales';

const Info = () => {
    const { t } = useSetting();

    const masterdataSupportWebsite = useSelector(masterdataSupportWebsiteSelector);

    const openWebsite = () => goToWebView(t('website'), masterdataSupportWebsite.link_website);

    const openTermsOfUse = () => goToWebView(t('terms_of_use'), masterdataSupportWebsite.link_teams_of_use);

    const openPrivacyPolicy = () => goToWebView(t('privacy_policy'), masterdataSupportWebsite.link_privacy_policy);

    return (
        <View>
            <Text style={styles.textGreen}>{t('info')}</Text>
            <TouchableOpacity onPress={openWebsite} style={styles.row}>
                <Svgs.IcWebsite width={scales(24)} height={scales(24)} />
                <Text style={styles.textBlack}>
                    {t('website')}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={openTermsOfUse} style={styles.row}>
                <Svgs.IcTermsAndPrivacy width={scales(24)} height={scales(24)} />
                <Text style={styles.textBlack}>
                    {t('terms_of_use')}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openPrivacyPolicy} style={styles.row}>
                <Svgs.IcPrivacyPolicy width={scales(24)} height={scales(24)} />
                <Text style={styles.textBlack}>
                    {t('privacy_policy')}
                </Text>
            </TouchableOpacity>
        </View>
    )
};

export default Info;

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

});
