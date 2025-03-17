import { includes, indexOf } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, Text, View } from 'react-native';
import { useCameraPermission } from 'react-native-vision-camera';
import { connect } from 'react-redux';

import Svgs from 'assets/svgs';
import { TouchableOpacity } from 'components/base';
import Button from 'components/button/Button';
import GradientButton from 'components/button/GradientButton';
import Header from 'components/header/Header';
import Input from 'components/input/Input';
import { useSetting } from 'contexts/SettingProvider';
import { goBack } from 'modules/navigation/src/utils';
import { portfolioActionCreators } from 'modules/portfolio/src/action';
import { handleCheckPermission } from 'modules/portfolio/src/utils';
import { Colors, Fonts } from 'themes';
import scales from 'utils/scales';

type DispatchProps = {
    addPortfolio: typeof portfolioActionCreators.addPortfolio;
};

const AddAddressScreen = (props: DispatchProps) => {
    const { t } = useSetting();
    const { addPortfolio } = props;
    const { hasPermission, requestPermission } = useCameraPermission();

    const [address, setAddress] = useState<string>('');
    const [addressError, setAddressError] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [nameError, setNameError] = useState<string>('');

    useEffect(() => {
        setAddressError('');
    }, [address]);

    useEffect(() => {
        setNameError('');
    }, [name]);

    const validateWallet = () => {
        let valid = true;
        if (!address?.trim()) {
            setAddressError(t('field_required'))
            valid = false;
        }
        // else if (isInvalidAddress(address.trim())) {
        //     setAddressError(t('wallet_invalid'));
        //     valid = false;
        // }

        if (!name?.trim()) {
            setNameError(t('field_required'))
        }

        return valid;
    }

    const handleAddPortfolio = () => {
        if (!validateWallet()) {
            return;
        }
        const payload: portfolio.AddPortfolioRequest = {
            address: address.trim(),
            name: name.trim(),
        };
        addPortfolio(payload);
    };

    const renderHeader = () => <Header title={t('add_address')} />;

    const renderContent = () => (
        <View style={styles.content}>
            {titleContent()}
            {renderInputView()}
            {renderButtonContinue()}
            {viewOr()}
            {renderButtonScan()}
        </View>
    );
    const titleContent = () => <Text style={styles.titleAddAddress}>{t('enter_your_wallet_address')}</Text>;

    const renderInputView = () => (
        <View style={styles.viewInput}>
            <Input
                value={address}
                onChangeText={setAddress}
                placeholder={t('wallet_address')}
                errorMessage={addressError}
                onFocus={() => setAddressError('')}
                style={styles.input}
                inputContainerStyles={styles.inputContainer}
            />
            <View style={{ height: scales(24) }} />
            <Input
                value={name}
                onChangeText={setName}
                placeholder={t('name')}
                errorMessage={nameError}
                onFocus={() => setNameError('')}
                style={styles.input}
                inputContainerStyles={styles.inputContainer}
            />
        </View>
    );

    const renderIconScan = () => <Svgs.IcQR style={styles.iconScan} width={scales(24)} height={scales(24)} />;

    const renderButtonContinue = () => (
        <GradientButton title={t('continue')} customStyles={styles.buttonContinue} onPress={handleAddPortfolio} />
    );

    const viewOr = () => (
        <View style={styles.viewOr}>
            <Text style={styles.textOr}>{t('or')}</Text>
        </View>
    );

    const renderButtonScan = () => (
        <Button title={t('scan_qr_code')} icon={renderIconScan()} customStyles={styles.buttonScan} onPress={goToScan} />
    );

    const goToScan = async () => {
        await handleCheckPermission(hasPermission, requestPermission, validateScan);
    };

    const validateScan = (value: string) => {
        let qrCode = value.trim();
        if (includes(qrCode, ':')) {
            const index1 = indexOf(qrCode, ':');
            const index2 = indexOf(qrCode, '?');

            if (includes(qrCode, ':') && index2 > index1) {
                qrCode = qrCode.slice(index1 + 1, index2);
            } else {
                qrCode = qrCode.slice(index1 + 1);
            }
        }

        // if (isInvalidAddress(qrCode.trim())) {
        //     showToastError(t('wallet_invalid'));
        //     return;
        // }
        setAddress(qrCode);
        goBack();
    };

    return (
        <TouchableOpacity style={styles.container} activeOpacity={1} onPress={Keyboard.dismiss}>
            {renderHeader()}
            {renderContent()}
        </TouchableOpacity>
    );
};

export default connect<undefined, DispatchProps>(undefined, {
    addPortfolio: portfolioActionCreators.addPortfolio,
})(AddAddressScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.color_FFFFFF,
    },
    content: {
        flex: 1,
        paddingHorizontal: scales(16),
        paddingTop: scales(24),
    },
    buttonScan: {
        backgroundColor: Colors.color_5E626F,
        borderRadius: scales(10),
    },
    iconScan: {
        marginRight: scales(8),
    },
    buttonContinue: {
        marginTop: scales(16),
        borderRadius: scales(10),
    },
    viewOr: {
        marginVertical: scales(8),
        alignContent: 'center',
        justifyContent: 'center',
    },
    textOr: {
        ...Fonts.w400,
        fontSize: scales(14),
        color: Colors.color_090F24,
        textAlign: 'center',
    },
    titleAddAddress: {
        ...Fonts.w700,
        fontSize: scales(16),
        lineHeight: scales(24),
        color: Colors.color_090F24,
        paddingBottom: scales(16),
    },
    input: {
        flex: 1,
        ...Fonts.w500,
        fontSize: scales(14),
        color: Colors.color_090F24,
        height: scales(48),
    },
    inputContainer: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomWidth: scales(1),
        borderColor: Colors.color_A2A4AA,
        height: scales(28),
        paddingRight: 0,
    },
    viewInput: {
        marginBottom: scales(35),
    },
});
