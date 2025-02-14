import { t } from 'i18next';
import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import Images from 'assets/images';
import Svgs from 'assets/svgs';
import { TouchableOpacity } from 'components/base';
import DialogUtil from 'components/dialog';
import { DialogType } from 'constants/constants';
import { ALERTS_DROPDOWN_HEIGHT_ITEM, ALERTS_DROPDOWN_WIDTH, MoreOptions } from 'modules/alerts/src/constants';
import { CurrencyUnit } from 'modules/markets/src/constants';
import { portfolioActionCreators } from 'modules/portfolio/src/action';
import { goToEditPortfolio, goToPortfolioDetail } from 'modules/portfolio/src/utils';
import { profileInfoSelector } from 'modules/user/src/selectors';
import { Colors, Fonts, Sizes } from 'themes';
import scales from 'utils/scales';

interface Props {
    data: portfolio.Item;
    unitSelected: CurrencyUnit;
}

interface StateProps {
    user: user.Profile;
}

interface DispatchProps {
    deletePortfolio: typeof portfolioActionCreators.deletePortfolio;
}

type PortfolioItemProps = Props & StateProps & DispatchProps;

const PortfolioItem = (props: PortfolioItemProps) => {
    const { data, unitSelected } = props;

    const dropdownMoreOption = useRef<View>();

    const showMoreOption = () => {
        const options = [MoreOptions.EDIT, MoreOptions.DELETE];
        dropdownMoreOption.current?.measure((x, y, width, height, px, py) => {
            const heightDropdown = ALERTS_DROPDOWN_HEIGHT_ITEM * options.length;
            const isEnoughHeight = Sizes.screenHeight - (py + height + heightDropdown + scales(20)) > 0;
            const heightIfEnough = py + height + scales(10);
            const heightIfNotEnough = py - heightDropdown - scales(10);

            const dropdownConfig = {
                marginTop: isEnoughHeight ? heightIfEnough : heightIfNotEnough,
                marginLeft: px - ALERTS_DROPDOWN_WIDTH + width,
                children: (
                    <View style={styles.dropdownContainer}>
                        {options.map((op, i) => {
                            const isLastItem = i + 1 === options.length;

                            return (
                                <View key={op + i.toString()}>
                                    <TouchableOpacity onPress={() => onSelectOption(op)}>
                                        <View key={i.toString()} style={styles.dropdownItem}>
                                            <Text style={styles.dropdownText}>{op}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    {isLastItem ? null : <View style={styles.dropdownSeparator} />}
                                </View>
                            );
                        })}
                    </View>
                ),
            };
            DialogUtil.showDropdown(dropdownConfig).catch();
        });
    };

    const onSelectOption = (option: MoreOptions) => {
        DialogUtil.dismiss();
        switch (option) {
            case MoreOptions.DELETE: {
                onDeleteItem();
                break;
            }
            case MoreOptions.EDIT:
                goToEditPortfolio(data);
                break;
            default:
                break;
        }
    };

    const onDeleteItem = () => {
        DialogUtil.showMessageDialog({
            type: DialogType.TWO,
            icon: Images.RED_QUESTION,
            title: t('want_delete_portfolio'),
            onConfirm: onConfirmDelete,
        }).catch();
    };

    const onConfirmDelete = () => {
        DialogUtil.dismiss();
        props.deletePortfolio([data.id]);
    };

    const renderMoreOptions = () => (
        <View style={styles.moreOptions}>
            <TouchableOpacity onPress={showMoreOption}>
                <View ref={dropdownMoreOption} collapsable={false}>
                    <Svgs.IcMoreOption width={scales(24)} height={scales(24)} color={Colors.color_FFFFFF} />
                </View>
            </TouchableOpacity>
        </View>
    );

    const renderInfoPortfolio = () => (
        <View style={styles.infoPortfolio}>
            <Text style={styles.nameInfo}>{data.name}</Text>
            <Text style={styles.assetInfo}>{unitSelected === CurrencyUnit.ADA ? data.asset_ada : data.asset}</Text>
        </View>
    );

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => goToPortfolioDetail(data.id, data.name)}
            style={styles.container}
        >
            {renderInfoPortfolio()}
            {renderMoreOptions()}
        </TouchableOpacity>
    );
};

const mapState = (state: GlobalState) => ({
    user: profileInfoSelector(state),
});

const mapDispatch = {
    deletePortfolio: portfolioActionCreators.deletePortfolio,
};

export default connect(mapState, mapDispatch)(PortfolioItem);

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.color_199744,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: scales(16),
        borderRadius: scales(10),
        padding: scales(16),
    },
    moreOptions: { marginLeft: scales(8) },
    dropdownContainer: {
        width: ALERTS_DROPDOWN_WIDTH,
        backgroundColor: Colors.color_FFFFFF,
        borderRadius: scales(5),
    },
    dropdownItem: {
        height: ALERTS_DROPDOWN_HEIGHT_ITEM,
        paddingHorizontal: scales(16),
        justifyContent: 'center',
    },
    dropdownText: {
        ...Fonts.w500,
        color: Colors.color_090F24,
        fontSize: scales(16),
    },
    dropdownSeparator: {
        width: ALERTS_DROPDOWN_WIDTH - scales(32),
        height: scales(1),
        backgroundColor: Colors.color_A2A4AA,
        alignSelf: 'center',
    },
    infoPortfolio: {
        flex: 1,
    },
    nameInfo: {
        ...Fonts.w500,
        fontSize: scales(16),
        color: Colors.color_FFFFFF,
        marginBottom: scales(4),
    },
    assetInfo: {
        ...Fonts.w400,
        fontSize: scales(14),
        color: Colors.color_FFFFFF,
    },
});
