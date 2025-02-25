import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Config from 'react-native-config';

import { useSelector } from 'react-redux';

import Images from 'assets/images';
import Button from 'components/button/Button';
import Checkbox from 'components/checkbox/Checkbox';
import { useSetting } from 'contexts/SettingProvider';
import { masterdataSupportWebsiteSelector } from 'modules/masterdata/src/selectors';
import { resetStack } from 'modules/navigation/src/utils';
import { goToWebView } from 'modules/webview/src/utils';
import { Colors, Sizes } from 'themes';
import TextStyles from 'themes/textStyles';
import scales from 'utils/scales';
import Storages, { KeyStorage } from 'utils/storages';
import GradientButton from 'components/button/GradientButton';

const OnboardingScreen = () => {
    const { t } = useSetting();

    const [agree, setAgree] = useState<boolean>(false);
    const masterdataSupportWebsite = useSelector(masterdataSupportWebsiteSelector);
    const onToggle = () => setAgree(!agree);

    const openTermsPrivacy = () => {
        goToWebView(t('terms_n_privacy'), masterdataSupportWebsite.link_teams_of_use);
    };

    const sendMailSupport = () => { };

    const handleContinue = () => {
        Storages.set(KeyStorage.AgreedTermsPrivacy, 'true').catch();
        resetStack('Main');
    };

    const renderLogoApp = () => <Image source={Images.LOGO_BB_APP} style={styles.image} resizeMode="contain" />;

    const renderTextAgree = () => (
        <>
            <Text style={styles.continueDesTextWarp}>
                <Text style={TextStyles.Body2}>{t('to_continue_use_app')}</Text>
                <Text style={{ ...TextStyles.SubTitle3, color: Colors.color_199744 }} onPress={openTermsPrivacy}>
                    {' '}
                    {t('terms_and_privacy')}
                </Text>
            </Text>
        </>
    );

    const renderArrgeAndContinue = () => (
        <>
            <View style={styles.arrgeWarp}>
                <Checkbox value={agree} onToggle={onToggle} />
                <Text style={{ textAlign: 'left', marginLeft: scales(16) }}>
                    <Text style={TextStyles.Body2}>{t('read_and_agree')}</Text>
                    <Text style={{ ...TextStyles.SubTitle3, color: Colors.color_199744 }} onPress={openTermsPrivacy}>
                        {' '}
                        {t('terms_and_privacy')}
                    </Text>
                </Text>
            </View>
            <GradientButton
                onPress={handleContinue}
                disabled={!agree}
                customStyles={styles.button}
                height={scales(40)}
                width={Sizes.screenWidth - scales(100)}
                title={t('continue')}
            />
        </>
    );

    const renderSupportEmail = () => (
        <Text style={{ textAlign: 'center', marginTop: scales(32) }}>
            <Text style={TextStyles.Body2}>{t('if_question')} </Text>
            <Text style={{ ...TextStyles.SubTitle3, color: Colors.color_199744 }} onPress={sendMailSupport}>
                {' '}
                {masterdataSupportWebsite?.EMAIL_SUPPORT}
            </Text>
        </Text>
    );

    return (
        <View style={styles.container}>
            {renderLogoApp()}
            {renderTextAgree()}
            {renderArrgeAndContinue()}
            {renderSupportEmail()}
        </View>
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: scales(100),
        paddingHorizontal: scales(40),
        backgroundColor: Colors.color_FFFFFF,
    },
    image: {
        width: scales(256),
        height: scales(108),
    },
    continueDesTextWarp: {
        marginTop: scales(27),
        marginBottom: scales(44),
        textAlign: 'center',
    },
    arrgeWarp: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    button: {
        borderRadius: scales(50),
        marginTop: scales(16),
    },
});
