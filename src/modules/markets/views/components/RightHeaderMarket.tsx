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
import LinearGradient from 'react-native-linear-gradient';
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
                    overlay: true,
                    overlayColor: 'rgba(0, 0, 0, 0.3)',
                    children: (
                        <View style={styles.dropdownSearchContainer}>
                            {listData.map((data, index) => {
                                const isSelected = currentIndex === index;
                                return (
                                    <LinearGradient
                                        colors={isSelected ? [Colors.color_4FE54D, Colors.color_1CB21A] : [Colors.transparent, Colors.transparent]}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 0, y: 1 }}
                                        locations={[0.36, 0.96]}
                                        style={styles.dropdownSearchItem}
                                    >
                                        <TouchableOpacity
                                            key={data}
                                            onPress={() => goToMarketSearch(data)}
                                            style={[styles.dropdownSearchItem]}
                                        >
                                            <Text style={[styles.dropdownSearchText, isSelected ? { color: Colors.color_FFFFFF } : {}]}>
                                                {t(data)}
                                            </Text>
                                        </TouchableOpacity>
                                    </LinearGradient>
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
        // width: scales(36),
        // height: scales(36),
        justifyContent: 'center',
        marginRight: scales(10),
    },
    selectCurrency: {
        width: scales(73),
        flexDirection: 'row',
        padding: scales(4),
        borderRadius: scales(5),
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectCurrencyView: {
        flex: 1,
        flexDirection: 'row',
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
        borderTopLeftRadius: scales(5),
        borderTopRightRadius: scales(5),
        justifyContent: 'center',
        paddingHorizontal: scales(16),
    },
    dropdownSearchText: {
        ...Fonts.w500, fontSize: scales(14),
        color: Colors.color_090F24,
    },
});
