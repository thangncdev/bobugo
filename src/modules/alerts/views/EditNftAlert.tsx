import { RouteProp } from '@react-navigation/native';
import BigNumber from 'bignumber.js';
import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import Svgs from 'assets/svgs';
import { Image } from 'components/base';
import Button from 'components/button/Button';
import Checkbox from 'components/checkbox/Checkbox';
import InputNumber from 'components/input/InputNumber';
import { useSetting } from 'contexts/SettingProvider';
import { alertActionCreators } from 'modules/alerts/src/action';
import { CurrencyUnit } from 'modules/markets/src/constants';
import { goBack } from 'modules/navigation/src/utils';
import { RootNavigatorParamList } from 'modules/navigation/typings';
import { Colors, Fonts, Sizes } from 'themes';
import scales from 'utils/scales';

interface RouteProps {
    route: RouteProp<RootNavigatorParamList, 'EditNftAlert'>;
}

interface DispatchProps {
    editNftAlert: typeof alertActionCreators.editNftAlert;
}

type EditNftAlertProps = RouteProps & DispatchProps

const EditNftAlertScreen = (props: EditNftAlertProps) => {
    const { t } = useSetting();
    const { editNftAlert } = props
    const { params } = props?.route
    const item = params?.item as alerts.NftItem;
    const newPriceADA = item?.price;

    const [price, setPrice] = useState<string>(item?.price.toString());
    const [listing, setListing] = useState<string>(item?.listing.toString());
    const [isRecurring, setIsRecurring] = useState<boolean>(item?.repeat === 1)
    const [note, setNote] = useState<string>(item?.note ?? '');
    const [errorPriceMessage, setErrorPriceMessage] = useState<string>('')
    const [errorListingMessage, setErrorListingMessage] = useState<string>('')

    const handleToggle = useCallback(() => setIsRecurring(prev => !prev), [])

    useEffect(() => {
        setErrorPriceMessage('')
    }, [price])

    useEffect(() => {
        setErrorListingMessage('')
    }, [listing])

    const onValidate = () => {
        let valid = true;
        if (!(price || listing)) {
            valid = false;
            setErrorPriceMessage(t('you_need_to'))
            setErrorListingMessage(t('you_need_to'))
        } else {
            if (new BigNumber(price).isZero()) {
                valid = false;
                setErrorPriceMessage(t('price_invalid'))
            }

            if (new BigNumber(listing).isZero()) {
                valid = false;
                setErrorListingMessage(t('price_invalid'))
            }
        }

        return valid;
    }

    const handleAddNftAlert = () => {
        if (!onValidate()) {
            return
        }
        editNftAlert({
            id: item?.id,
            price: price ? Number(price) : 0,
            listing: listing ? Number(listing) : 0,
            note: note || '',
            repeat: isRecurring ? 1 : 0,
        });
    }

    const renderRowInput = (title, value, setValue, errorMessage, setErrorMessage) => (
        <View style={styles.row}>
            <View style={styles.viewTitle}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <InputNumber
                inputContainerStyles={styles.inputContainerStyle}
                inputStyles={styles.input}
                placeholder={title}
                value={value}
                onChangeText={setValue}
                errorMessage={errorMessage}
                keyboardType='numeric'
                onFocus={() => setErrorMessage('')}
            />
        </View>
    )

    const renderHeader = () => (
        <View style={styles.containerHeader}>
            <TouchableOpacity onPress={goBack}>
                <Svgs.IcArrowLeft width={scales(24)} height={scales(24)} />
            </TouchableOpacity>
            <View style={styles.centerHeader}>
                <Image uri={item?.logo ?? ''} style={styles.imageLogo} />
                <View style={{ justifyContent: 'center' }}>
                    <Text numberOfLines={1} style={styles.titleHeader}>
                        {item?.name?.trim()}
                    </Text>
                </View>
            </View>
        </View>
    );

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={styles.container}
            onPress={Keyboard.dismiss}
        >
            {renderHeader()}
            <View style={styles.content}>
                <Text style={styles.textFollow}> {t('follow_price')}: {newPriceADA}{CurrencyUnit.ADA.toUpperCase()}</Text>
                {renderRowInput(t('price'), price, setPrice, errorPriceMessage, setErrorPriceMessage)}
                {renderRowInput(t('listing'), listing, setListing, errorListingMessage, setErrorListingMessage)}
                <View style={{ flex: 1 }} />
                <KeyboardAvoidingView
                    behavior={'padding'}
                    keyboardVerticalOffset={scales(120)}
                >
                    <TextInput
                        placeholder={t('note')}
                        style={styles.noteInput}
                        placeholderTextColor={Colors.color_090F24}
                        value={note}
                        onChangeText={setNote}
                    />
                </KeyboardAvoidingView>
            </View >

            <View style={styles.viewCheck}>
                <Checkbox value={isRecurring} onToggle={handleToggle} />
                <Text style={styles.textCheck}>{t('get_recurring')} </Text>
            </View>
            <View style={styles.btnBottom}>
                <Button title={t('set_price')} onPress={handleAddNftAlert} />
            </View>
        </TouchableOpacity >
    )
}

const mapDispatchToProps = {
    editNftAlert: alertActionCreators.editNftAlert,
};


export default connect<undefined, DispatchProps>(undefined, mapDispatchToProps)(EditNftAlertScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.color_FFFFFF,
    },
    content: {
        flex: 1,
    },
    btnBottom: {
        marginBottom: scales(20) + Sizes.bottomSpace,
        marginHorizontal: scales(16),
    },
    textFollow: {
        ...Fonts.w700,
        fontSize: scales(14),
        color: Colors.color_199744,
        marginLeft: scales(16),
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: scales(1),
        borderColor: Colors.color_E9EAEC,
        paddingVertical: scales(16),
    },
    title: {
        ...Fonts.w700,
        color: Colors.color_090F24,
        fontSize: scales(14),
        marginLeft: scales(16),
    },
    input: {
        ...Fonts.w400,
        fontSize: scales(14),
        flex: 1,
        paddingLeft: scales(16),
        paddingVertical: scales(10),
        borderRadius: scales(10),
        backgroundColor: Colors.color_E9EAEC,
        height: scales(40),
    },
    inputContainerStyle: {
        borderWidth: 0,
        width: Sizes.screenWidth - scales(88),
    },
    viewTitle: {
        width: scales(87),
        justifyContent: 'center',
    },
    noteInput: {
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
    },
    viewCheck: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: scales(18),
        marginTop: scales(34),
        alignItems: 'center',
    },
    textCheck: {
        fontSize: scales(14),
        color: Colors.color_A2A4AA,
        ...Fonts.w400,
        marginLeft: scales(4),
    },
    containerHeader: {
        flexDirection: 'row',
        height: Sizes.statusBarHeight + scales(56),
        paddingTop: Sizes.statusBarHeight,
        paddingHorizontal: scales(32),
        alignItems: 'center',
    },
    centerHeader: {
        ...StyleSheet.absoluteFillObject,
        top: Sizes.statusBarHeight,
        left: scales(80),
        right: scales(80),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    imageLogo: {
        width: scales(24),
        height: scales(24),
        borderRadius: scales(24),
        resizeMode: 'cover',
        marginRight: scales(4),
    },
    titleHeader: {
        ...Fonts.w500,
        fontSize: scales(14),
        color: Colors.color_090F24,
    },
})
