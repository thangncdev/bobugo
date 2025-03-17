import { indexOf } from 'lodash';
import React, { useMemo, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationState } from 'react-native-tab-view/lib/typescript/src/types';
import { connect } from 'react-redux';

import Svgs from 'assets/svgs';
import DialogUtil from 'components/dialog';
import { alertActionCreators } from 'modules/alerts/src/action';
import { ALERTS_DROPDOWN_HEIGHT_ITEM, ALERTS_DROPDOWN_WIDTH, MoreOptions } from 'modules/alerts/src/constants';
import { TokensType } from 'modules/markets/src/constants';
import { getMainAndSubRoutes } from 'modules/markets/src/utils';
import { Colors, Fonts } from 'themes';
import scales from 'utils/scales';

interface Props {
    index: number;
    setIndex: (index: number) => void;
    listItem: alerts.ListItemByRoute;
    setListItem: (listItem: alerts.ListItemByRoute) => void;
}

interface DispatchProps {
    activateAlerts: typeof alertActionCreators.activateAlerts;
    deactivateAlerts: typeof alertActionCreators.deactivateAlerts;
}

type AlertsTabBarProps = Props & DispatchProps & { navigationState: NavigationState<markets.Route> };

const AlertsTabBar = (props: AlertsTabBarProps) => {
    const { index, setIndex, navigationState, listItem, setListItem } = props;
    const { routes } = navigationState;

    const dropdownMoreOption = useRef<View>();

    const { mainRoutes } = useMemo(() => getMainAndSubRoutes(routes), []);

    const showMoreOption = () => {
        let options = [MoreOptions.ACTIVATE, MoreOptions.DEACTIVATE];
        if (listItem[index].ids.length === listItem[index].all.length && listItem[index].all.length) {
            options = [MoreOptions.UNSELECT_ALL, ...options];
        } else {
            options = [MoreOptions.SELECT_ALL, ...options];
        }
        dropdownMoreOption.current?.measure((x, y, width, height, px, py) => {
            const dropdownConfig = {
                marginTop: py + height + scales(10),
                marginLeft: px - ALERTS_DROPDOWN_WIDTH + width,
                children: (
                    <View style={styles.dropdownContainer}>
                        {options.map((op, i) => {
                            const isLastItem = i + 1 === options.length;

                            return (
                                <View key={op + i.toString()}>
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={() => onSelectOption(op)}
                                    >
                                        <View style={styles.dropdownItem}>
                                            <Text style={[styles.dropdownText, isDisableOption(op) ? { color: Colors.color_A2A4AA } : {}]}>
                                                {op}
                                            </Text>
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

    const isDisableOption = (op: MoreOptions) => {
        if (op === MoreOptions.ACTIVATE || op === MoreOptions.DEACTIVATE) {
            return !listItem[index].ids.length;
        } else {
            return !listItem[index].all.length;
        }
    }

    const onSelectOption = (op: MoreOptions) => {
        if (isDisableOption(op)) {
            return;
        }
        DialogUtil.dismiss();
        switch (op) {
            case MoreOptions.SELECT_ALL:
                setListItem({
                    ...listItem,
                    [index]: {
                        ...listItem[index],
                        ids: listItem[index].all,
                    },
                });
                break;
            case MoreOptions.UNSELECT_ALL:
                setListItem({
                    ...listItem,
                    [index]: {
                        ...listItem[index],
                        ids: [],
                    },
                });
                break;
            case MoreOptions.ACTIVATE: {
                const payload: alerts.AlertsActionPayload = {
                    index,
                    ids: listItem[index]?.ids || [],
                };
                props.activateAlerts(payload);
                break;
            }
            case MoreOptions.DEACTIVATE: {
                const payload: alerts.AlertsActionPayload = {
                    index,
                    ids: listItem[index]?.ids || [],
                };
                props.deactivateAlerts(payload);
                break;
            }
            default:
                break;
        }
    };

    const getIndexOf = (key: string) => indexOf(
        routes,
        routes.find((route) => route.key === key)
    );

    const renderMainRoutes = () => (
        <View style={styles.mainRoutes}>
            {mainRoutes.map((mainRoute) => {
                const key = mainRoute.key as TokensType;
                const indexRoute = getIndexOf(mainRoute.key);
                const isFocus = indexRoute === index;
                return (
                    <LinearGradient
                        colors={isFocus ? [Colors.color_4FE54D, Colors.color_1CB21A] : [Colors.transparent, Colors.transparent]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        locations={[0.36, 0.96]}
                        style={[styles.mainRoute]}
                    >
                        <TouchableOpacity
                            key={key}
                            onPress={() => setIndex(indexRoute)}
                        >
                            <Text style={styles.route}>{mainRoute.label}</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                );
            })}
        </View>
    );

    const renderViewOptions = () => (
        <View style={styles.contentViewOption}>
            <Text style={styles.textSelectNumber}>
                {listItem[index].ids.length}/{listItem[index].all.length}
            </Text>
            <View ref={dropdownMoreOption} collapsable={false}>
                <TouchableOpacity onPress={showMoreOption}>
                    <Svgs.IcMoreOption width={scales(24)} height={scales(24)} color={Colors.color_5E626F} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <>

            <LinearGradient
                colors={[Colors.color_000000_10, Colors.transparent]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{ height: scales(8) }}
            />
            <View style={styles.container}>
                {renderMainRoutes()}
                {renderViewOptions()}
            </View>
        </>
    );
};

const mapDispatch = {
    activateAlerts: alertActionCreators.activateAlerts,
    deactivateAlerts: alertActionCreators.deactivateAlerts,
};

export default connect(null, mapDispatch)(
    React.memo(AlertsTabBar, (prev, next) => {
        return (
            prev.index === next.index
            && prev.listItem[prev.index].all === next.listItem[next.index].all
            && prev.listItem[prev.index].ids === next.listItem[next.index].ids
        );
    })
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.color_FFFFFF,
        paddingHorizontal: scales(16),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: scales(8),
    },
    mainRoutes: {
        flexDirection: 'row',
        marginRight: scales(4),
        backgroundColor: Colors.color_A2A4AA,
        borderRadius: scales(5),
    },
    mainRoute: {
        height: scales(28),
        width: scales(45),
        borderRadius: scales(5),
        alignItems: 'center',
        justifyContent: 'center',
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    route: {
        ...Fonts.w500,
        color: Colors.color_FFFFFF,
        fontSize: scales(10),
    },
    contentViewOption: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textSelectNumber: {
        ...Fonts.w500,
        color: Colors.color_5E626F,
        fontSize: scales(12),
        marginRight: scales(16),
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
