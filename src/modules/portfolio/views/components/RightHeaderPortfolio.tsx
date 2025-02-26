import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Svgs from 'assets/svgs';
import { TouchableOpacity } from 'components/base';
import DialogUtil from 'components/dialog';
import { CURRENCY_DROPDOWN_WIDTH, CurrencyUnit } from 'modules/markets/src/constants';
import LinearGradient from 'react-native-linear-gradient';
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
            <TouchableOpacity onPress={onShowDropdownCurrency}>
                <LinearGradient
                    colors={[Colors.color_4FE54D, Colors.color_1CB21A]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    locations={[0.36, 0.96]}
                    style={styles.selectCurrency}
                >
                    <View ref={dropdownUnit} style={styles.selectCurrencyView} collapsable={false}>
                        <Icon width={scales(16)} height={scales(16)} />
                        <Text style={styles.textCurrency}>
                            {unitSelected.toUpperCase()}
                        </Text>
                        <Svgs.IcArrowDown width={scales(12)} height={scales(12)} />
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        );
    };

    const onShowDropdownCurrency = () => {
        const Icon = Svgs[`Ic${unitUnselected.toUpperCase()}`];

        dropdownUnit.current.measure(
            (x, y, width, height, px, py) => {
                const dropdownConfig = {
                    marginTop: py + height + scales(16),
                    marginLeft: px - CURRENCY_DROPDOWN_WIDTH + width + scales(6),
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
            }
        );

        // const Icon = Svgs[`Ic${unitUnselected.toUpperCase()}`];

        // dropdownUnit.current.measure((x, y, width, height, px, py) => {
        //     const dropdownConfig = {
        //         // marginTop: py + height + scales(5),
        //         // marginLeft: px - CURRENCY_DROPDOWN_WIDTH - scales(10) + width,

        //         marginTop: py + height + scales(5),
        //         marginLeft: px - CURRENCY_DROPDOWN_WIDTH - scales(10) + width,
        //         children: (
        //             <TouchableOpacity onPress={onSelectCurrency}>
        //                 <View style={[styles.selectCurrency, { backgroundColor: Colors.color_FFFFFF, padding: scales(0) }]}>
        //                     <Icon width={scales(16)} height={scales(16)} />
        //                     <Text style={[styles.textCurrency, { color: Colors.color_5E626F }]}>
        //                         {unitUnselected.toUpperCase()}
        //                     </Text>
        //                     <Svgs.IcArrowDown width={scales(12)} height={scales(12)} color={Colors.transparent} />
        //                 </View>
        //             </TouchableOpacity>
        //         ),
        //     };
        //     DialogUtil.showDropdown(dropdownConfig).catch();
        // });
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

    textCurrency: {
        ...Fonts.w600,
        fontSize: scales(10),
        lineHeight: scales(20),
        paddingHorizontal: scales(4),
        color: Colors.color_FFFFFF,
    },
    selectCurrencyView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectCurrency: {
        width: scales(73),
        flexDirection: 'row',
        padding: scales(4),
        borderRadius: scales(5),
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
