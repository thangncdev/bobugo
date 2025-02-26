import { RouteProp } from '@react-navigation/native';
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
import { RootNavigatorParamList } from 'modules/navigation/typings';
import { atLeastOneDigit, atLeastOneLetter, atLeastOneSpecialCharacter, minimum8Characters } from 'modules/register/src/utils';
import { userActionCreators } from 'modules/user/src/actions';
import { goToWebView } from 'modules/webview/src/utils';
import { Colors, Fonts, Sizes } from 'themes';
import scales from 'utils/scales';

interface RouteProps {
    route: RouteProp<RootNavigatorParamList, 'UpdatePassword'>;
}

interface DispatchProps {
    forgotPasswordUpdate: typeof userActionCreators.forgotPasswordUpdate;
}

type UpdatePasswordScreenProps = RouteProps & DispatchProps;

const UpdatePasswordScreen = (props: UpdatePasswordScreenProps) => {
    const { t } = useSetting();
    const { route, forgotPasswordUpdate } = props;
    const { params } = route;

    const [code, setCode] = useState<string>('');
    const [errorCode, setErrorCode] = useState<string>('');

    const [newPassword, setNewPassword] = useState<string>('');
    const [errorNewPassword, setErrorNewPassword] = useState<string>('');
    const [secureNewPassword, setSecureNewPassword] = useState<boolean>(true);

    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState<string>('');
    const [secureConfirmPassword, setSecureConfirmPassword] = useState<boolean>(true);
    const masterdataSupportWebsite = useSelector(masterdataSupportWebsiteSelector);

    const isPasswordValid = (_password: string) => {
        return minimum8Characters(_password)
            && atLeastOneLetter(_password)
            && atLeastOneDigit(_password)
            && atLeastOneSpecialCharacter(_password);
    };

    useEffect(() => {
        setErrorCode('');
    }, [code]);

    useEffect(() => {
        setErrorNewPassword('');
    }, [newPassword]);

    useEffect(() => {
        setErrorConfirmPassword('');
    }, [confirmPassword]);

    const renderHeader = () => <Header title={t('change_password')} />;

    const renderInputCode = () => {
        return (
            <Input
                value={code}
                onChangeText={setCode}
                placeholder={t('enter_code')}
                inputContainerStyles={{ marginTop: scales(16) }}
                errorMessage={errorCode}
                onFocus={() => setErrorCode('')}
                keyboardType={'number-pad'}
                maxLength={6}
            />
        );
    }

    const renderInputNewPassword = () => {
        const Icon = Svgs[`IcEye${secureNewPassword ? 'Off' : ''}`];

        return (
            <Input
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder={t('new_password')}
                secureTextEntry={secureNewPassword}
                inputContainerStyles={{ marginTop: scales(16) }}
                icon={<Icon width={scales(16)} height={scales(16)} />}
                onPressIcon={onToggleSecureNewPassword}
                errorMessage={errorNewPassword}
                onFocus={() => setErrorNewPassword('')}
                displayErrorOnField={Boolean(!isPasswordValid(newPassword) && newPassword.trim())}
            />
        );
    }

    const onToggleSecureNewPassword = () => setSecureNewPassword(!secureNewPassword);

    const renderInputConfirmPassword = () => {
        const Icon = Svgs[`IcEye${secureNewPassword ? 'Off' : ''}`];

        return (
            <Input
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder={t('retype_password')}
                secureTextEntry={secureConfirmPassword}
                inputContainerStyles={{ marginTop: scales(16) }}
                icon={<Icon width={scales(16)} height={scales(16)} />}
                onPressIcon={onToggleSecureConfirmPassword}
                errorMessage={errorConfirmPassword}
                onFocus={() => setErrorConfirmPassword('')}
            />
        );
    }

    const onToggleSecureConfirmPassword = () => setSecureConfirmPassword(!secureConfirmPassword);

    const getColorCondition = (validate: register.ValidatePassword): string => {
        if (!newPassword) {
            return Colors.color_090F24;
        } else {
            return !validate(newPassword) ? Colors.color_CC0A00 : Colors.color_199744;
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
    );

    const renderButtonChangePassword = () => (
        <GradientButton
            title={t('send')}
            onPress={onChangePassword}
            customStyles={styles.button}
        />
    );

    const onValidate = () => {
        let valid = true;

        if (!code) {
            valid = false;
            setErrorCode(t('field_required'));
        } else if (code.length < 6) {
            valid = false;
            setErrorCode(t('code_must_be_6'));
        }

        if (!newPassword) {
            valid = false;
            setErrorNewPassword(t('field_required'));
        }

        if (!confirmPassword) {
            valid = false;
            setErrorConfirmPassword(t('field_required'));
        } else if (newPassword !== confirmPassword) {
            valid = false;
            setErrorConfirmPassword(t('retype_password_not_match'));
        }

        return valid;
    }

    const onChangePassword = () => {
        if (!onValidate()) {
            return;
        }
        const payload: forgotPassword.ForgotPasswordUpdateRequest = {
            username: params?.username,
            code_reset_password: code,
            password: newPassword,
            re_password: confirmPassword,
        }
        forgotPasswordUpdate(payload);
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
            {renderInputCode()}
            {renderInputNewPassword()}
            {renderInputConfirmPassword()}
            {renderConditions()}
            {renderButtonChangePassword()}
            {renderSignIn()}
            <View style={{ flex: 1 }} />
            {renderTerms()}
        </View>
    );

    return (
        <TouchableOpacity style={styles.container} activeOpacity={1} onPress={Keyboard.dismiss}>
            {renderHeader()}
            {renderContent()}
        </TouchableOpacity>
    )
}

const mapDispatchToProps = {
    forgotPasswordUpdate: userActionCreators.forgotPasswordUpdate,
};

export default connect<undefined, DispatchProps>(
    undefined,
    mapDispatchToProps,
)(UpdatePasswordScreen);

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
