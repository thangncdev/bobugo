import React, { useEffect, useState } from 'react';
import { Image, Keyboard, Platform, StyleSheet, Text, View } from 'react-native';
import { connect, useSelector } from 'react-redux';

import Images from 'assets/images';
import Svgs from 'assets/svgs';
import { TouchableOpacity } from 'components/base';
import GradientButton from 'components/button/GradientButton';
import Header from 'components/header/Header';
import Input from 'components/input/Input';
import { useSetting } from 'contexts/SettingProvider';
import { onAppleButtonPress, onGoogleButtonPress } from 'modules/login/src/utils';
import { masterdataSupportWebsiteSelector } from 'modules/masterdata/src/selectors';
import { navigate } from 'modules/navigation/src/utils';
import { userActionCreators } from 'modules/user/src/actions';
import { goToWebView } from 'modules/webview/src/utils';
import { Colors, Fonts, Sizes } from 'themes';
import scales from 'utils/scales';
import { validateEmail } from 'utils/string';

interface DispatchProps {
    forgotPassword: typeof userActionCreators.forgotPassword;
}

type ForgotPasswordScreenProps = DispatchProps;

const ForgotPasswordScreen = (props: ForgotPasswordScreenProps) => {
    const { t } = useSetting();
    const { forgotPassword } = props;

    const [email, setEmail] = useState<string>('');
    const [errorEmail, setErrorEmail] = useState<string>('');
    const masterdataSupportWebsite = useSelector(masterdataSupportWebsiteSelector);

    useEffect(() => {
        setErrorEmail('');
    }, [email]);

    const renderHeader = () => <Header title={t('forgot_password')} />;

    const renderDescription = () => (
        <Text style={styles.description}>
            {`${t('forgot_password_guide')} `}
            <Text style={styles.descriptionHighlight}>{t('forgot_password_guide_highlight')}</Text>
        </Text>
    );

    const renderInputUsername = () => (
        <Input
            value={email}
            onChangeText={setEmail}
            placeholder={t('email')}
            errorMessage={errorEmail}
            onFocus={() => setErrorEmail('')}
        />
    );

    const renderButtonSignIn = () => (
        <GradientButton
            title={t('send')}
            onPress={onLogin}
            customStyles={styles.button}
        />
    );

    const onValidate = () => {
        let valid = true;
        if (!email.trim()) {
            valid = false;
            setErrorEmail(t('field_required'));
        } else if (!validateEmail(email.trim())) {
            valid = false;
            setErrorEmail(t('incorrect_email'));
        }

        return valid;
    }

    const onLogin = () => {
        if (!onValidate()) {
            return;
        }
        const payload: forgotPassword.ForgotPasswordRequest = {
            username: email.trim().toLowerCase(),
        }
        forgotPassword(payload);
    };

    const renderSignUp = () => (
        <TouchableOpacity style={{ alignSelf: 'center' }} onPress={goToSignUp}>
            <Text style={styles.textBelowButton}>{t('no_account_create_one')}</Text>
        </TouchableOpacity>
    );

    const goToSignUp = () => navigate('Register');

    const renderOr = () => (
        <View style={styles.or}>
            <View style={styles.viewOr} />
            <Text style={styles.textOr}>OR</Text>
            <View style={styles.viewOr} />
        </View>
    );

    const renderLoginGG = () => (
        <TouchableOpacity style={[styles.socialButton, styles.loginGoogle]} onPress={onGoogleButtonPress}>
            <Svgs.IcGG width={scales(24)} height={scales(24)} />
            <Text style={styles.socialText}>{t('sign_in_gg')}</Text>
        </TouchableOpacity>
    );

    const renderLoginApple = () => (
        <TouchableOpacity style={[styles.socialButton, styles.loginApple]} onPress={onAppleButtonPress}>
            <Svgs.IcApple width={scales(24)} height={scales(24)} />
            <Text style={styles.loginAppleText}>{t('sign_in_apple')}</Text>
        </TouchableOpacity>
    );

    const openTermsOfUse = () => {
        goToWebView(t('terms_n_privacy'), masterdataSupportWebsite.link_teams_of_use);
    };

    const renderTerms = () => (
        <TouchableOpacity style={styles.buttonTerms} onPress={openTermsOfUse}>
            <Text style={styles.textTerms}>{t('terms_n_privacy')}</Text>
        </TouchableOpacity>
    );

    const renderContent = () => (
        <View style={styles.content}>
            <Image source={Images.LOGO_BB_APP} style={styles.image} />
            {renderDescription()}
            {renderInputUsername()}
            {renderButtonSignIn()}
            {renderSignUp()}
            {renderOr()}
            {renderLoginGG()}
            {Platform.OS === 'ios' ? renderLoginApple() : null}
            <View style={{ flex: 1 }} />
            {renderTerms()}
        </View>
    )

    return (
        <TouchableOpacity style={styles.container} activeOpacity={1} onPress={Keyboard.dismiss}>
            {renderHeader()}
            {renderContent()}
        </TouchableOpacity>
    );
}

const mapDispatchToProps = {
    forgotPassword: userActionCreators.forgotPassword,
};

export default connect<undefined, DispatchProps>(
    undefined,
    mapDispatchToProps,
)(ForgotPasswordScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.color_FFFFFF,
        paddingBottom: Sizes.bottomSpace + scales(20),
    },
    content: {
        flex: 1,
        paddingTop: scales(10),
        paddingHorizontal: scales(50),
    },
    image: {
        width: scales(200),
        height: scales(84),
        resizeMode: 'contain',
        marginBottom: scales(7),
        alignSelf: 'center',
    },
    description: {
        textAlign: 'center',
        ...Fonts.w400,
        fontSize: scales(14),
        color: Colors.color_5E626F,
        paddingBottom: scales(34),
    },
    descriptionHighlight: {
        color: Colors.color_090F24,
    },
    button: {
        marginTop: scales(16),
        marginBottom: scales(16),
        width: Sizes.screenWidth - scales(100),
        backgroundColor: Colors.color_199744,
        paddingVertical: scales(10),
        paddingHorizontal: scales(20),
        borderRadius: scales(50),
    },
    textBelowButton: {
        ...Fonts.w500,
        fontSize: scales(14),
        color: Colors.color_199744,
    },
    or: {
        flexDirection: 'row',
        marginVertical: scales(24),
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    viewOr: {
        width: (Sizes.screenWidth - scales(150)) / 2,
        height: scales(1),
        backgroundColor: Colors.color_090F24,
    },
    textOr: {
        ...Fonts.w500,
        fontSize: scales(14),
        color: Colors.color_090F24,
    },
    socialButton: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        paddingVertical: scales(8),
        width: scales(231),
        paddingLeft: scales(32),
    },
    loginApple: {
        marginTop: scales(8),
        backgroundColor: Colors.color_090F24,
        borderRadius: scales(50),
    },
    loginGoogle: {
        marginTop: scales(8),
        borderWidth: 1,
        borderColor: Colors.color_A2A4AA,
        borderRadius: scales(50),
    },
    loginAppleText: {
        ...Fonts.w600,
        fontSize: scales(14),
        color: Colors.color_FFFFFF,
        paddingLeft: scales(8),
    },
    socialText: {
        ...Fonts.w600,
        fontSize: scales(14),
        color: Colors.color_090F24,
        paddingLeft: scales(8),
    },
    buttonTerms: {
        alignSelf: 'center',
    },
    textTerms: {
        ...Fonts.w400,
        fontSize: scales(14),
        color: Colors.color_199744,
        textDecorationLine: 'underline',
    },
});
