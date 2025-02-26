import React, { useEffect, useState } from 'react';
import { Image, Keyboard, StyleSheet, Text, View } from 'react-native';
import { connect, useSelector } from 'react-redux';

import Images from 'assets/images';
import Svgs from 'assets/svgs';
import { TouchableOpacity } from 'components/base';
import GradientButton from 'components/button/GradientButton';
import Header from 'components/header/Header';
import Input from 'components/input/Input';
import { useSetting } from 'contexts/SettingProvider';
import { masterdataSupportWebsiteSelector } from 'modules/masterdata/src/selectors';
import { navigate } from 'modules/navigation/src/utils';
import { atLeastOneDigit, atLeastOneLetter, atLeastOneSpecialCharacter, minimum8Characters } from 'modules/register/src/utils';
import { userActionCreators } from 'modules/user/src/actions';
import { goToWebView } from 'modules/webview/src/utils';
import { Colors, Fonts, Sizes } from 'themes';
import scales from 'utils/scales';
import { validateEmail } from 'utils/string';

interface RegisterDispatchProps {
    register: typeof userActionCreators.register;
}

type RegisterScreenProps = RegisterDispatchProps;

const RegisterScreen = (props: RegisterScreenProps) => {
    const { t } = useSetting();
    const { register } = props;

    const [email, setEmail] = useState<string>('');
    const [errorEmail, setErrorEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorPassword, setErrorPassword] = useState<string>('');
    const [rePassword, setRePassword] = useState<string>('');
    const [errorRePassword, setErrorRePassword] = useState<string>('');
    const [securePassword, setSecurePassword] = useState<boolean>(true);
    const masterdataSupportWebsite = useSelector(masterdataSupportWebsiteSelector);

    const isPasswordValid = (_password: string) => {
        return minimum8Characters(_password)
            && atLeastOneLetter(_password)
            && atLeastOneDigit(_password)
            && atLeastOneSpecialCharacter(_password);
    };

    useEffect(() => {
        setErrorEmail('');
    }, [email]);

    useEffect(() => {
        setErrorRePassword('');
    }, [rePassword]);

    const renderHeader = () => <Header title={t('sign_up')} />;

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
                displayErrorOnField={Boolean(!isPasswordValid(password) && password)}
            />
        );
    }

    const renderInputRePassword = () => {
        const Icon = Svgs[`IcEye${securePassword ? 'Off' : ''}`];

        return (
            <Input
                value={rePassword}
                onChangeText={setRePassword}
                placeholder={t('retype_password')}
                secureTextEntry={securePassword}
                inputContainerStyles={{ marginTop: scales(16) }}
                icon={<Icon width={scales(16)} height={scales(16)} />}
                onPressIcon={onToggleSecurePassword}
                errorMessage={errorRePassword}
                onFocus={() => setErrorRePassword('')}
            />
        );
    }

    const onToggleSecurePassword = () => setSecurePassword(!securePassword);

    const getColorCondition = (validate: register.ValidatePassword): string => {
        if (!password) {
            return Colors.color_090F24;
        } else {
            return !validate(password) ? Colors.color_CC0A00 : Colors.color_199744;
        }
    }

    const renderConditions = () => (
        <View style={styles.conditions}>
            {renderCondition(t('minimum_8_characters'), minimum8Characters)}
            {renderCondition(t('at_least_one_letter'), atLeastOneLetter)}
            {renderCondition(t('at_least_one_digit'), atLeastOneDigit)}
            {renderCondition(t('at_least_one_special_character'), atLeastOneSpecialCharacter)}
        </View>
    );

    const renderCondition = (title: string, validate: register.ValidatePassword) => (
        <View style={styles.condition}>
            <View style={[styles.headerCondition, { backgroundColor: getColorCondition(validate) }]} />
            <Text style={[styles.textCondition, { color: getColorCondition(validate) }]}>
                {title}
            </Text>
        </View>
    )

    const renderButtonSignUp = () => (
        <GradientButton
            title={t('sign_up')}
            onPress={onRegister}
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

        if (!password) {
            setErrorPassword(t('field_required'));
        }

        if (!rePassword) {
            valid = false;
            setErrorRePassword(t('field_required'));
        } else if (password !== rePassword) {
            valid = false;
            setErrorRePassword(t('retype_password_not_match'));
        }

        return valid;
    }

    const onRegister = () => {
        if (!onValidate()) {
            return;
        }
        const payload: register.RegisterRequest = {
            username: email.trim().toLowerCase(),
            password,
            re_password: rePassword,
        }
        register(payload);
    };

    const renderSignIn = () => (
        <TouchableOpacity style={{ alignSelf: 'center' }} onPress={goToSignIn}>
            <Text style={styles.textBelowButton}>{t('already_account')}</Text>
        </TouchableOpacity>
    );

    const goToSignIn = () => navigate('Login');

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
            {renderInputRePassword()}
            {renderConditions()}
            {renderButtonSignUp()}
            {renderSignIn()}
            <View style={{ flex: 1 }} />
            {renderTerms()}
        </View>
    )

    return (
        <TouchableOpacity style={styles.container} activeOpacity={1} onPress={Keyboard.dismiss}>
            {renderHeader()}
            {renderContent()}
        </TouchableOpacity>
    )
}

const mapDispatchToProps = {
    register: userActionCreators.register,
};

export default connect<undefined, RegisterDispatchProps>(
    undefined,
    mapDispatchToProps,
)(RegisterScreen);

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
    conditions: {
        paddingTop: scales(8),
    },
    condition: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerCondition: {
        width: scales(4),
        height: scales(4),
        borderRadius: scales(2),
    },
    textCondition: {
        ...Fonts.w500,
        fontSize: scales(12),
        paddingLeft: scales(8),
    },
    button: {
        marginTop: scales(40),
        marginBottom: scales(16),
        width: Sizes.screenWidth - scales(100),
        paddingVertical: scales(10),
        paddingHorizontal: scales(20),
        borderRadius: scales(50),
    },
    textBelowButton: {
        ...Fonts.w500,
        fontSize: scales(14),
        color: Colors.color_199744,
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
