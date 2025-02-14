import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import Svgs from 'assets/svgs';
import { TouchableOpacity } from 'components/base';
import DialogUtil from 'components/dialog';
import { useSetting } from 'contexts/SettingProvider';
import { CURRENCY_DROPDOWN_WIDTH, CurrencyUnit, SEARCH_DROPDOWN_WIDTH, TokensType } from 'modules/markets/src/constants';
import { masterdataActionCreators } from 'modules/masterdata/src/actions';
import { masterdataUnitSelectedSelector } from 'modules/masterdata/src/selectors';
import { pushToPage } from 'modules/navigation/src/utils';
import { Colors, Fonts } from 'themes';
import scales from 'utils/scales';

const listData: string[] = ['find_token', 'find_nft'];

interface Props {
    currentIndex: number;
}

interface StateProps {
    unitSelected: CurrencyUnit;
}

interface DispatchProps {
    changeUnitSelected: typeof masterdataActionCreators.changeUnitSelected
}

type RightHeaderMarketProps = Props & StateProps & DispatchProps;

const RightHeaderMarket = (props: RightHeaderMarketProps) => {
    const { t } = useSetting();

    const { currentIndex, unitSelected, changeUnitSelected } = props;

    const dropdownUnit = useRef<View>();
    const dropdownSearch = useRef<View>();

    const unitUnselected = [CurrencyUnit.ADA, CurrencyUnit.USDT].find(unit => unit !== unitSelected);

    const renderSearch = () => (
        <TouchableOpacity onPress={onShowDropdownSearch} style={styles.search}>
            <View ref={dropdownSearch} collapsable={false}>
                <Svgs.IcSearch width={scales(24)} height={scales(24)} />
            </View>
        </TouchableOpacity>
    );

    const renderSelectCurrency = () => {
        const Icon = Svgs[`Ic${unitSelected.toUpperCase()}`];

        return (
            <TouchableOpacity onPress={onShowDropdownCurrency}>
                <View ref={dropdownUnit} style={styles.selectCurrency} collapsable={false}>
                    <Icon width={scales(16)} height={scales(16)} />
                    <Text style={styles.textCurrency}>
                        {unitSelected.toUpperCase()}
                    </Text>
                    <Svgs.IcArrowDown width={scales(12)} height={scales(12)} />
                </View>
            </TouchableOpacity>
        );
    };

    const onShowDropdownCurrency = () => {
        const Icon = Svgs[`Ic${unitUnselected.toUpperCase()}`];

        dropdownUnit.current.measure(
            (x, y, width, height, px, py) => {
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
            }
        );
    };

    const onSelectCurrency = () => {
        DialogUtil.dismiss();
        changeUnitSelected(unitUnselected);
    };

    const onShowDropdownSearch = () => {
        dropdownSearch.current.measure(
            (x, y, width, height, px, py) => {
                const dropdownConfig = {
                    marginTop: py + height + scales(5),
                    marginLeft: px - SEARCH_DROPDOWN_WIDTH - scales(10) + width,
                    children: (
                        <View style={styles.dropdownSearchContainer}>
                            {listData.map((data, index) => {
                                const isSelected = currentIndex === index;
                                return (
                                    <TouchableOpacity
                                        key={data}
                                        onPress={() => goToMarketSearch(data)}
                                        style={[styles.dropdownSearchItem, isSelected ? { backgroundColor: Colors.color_199744 } : {}]}
                                    >
                                        <Text style={[styles.dropdownSearchText, isSelected ? { color: Colors.color_FFFFFF } : {}]}>
                                            {t(data)}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    ),
                };
                DialogUtil.showDropdown(dropdownConfig).catch();
            }
        );
    };

    const goToMarketSearch = (key: string) => {
        DialogUtil.dismiss();
        const tokenType = key === listData[0] ? TokensType.TOKEN : TokensType.NFT
        setTimeout(() => {
            pushToPage('MarketSearch', { tokenType });
        }, 100);
    }

    return (
        <View style={styles.right}>
            {renderSearch()}
            {renderSelectCurrency()}
        </View>
    );

}

const mapState = (state: GlobalState) => ({
    unitSelected: masterdataUnitSelectedSelector(state),
});

const mapDispatch = {
    changeUnitSelected: masterdataActionCreators.changeUnitSelected,
};

export default connect(mapState, mapDispatch)(RightHeaderMarket);

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
    dropdownSearchContainer: {
        width: SEARCH_DROPDOWN_WIDTH,
        backgroundColor: Colors.color_FFFFFF,
        borderRadius: scales(5),
    },
    dropdownSearchItem: {
        width: SEARCH_DROPDOWN_WIDTH,
        height: scales(40),
        borderRadius: scales(5),
        justifyContent: 'center',
        paddingHorizontal: scales(16),
    },
    dropdownSearchText: {
        ...Fonts.w500, fontSize: scales(14),
        color: Colors.color_090F24,
    },
});
