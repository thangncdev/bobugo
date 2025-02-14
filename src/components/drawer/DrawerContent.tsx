import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import Images from 'assets/images';
import ButtonHorizontal from 'components/button/ButtonHorizontal';
import { useSetting } from 'contexts/SettingProvider';
import { masterdataSupportWebsiteSelector } from 'modules/masterdata/src/selectors';
import { navigate } from 'modules/navigation/src/utils';
import { isLoginSelector } from 'modules/user/src/selectors';
import { goToWebView } from 'modules/webview/src/utils';
import { Colors, Sizes } from 'themes';
import scales from 'utils/scales';

const DrawerContent = () => {
    const { t } = useSetting();

    const isLogin: boolean = useSelector(isLoginSelector);
    const masterdataSupportWebsite = useSelector(masterdataSupportWebsiteSelector);

    const renderHeader = () => <Image source={Images.LOGO_BB_APP} style={styles.logo} />;

    const renderAuth = () => {
        const title = isLogin ? 'profile' : 'sign_in';

        return <ButtonHorizontal icon={'profile'} title={t(title)} onPress={onAuth} />;
    };

    const onAuth = () => {
        global.hideDrawer();
        if (isLogin) {
            navigate('Profile');
        } else {
            navigate('Login');
        }
    };

    const renderNews = () => <ButtonHorizontal icon={'newsIspo'} title={t('news_ispo')} onPress={goToNews} />;

    const goToNews = () => {
        global.hideDrawer();
        navigate('News');
    };

    const goToSetting = () => {
        global.hideDrawer();
        navigate('Settings');
    };

    const renderWebsite = () => <ButtonHorizontal icon={'website'} title={t('website')} onPress={openWebsite} />;

    const openWebsite = () => {
        global.hideDrawer();
        goToWebView(t('website'), masterdataSupportWebsite.link_website);
    };

    const renderContactUs = () => (
        <ButtonHorizontal icon={'community'} title={t('contact_us')} onPress={openContactUs} />
    );

    const openContactUs = () => {
        global.hideDrawer();
        goToWebView(t('website'), masterdataSupportWebsite.link_contact_us);
    };

    const renderTerms = () => <ButtonHorizontal icon={'terms'} title={t('terms_of_use')} onPress={openTermsOfUse} />;

    const openTermsOfUse = () => {
        global.hideDrawer();
        goToWebView(t('terms_of_use'), masterdataSupportWebsite.link_teams_of_use);
    };

    const renderPrivacyPolicy = () => (
        <ButtonHorizontal icon={'privacy'} title={t('privacy_policy')} onPress={openPrivacyPolicy} />
    );

    const openPrivacyPolicy = () => {
        global.hideDrawer();
        goToWebView(t('privacy_policy'), masterdataSupportWebsite.link_privacy_policy);
    };

    const renderSettings = () => <ButtonHorizontal icon={'settings'} title={t('settings')} onPress={goToSetting} />;

    const renderBreakLine = () => <View style={styles.breakLine} />;

    const renderContent = () => (
        <View style={styles.content}>
            {renderAuth()}
            {renderBreakLine()}
            {renderNews()}
            {renderWebsite()}
            {renderContactUs()}
            {renderTerms()}
            {renderPrivacyPolicy()}
            {renderBreakLine()}
            {renderSettings()}
        </View>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderContent()}
        </View>
    );
};

export default DrawerContent;

const styles = StyleSheet.create({
    container: {
        paddingTop: scales(16),
    },
    logo: {
        width: scales(130),
        height: scales(60),
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    content: {
        paddingLeft: scales(32),
        paddingTop: scales(4),
    },
    breakLine: {
        width: Sizes.screenWidth - scales(85) - scales(32) - scales(54),
        height: scales(1),
        backgroundColor: Colors.color_5E626F,
        marginVertical: scales(12),
    },
});
