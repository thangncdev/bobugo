import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Svgs from 'assets/svgs';
import { TouchableOpacity } from 'components/base';
import DialogUtil from 'components/dialog';
import { CURRENCY_DROPDOWN_WIDTH, CurrencyUnit } from 'modules/markets/src/constants';
import { Colors, Fonts } from 'themes';
import scales from 'utils/scales';

interface Props {
    unitSelected: CurrencyUnit;
    changeUnitSelected: (currency: CurrencyUnit) => void;
}

const RightHeaderPortfolio: React.FC<Props> = (props) => {
    const { unitSelected, changeUnitSelected } = props;

    const dropdownUnit = useRef<View>();

    const unitUnselected = [CurrencyUnit.ADA, CurrencyUnit.USDT].find((unit) => unit !== unitSelected);

    const renderSelectCurrency = () => {
        const Icon = Svgs[`Ic${unitSelected.toUpperCase()}`];
        return (
            <TouchableOpacity onPress={onShowDropdown}>
                <View ref={dropdownUnit} style={styles.selectCurrency} collapsable={false}>
                    <Icon width={scales(16)} height={scales(16)} />
                    <Text style={styles.textCurrency}>{unitSelected?.toUpperCase()}</Text>
                    <Svgs.IcArrowDown width={scales(12)} height={scales(12)} />
                </View>
            </TouchableOpacity>
        );
    };

    const onShowDropdown = () => {
        const Icon = Svgs[`Ic${unitUnselected.toUpperCase()}`];

        dropdownUnit.current.measure((x, y, width, height, px, py) => {
            const dropdownConfig = {
                marginTop: py + height + scales(5),
                marginLeft: px - CURRENCY_DROPDOWN_WIDTH + width,
                children: (
                    <TouchableOpacity onPress={onSelectCurrency}>
                        <View style={[styles.selectCurrency, { backgroundColor: Colors.color_FFFFFF }]}>
                            <Icon width={scales(16)} height={scales(16)} />
                            <Text style={[styles.textCurrency, { color: Colors.color_5E626F }]}>
                                {unitUnselected.toUpperCase()}
                            </Text>
                            <Svgs.IcArrowDown width={scales(12)} height={scales(12)} color={Colors.transparent} />
                        </View>
                    </TouchableOpacity>
                ),
            };
            DialogUtil.showDropdown(dropdownConfig).catch();
        });
    };

    const onSelectCurrency = () => {
        DialogUtil.dismiss();
        changeUnitSelected(unitUnselected);
    };

    return <View style={styles.right}>{renderSelectCurrency()}</View>;
};

export default RightHeaderPortfolio;

const styles = StyleSheet.create({
    right: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    search: {
        width: scales(36),
        height: scales(36),
        justifyContent: 'center',
        marginRight: scales(10),
    },
    selectCurrency: {
        width: scales(73),
        flexDirection: 'row',
        padding: scales(4),
        borderRadius: scales(5),
        backgroundColor: Colors.color_199744,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textCurrency: {
        ...Fonts.w600,
        fontSize: scales(10),
        lineHeight: scales(20),
        paddingHorizontal: scales(4),
        color: Colors.color_FFFFFF,
    },
});
