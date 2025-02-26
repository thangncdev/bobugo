import { RouteProp } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus, Image, Keyboard, Platform, StyleSheet, Text, View } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { connect, useSelector } from 'react-redux';

import Images from 'assets/images';
import Svgs from 'assets/svgs';
import { TouchableOpacity } from 'components/base';
import GradientButton from 'components/button/GradientButton';
import Header from 'components/header/Header';
import { useSetting } from 'contexts/SettingProvider';
import { onAppleButtonPress, onGoogleButtonPress } from 'modules/login/src/utils';
import { masterdataSupportWebsiteSelector } from 'modules/masterdata/src/selectors';
import { navigate } from 'modules/navigation/src/utils';
import { RootNavigatorParamList } from 'modules/navigation/typings';
import { verificationActionCreators } from 'modules/verification/src/actions';
import { goToWebView } from 'modules/webview/src/utils';
import { Colors, Fonts, Sizes } from 'themes';
import scales from 'utils/scales';

const CELL_COUNT = 6;
const DURATION = 90;

interface VerificationRouteProps {
    route: RouteProp<RootNavigatorParamList, 'Verification'>;
}

interface VerificationDispatchProps {
    resendCode: typeof verificationActionCreators.resendCode;
    activeCustomer: typeof verificationActionCreators.activeCustomer;
}

type VerificationScreenProps = VerificationRouteProps & VerificationDispatchProps;

const VerificationScreen = (props: VerificationScreenProps) => {
    const { t } = useSetting();

    const { resendCode, activeCustomer, route } = props;
    const { params } = route;

    const [value, setValue] = useState<string>('');
    const [valueFailure, setValueFailure] = useState<boolean>(false);
    const [countdown, setCountdown] = useState<number>(DURATION);

    const appState = useRef<AppStateStatus>(AppState.currentState);
    const countdownRef = useRef<number>(DURATION);
    const timeRef = useRef<number>(0);

    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [propsCode, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });
    const masterdataSupportWebsite = useSelector(masterdataSupportWebsiteSelector);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (countdownRef.current !== 0) {
                setCountdown(prevSeconds => Math.max(0, prevSeconds - 1));
                countdownRef.current = Math.max(0, countdownRef.current - 1);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                const diff = moment().unix() - timeRef.current;
                setCountdown(countdownRef.current - diff);
                timeRef.current = 0;
            } else if (
                appState.current === 'active' &&
                nextAppState.match(/inactive|background/)
            ) {
                timeRef.current = moment().unix();
            }

            appState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    }, []);

    const renderHeader = () => <Header title={t('verification')} />;

    const renderDescription = () => (
        <Text style={styles.description}>
            {`${t('enter_verification')} `}
            <Text style={styles.descriptionHighlight}>{t('didnt_receive_code')}</Text>
        </Text>
    );

    const renderResend = () => {
        const disableResend = countdown !== 0;

        return (
            <View style={styles.resend}>
                <TouchableOpacity style={styles.resendButton} onPress={onResendCode} disabled={disableResend}>
                    <Svgs.IcLoop width={scales(16)} height={scales(16)} color={disableResend ? Colors.color_A2A4AA : Colors.color_199744} />
                    <Text style={[styles.resendText, { color: disableResend ? Colors.color_A2A4AA : Colors.color_199744 }]}>
                        {t('return')}
                    </Text>
                </TouchableOpacity>
                {disableResend ? <Text style={styles.countdownText}>{`${countdown}s`}</Text> : null}
            </View>
        );
    }

    const onResendCode = () => {
        resendCode({ username: params?.username });
        setCountdown(DURATION);
        countdownRef.current = DURATION;
    }

    const renderInput = () => (
        <CodeField
            ref={ref}
            {...propsCode}// Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
            onChangeText={handleChangeCode}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType='number-pad'
            textContentType='oneTimeCode'
            renderCell={renderCell}
            onFocus={() => setValueFailure(false)}
        />
    );

    const handleChangeCode = (code) => {
        setValue(code);
        if (code && code.length === CELL_COUNT) {
            Keyboard.dismiss();
            onSubmit(code);
        }
    };

    const renderCell = ({ index, symbol, isFocused }) => (
        <View
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
        >
            <Text style={[styles.textCell, valueFailure ? { color: Colors.color_CC0A00 } : {}]}>
                {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
        </View>
    );

    const renderSubmit = () => (
        <GradientButton
            title={t('send')}
            onPress={onSubmit}
            customStyles={styles.button}
            disabled={value.length < 6}
        />
    );

    const onSubmit = (code: string = value) => {
        const payload = {
            username: params?.username,
            verifi_code: Number(code),
            onActiveFailure,
        };
        activeCustomer(payload);
    };

    const onActiveFailure = () => setValueFailure(true);

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
            {renderResend()}
            {renderInput()}
            {renderSubmit()}
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
};

const mapDispatchToProps = {
    resendCode: verificationActionCreators.resendCode,
    activeCustomer: verificationActionCreators.activeCustomer,
};

export default connect<undefined, VerificationDispatchProps>(
    undefined,
    mapDispatchToProps,
)(VerificationScreen);

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
        marginBottom: scales(8),
        alignSelf: 'center',
    },
    description: {
        textAlign: 'center',
        ...Fonts.w400,
        fontSize: scales(14),
        color: Colors.color_5E626F,
    },
    descriptionHighlight: {
        color: Colors.color_090F24,
    },
    resend: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: scales(12),
        alignItems: 'center',
    },
    resendButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    resendText: {
        ...Fonts.w500,
        fontSize: scales(14),
        paddingLeft: scales(6),
    },
    countdownText: {
        ...Fonts.w400,
        fontSize: scales(14),
        color: Colors.color_CC0A00,
        paddingLeft: scales(8),
    },
    codeFieldRoot: {
        marginTop: scales(14),
    },
    cell: {
        width: (Sizes.screenWidth - scales(148)) / CELL_COUNT,
        height: scales(40),
        marginHorizontal: scales(4),
        overflow: 'hidden',
        borderBottomWidth: scales(4),
        borderBottomColor: Colors.color_A1AFC3,
    },
    focusCell: {
        borderBottomWidth: scales(4),
        borderBottomColor: Colors.color_199744,
    },
    textCell: {
        ...Fonts.w700,
        lineHeight: scales(34),
        fontSize: 24,
        textAlign: 'center',
        color: Colors.color_090F24,
    },
    button: {
        marginTop: scales(32),
        marginBottom: scales(16),
        width: Sizes.screenWidth - scales(100),
        backgroundColor: Colors.color_199744,
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
})
