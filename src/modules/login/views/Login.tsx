import { RouteProp } from '@react-navigation/native';
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
import { RootNavigatorParamList } from 'modules/navigation/typings';
import { userActionCreators } from 'modules/user/src/actions';
import { goToWebView } from 'modules/webview/src/utils';
import { Colors, Fonts, Sizes } from 'themes';
import scales from 'utils/scales';
import Storages, { KeyStorage } from 'utils/storages';
import { validateEmail } from 'utils/string';

interface LoginRouteProps {
    route: RouteProp<RootNavigatorParamList, 'Login'>;
}

interface LoginDispatchProps {
    login: typeof userActionCreators.login;
}

type LoginScreenProps = LoginRouteProps & LoginDispatchProps;

const LoginScreen = (props: LoginScreenProps) => {
    const { t } = useSetting();
    const { login, route } = props;
    const { params } = route;

    const [email, setEmail] = useState<string>('');
    const [errorEmail, setErrorEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorPassword, setErrorPassword] = useState<string>('');
    const [securePassword, setSecurePassword] = useState<boolean>(true);
    const masterdataSupportWebsite = useSelector(masterdataSupportWebsiteSelector);

    useEffect(() => {
        getEmailDefault();
    }, []);

    const getEmailDefault = () => {
        Storages.get(KeyStorage.LastEmailLogin).then((mail) => {
            setEmail(mail || '');
        });
    };

    useEffect(() => {
        setErrorEmail('');
    }, [email]);

    useEffect(() => {
        setErrorPassword('');
    }, [password]);

    const renderHeader = () => <Header title={t('sign_in')} />;

    const renderInputUsername = () => (
        <Input
            value={email}
            onChangeText={setEmail}
            placeholder={t('email')}
            errorMessage={errorEmail}
            onFocus={() => setErrorEmail('')}
        />
    );

    const renderInputPassword = () => {
        const Icon = Svgs[`IcEye${securePassword ? 'Off' : ''}`];

        return (
            <Input
                value={password}
                onChangeText={setPassword}
                placeholder={t('password')}
                secureTextEntry={securePassword}
                inputContainerStyles={{ marginTop: scales(16) }}
                icon={<Icon width={scales(16)} height={scales(16)} />}
                onPressIcon={onToggleSecurePassword}
                errorMessage={errorPassword}
                onFocus={() => setErrorPassword('')}
            />
        );
    };

    const onToggleSecurePassword = () => setSecurePassword(!securePassword);

    const renderButtonSignIn = () => <GradientButton title={t('sign_in')} onPress={onLogin} customStyles={styles.button} />;

    const onValidate = () => {
        let valid = true;
        if (!email.trim()) {
            valid = false;
            setErrorEmail(t('field_required'));
        } else if (!validateEmail(email.trim())) {
            valid = false;
            setErrorEmail(t('incorrect_email'));
        }

        if (!password) {
            valid = false;
            setErrorPassword(t('field_required'));
        }

        return valid;
    };

    const onLogin = () => {
        if (!onValidate()) {
            return;
        }
        const payload: login.LoginRequest = {
            username: email.trim().toLowerCase(),
            password,
            onLoginSuccess: params?.onLoginSuccess,
        };
        login(payload);
    };

    const renderSignUp = () => (
        <TouchableOpacity style={{ alignSelf: 'center' }} onPress={goToSignUp}>
            <Text style={styles.textBelowButton}>{t('no_account_create_one')}</Text>
        </TouchableOpacity>
    );

    const goToSignUp = () => navigate('Register');

    const renderForgotPassword = () => (
        <TouchableOpacity style={styles.belowButton} onPress={goToForgotPassword}>
            <Text style={styles.textBelowButton}>{t('forgot_password')}?</Text>
        </TouchableOpacity>
    );

    const goToForgotPassword = () => navigate('ForgotPassword');

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
            {renderInputUsername()}
            {renderInputPassword()}
            {renderButtonSignIn()}
            {renderSignUp()}
            {renderForgotPassword()}
            {renderOr()}
            {renderLoginGG()}
            {Platform.OS === 'ios' ? renderLoginApple() : null}
            <View style={{ flex: 1 }} />
            {renderTerms()}
        </View>
    );

    return (
        <TouchableOpacity style={styles.container} activeOpacity={1} onPress={Keyboard.dismiss}>
            {renderHeader()}
            {renderContent()}
        </TouchableOpacity>
    );
};

const mapDispatchToProps = {
    login: userActionCreators.login,
};

export default connect<undefined, LoginDispatchProps>(undefined, mapDispatchToProps)(LoginScreen);

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
        marginBottom: scales(25),
        alignSelf: 'center',
    },
    button: {
        marginTop: scales(40),
        marginBottom: scales(16),
        width: Sizes.screenWidth - scales(100),
        paddingVertical: scales(10),
        paddingHorizontal: scales(20),
        borderRadius: scales(50),
    },
    belowButton: {
        alignSelf: 'center',
        marginVertical: scales(8),
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
