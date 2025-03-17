import { t } from 'i18next';
import React, { memo, useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import Images from 'assets/images';
import Svgs from 'assets/svgs';
import { TouchableOpacity } from 'components/base';
import DialogUtil from 'components/dialog';
import { DialogType } from 'constants/constants';
import { alertActionCreators } from 'modules/alerts/src/action';
import { ALERTS_DROPDOWN_HEIGHT_ITEM, ALERTS_DROPDOWN_WIDTH, AlertStatus, MoreOptions } from 'modules/alerts/src/constants';
import { goToEditNftAlert, goToEditTokenAlert } from 'modules/alerts/src/utils';
import { TokensType } from 'modules/markets/src/constants';
import { Colors, Fonts, Sizes } from 'themes';
import scales from 'utils/scales';

interface Props {
    data: alerts.Item;
    onCheckItem: () => void;
    inCheckMode: boolean;
    isChecked: boolean;
}

interface DispatchProps {
    deleteAlerts: typeof alertActionCreators.deleteAlerts;
    activateAlerts: typeof alertActionCreators.activateAlerts;
    deactivateAlerts: typeof alertActionCreators.deactivateAlerts;
}

type AlertItemProps = Props & DispatchProps;

const AlertItem = (props: AlertItemProps) => {
    const { data, onCheckItem, inCheckMode, isChecked } = props;

    const dropdownMoreOption = useRef<View>();
    const widthCheck = useRef(new Animated.Value(inCheckMode ? scales(24) : 0)).current;

    const isToken = data.type?.toLowerCase() === TokensType.TOKEN;
    const index = isToken ? 0 : 1;

    useEffect(() => {
        Animated.timing(widthCheck, {
            toValue: inCheckMode ? scales(24) : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [inCheckMode]);

    const showMoreOption = () => {
        const options = [
            data.status === AlertStatus.ACTIVE ? MoreOptions.DEACTIVATE : MoreOptions.ACTIVATE,
            isChecked ? MoreOptions.UNSELECT : MoreOptions.SELECT,
            MoreOptions.EDIT,
            MoreOptions.DELETE,
        ];
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
                            )
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
            case MoreOptions.ACTIVATE: {
                const payload: alerts.AlertsActionPayload = {
                    index,
                    ids: [data.id],
                };
                props.activateAlerts(payload);
                break;
            }
            case MoreOptions.DEACTIVATE: {
                const payload: alerts.AlertsActionPayload = {
                    index,
                    ids: [data.id],
                };
                props.deactivateAlerts(payload);
                break;
            }
            case MoreOptions.DELETE: {
                onDeleteItem();
                break;
            }
            case MoreOptions.SELECT:
            case MoreOptions.UNSELECT:
                onCheckItem();
                break;
            case MoreOptions.EDIT:
                isToken ? goToEditTokenAlert(data) : goToEditNftAlert(data);
                break;
            default:
                break;
        }
    };

    const onDeleteItem = () => {
        DialogUtil.showMessageDialog({
            type: DialogType.TWO,
            icon: Images.RED_QUESTION,
            title: t('want_delete_alert'),
            onConfirm: onConfirmDelete,
        }).catch();
    };

    const onConfirmDelete = () => {
        DialogUtil.dismiss();
        const payload: alerts.AlertsActionPayload = {
            index,
            ids: [data.id],
        };
        props.deleteAlerts(payload);
    };

    const renderDay = () => <Text style={styles.textDay}>{data.day}</Text>;

    const renderName = () => (
        <View style={styles.name}>
            <Text style={styles.textName} numberOfLines={2}>{data.name}</Text>
            <View style={styles.subName}>
                <Text style={styles.textTime}>{data.time}</Text>
                <Text style={styles.textOrange}>{data.type}</Text>
            </View>
        </View>
    );

    const renderPrice = () => (
        <View style={styles.price}>
            <Text style={styles.textPrice}>{t('price')}:</Text>
            {isToken ? null : <Text style={styles.textOrange}>{t('listing')}:</Text>}
        </View>
    );

    const renderPriceValue = () => {
        const dataNft = data as alerts.NftItem;
        return (
            <View style={styles.priceValue}>
                <Text style={[styles.textPrice, { textAlign: 'right' }]}>{data.price}</Text>
                {isToken ? null : <Text style={[styles.textOrange, { textAlign: 'right' }]}>{dataNft.listing}</Text>}
            </View>
        );
    };

    const renderMainInfo = () => (
        <View style={styles.mainInfo}>
            {renderName()}
            {renderPrice()}
            {renderPriceValue()}
        </View>
    );

    const renderStatus = () => {
        const isActive = data.status === AlertStatus.ACTIVE;
        return (
            <View style={[styles.status, isActive ? {} : { backgroundColor: Colors.color_A2A4AA }]}>
                <Text style={[styles.textStatus, isActive ? {} : { color: Colors.color_5E626F }]}>
                    {data.status}
                </Text>
            </View>
        )
    }

    const renderBottomInfo = () => (
        <View style={styles.bottomInfo}>
            {renderStatus()}
            {data.note ? <Text style={styles.textNote}>{data.note}</Text> : null}
        </View>
    );

    const renderInfo = () => (
        <View style={styles.info}>
            {renderMainInfo()}
            {renderBottomInfo()}
        </View>
    );

    const renderCheck = () => {
        const IconCheck = Svgs[`IcCheckBox${isChecked ? 'Selected' : ''}`]
        return (
            <Animated.View style={{ justifyContent: 'center', width: widthCheck }}>
                {inCheckMode ? (
                    <TouchableOpacity style={styles.checkButton} onPress={onCheckItem}>
                        <IconCheck width={scales(20)} height={scales(20)} />
                    </TouchableOpacity>
                ) : null}
            </Animated.View>
        )
    }

    const renderMoreOptions = () => (
        <View style={styles.moreOptions}>
            <TouchableOpacity onPress={showMoreOption}>
                <View ref={dropdownMoreOption} collapsable={false}>
                    <Svgs.IcMoreOption width={scales(24)} height={scales(24)} color={Colors.color_5E626F} />
                </View>
            </TouchableOpacity>
            {renderCheck()}
        </View>
    );

    const renderContent = () => (
        <View style={styles.content}>
            {renderInfo()}
            {renderMoreOptions()}
        </View>
    );

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={inCheckMode ? onCheckItem : null}
            style={styles.container}
        >
            {renderDay()}
            {renderContent()}
        </TouchableOpacity>
    );
};

const mapDispatch = {
    deleteAlerts: alertActionCreators.deleteAlerts,
    activateAlerts: alertActionCreators.activateAlerts,
    deactivateAlerts: alertActionCreators.deactivateAlerts,
};

export default memo(connect(null, mapDispatch)(AlertItem));

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.color_FFFFFF,
        flexDirection: 'column',
        padding: scales(16),
        justifyContent: 'space-between',
        borderColor: Colors.color_A2A4AA,
        borderWidth: 0.5,
    },
    textDay: {
        ...Fonts.w400,
        fontSize: scales(12),
        color: Colors.color_199744,
        marginBottom: scales(8),
    },
    content: {
        flexDirection: 'row',
    },
    info: {
        flex: 1,
    },
    mainInfo: {
        flexDirection: 'row',
    },
    name: {
        flex: 2.2,
        paddingRight: scales(5),
    },
    subName: {
        flexDirection: 'row',
    },
    price: {
        flex: 1,
    },
    priceValue: {
        flex: 1,
        alignItems: 'flex-end',
    },
    bottomInfo: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    textName: {
        ...Fonts.w500,
        fontSize: scales(14),
        marginBottom: scales(4),
        color: Colors.color_090F24,
    },
    textTime: {
        ...Fonts.w400,
        fontSize: scales(12),
        color: Colors.color_A2A4AA,
        marginRight: scales(8),
    },
    textOrange: {
        ...Fonts.w400,
        fontSize: scales(12),
        color: Colors.color_FF5C00,
    },
    textPrice: {
        ...Fonts.w500,
        fontSize: scales(12),
        color: Colors.color_090F24,
    },
    textNote: {
        ...Fonts.w500,
        fontSize: scales(10),
        color: Colors.color_A2A4AA,
    },
    status: {
        backgroundColor: Colors.color_C6F9C8,
        paddingHorizontal: scales(5),
        borderRadius: scales(4),
        marginVertical: scales(4),
    },
    textStatus: {
        ...Fonts.w400,
        fontSize: scales(12),
        lineHeight: scales(16),
        color: Colors.color_199744,
    },
    moreOptions: { flexDirection: 'row', marginLeft: scales(8) },
    checkButton: {
        marginLeft: scales(8),
    },
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
        height: 1,
        backgroundColor: Colors.color_A2A4AA,
        alignSelf: 'center',
    },
});
