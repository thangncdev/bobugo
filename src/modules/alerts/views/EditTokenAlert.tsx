import { RouteProp } from '@react-navigation/native';
import BigNumber from 'bignumber.js';
import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';

import { TouchableOpacity } from 'components/base';
import GradientButton from 'components/button/GradientButton';
import Header from 'components/header/Header';
import InputNumber from 'components/input/InputNumber';
import { useSetting } from 'contexts/SettingProvider';
import { alertActionCreators } from 'modules/alerts/src/action';
import { CurrencyUnit } from 'modules/markets/src/constants';
import { RootNavigatorParamList } from 'modules/navigation/typings';
import { Colors, Fonts, Sizes } from 'themes';
import scales from 'utils/scales';

interface RouteProps {
    route: RouteProp<RootNavigatorParamList, 'EditTokenAlert'>;
}

interface DispatchProps {
    editTokenAlert: typeof alertActionCreators.editTokenAlert;
}

type EditTokenAlertScreenProps = RouteProps & DispatchProps;

const EditTokenAlertScreen = (props: EditTokenAlertScreenProps) => {
    const { t } = useSetting();
    const { editTokenAlert } = props;
    const { params } = props?.route;
    const item = params?.item;
    const newPriceADA = item?.price.toString();
    const newPriceUSD = item?.price_usd.toString();

    const [price, setPrice] = useState<string>(newPriceADA || '');
    const [note, setNote] = useState<string>(item?.note ?? '');
    const [priceError, setPriceError] = useState<string>('');

    const onValidate = () => {
        if (!price) {
            setPriceError(t('field_required'));
            return false;
        } else if (new BigNumber(price).isZero()) {
            setPriceError(t('price_invalid'));
            return false;
        }
        return true;
    };

    const handleSetPrice = (text: string) => {
        setPrice(text);
        setPriceError('');
    };

    const handleAddAlertToken = () => {
        if (!onValidate()) {
            return;
        }
        editTokenAlert({
            id: item?.id,
            note: note || '',
            price: Number(price),
        });
    };

    return (
        <TouchableOpacity activeOpacity={1} style={styles.container} onPress={Keyboard.dismiss}>
            <Header title={item?.name} styleTitle={styles.title} />
            <View style={styles.content}>
                <View style={styles.btnAlert}>
                    <Text style={styles.textAlert}>{t('alerts_by')}</Text>
                </View>
                <View style={styles.viewInputPrice}>
                    <Text style={styles.whenPrice}>{t('when_price')}</Text>
                    <InputNumber
                        style={styles.inputPrice}
                        inputContainerStyles={styles.inputContainerstyle}
                        value={price}
                        onChangeText={handleSetPrice}
                        contextMenuHidden
                        numberOfLines={2}
                        errorMessage={priceError}
                        onFocus={() => setPriceError('')}
                    />
                    <View style={styles.viewCurrency}>
                        <Text style={styles.textCurrency}>{CurrencyUnit.ADA.toUpperCase()}</Text>
                    </View>
                </View>
                <KeyboardAvoidingView
                    behavior={'position'}
                    style={styles.viewInputNote}
                    keyboardVerticalOffset={-scales(30)}
                >
                    <View style={styles.viewInputNote}>
                        <TextInput
                            placeholder={t('note')}
                            style={styles.noteInput}
                            placeholderTextColor={Colors.color_090F24}
                            value={note}
                            onChangeText={setNote}
                        />
                    </View>
                </KeyboardAvoidingView>
                <Text style={styles.textCurrent}>
                    {t('current_price')}
                    <Text style={styles.price}> USD{newPriceUSD}</Text>
                </Text>
            </View>

            <View style={styles.btnBottom}>
                <GradientButton title={t('set_price')} onPress={handleAddAlertToken} />
            </View>
        </TouchableOpacity>
    );
};

const mapDispatchToProps = {
    editTokenAlert: alertActionCreators.editTokenAlert,
};

export default connect<undefined, DispatchProps>(undefined, mapDispatchToProps)(EditTokenAlertScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.color_FFFFFF,
    },
    btnAlert: {
        paddingVertical: scales(8),
        paddingHorizontal: scales(32),
        borderRadius: scales(5),
        backgroundColor: Colors.color_199744,
        marginTop: scales(24),
        marginBottom: Sizes.screenHeight * 0.1,
    },
    textAlert: {
        ...Fonts.w500,
        fontSize: scales(14),
        color: Colors.color_E9EAEC,
    },
    content: {
        flex: 1,
        alignItems: 'center',
    },
    viewInputPrice: {
        flex: 1,
        alignItems: 'center',
    },
    whenPrice: {
        ...Fonts.w500,
        fontSize: scales(12),
        color: Colors.color_5E626F,
        textAlign: 'center',
    },
    viewInputNote: {
        flex: 1,
    },
    inputPrice: {
        ...Fonts.w600,
        fontSize: scales(40),
        color: Colors.color_199744,
        textAlign: 'center',
        maxWidth: Sizes.screenWidth - scales(50),
        height: scales(70),
    },
    viewCurrency: {
        borderRadius: scales(5),
        paddingVertical: scales(2),
        paddingHorizontal: scales(12),
        backgroundColor: Colors.color_199744,
        marginTop: scales(24),
    },
    textCurrency: {
        ...Fonts.w400,
        fontSize: scales(12),
        color: Colors.color_FFFFFF,
    },
    textCurrent: {
        ...Fonts.w400,
        fontSize: scales(12),
        color: Colors.color_A2A4AA,
        marginBottom: scales(16),
    },
    price: {
        color: Colors.color_090F24,
    },
    btnBottom: {
        marginBottom: scales(20) + Sizes.bottomSpace,
        marginHorizontal: scales(16),
    },
    noteInput: {
        width: Sizes.screenWidth - scales(78),
        paddingVertical: scales(16),
        paddingLeft: scales(16),
        backgroundColor: Colors.color_FFFFFF,
        marginHorizontal: scales(39),
        ...Fonts.w400,
        fontSize: scales(16),
        color: Colors.color_090F24,
        elevation: 1,
        shadowColor: Colors.color_000000,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderRadius: scales(5),
    },
    title: {
        ...Fonts.w500,
        fontSize: scales(14),
        color: Colors.color_090F24,
    },
    inputContainerstyle: {
        borderWidth: 0,
        marginTop: scales(16),
        paddingRight: 0,
        justifyContent: 'center',
    },
});
