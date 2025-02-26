import { t } from 'i18next';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, ListRenderItem, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Subscription } from 'rxjs';

import Svgs from 'assets/svgs';
import { ITEM_LOAD, START_PAGE } from 'constants/constants';
import { alertActionCreators } from 'modules/alerts/src/action';
import { AlertStatus } from 'modules/alerts/src/constants';
import AlertItem from 'modules/alerts/views/components/AlertItem';
import AlertsSkeleton from 'modules/alerts/views/components/AlertsSkeleton';
import EventBus, { EventBusName } from 'services/event-bus';
import { Colors, Fonts } from 'themes';
import scales from 'utils/scales';

interface Props {
    index: number;
    listItem: alerts.ListItemByRoute;
    setListItem: (listItem: alerts.ListItemByRoute) => void;
}

interface DispatchProps {
    getAlerts: typeof alertActionCreators.getAlerts;
}

type AlertSceneProps = Props & DispatchProps;

const AlertsScene = (props: AlertSceneProps) => {
    const { index, listItem, setListItem } = props;

    const [data, setData] = useState<alerts.Data & FlatListLoadData>({
        page: START_PAGE,
        perPage: ITEM_LOAD,
        total: 0,
        table_data: [],
        refreshing: false,
        fetching: true,
        canLoadMore: false,
    });

    const listItemRef = useRef<alerts.ListItemByRoute>(listItem);

    useEffect(() => {
        listItemRef.current = listItem;
    }, [listItem]);

    useEffect(() => {
        getAlerts();
    }, []);

    useEffect(() => {
        onRegisterEventBus();
        return () => {
            subScription?.unsubscribe?.();
        };
    }, []);

    const subScription = new Subscription();

    const onRegisterEventBus = () => {
        subScription.add(
            EventBus.getInstance().events.subscribe((res) => {
                if (res?.payload?.index === index) {
                    switch (res.type) {
                        case EventBusName.ADD_ALERT: {
                            setData((prevState) => {
                                return {
                                    ...prevState,
                                    table_data: [...res?.payload?.data, ...prevState.table_data],
                                };
                            });
                            setListItem({
                                ...listItemRef.current,
                                [index]: {
                                    ...listItemRef.current[index],
                                    total: listItemRef.current[index].total + 1,
                                    all: [
                                        ...res?.payload?.data?.map(i => i.id),
                                        ...listItemRef.current[index].all,
                                    ],
                                },
                            });
                            return;
                        }
                        case EventBusName.EDIT_ALERT: {
                            setData((prevState) => {
                                return {
                                    ...prevState,
                                    table_data: prevState.table_data.map(i => {
                                        if (i.id === res?.payload?.data?.id) {
                                            return { ...i, ...res?.payload?.data}
                                        } else {
                                            return i;
                                        }
                                    }),
                                };
                            });
                            return;
                        }
                        case EventBusName.DELETE_ALERTS:
                            setData((prevState) => {
                                return {
                                    ...prevState,
                                    table_data: prevState.table_data.filter(i => !res?.payload?.ids?.includes(i.id)),
                                };
                            });
                            setListItem({
                                ...listItemRef.current,
                                [index]: {
                                    ...listItemRef.current[index],
                                    total: listItemRef.current[index].total - res?.payload?.ids?.length,
                                    all: listItemRef.current[index].all.filter(i => !res?.payload?.ids?.includes(i)),
                                    ids: [],
                                },
                            });
                            return;
                        case EventBusName.ACTIVATE_ALERTS:
                            setData((prevState) => {
                                return {
                                    ...prevState,
                                    table_data: prevState.table_data.map(i => {
                                        return {
                                            ...i,
                                            status: res?.payload.ids.includes(i.id) ? AlertStatus.ACTIVE : i.status,
                                        }
                                    }),
                                };
                            });
                            setListItem({
                                ...listItemRef.current,
                                [index]: {
                                    ...listItemRef.current[index],
                                    ids: [],
                                },
                            });
                            return;
                        case EventBusName.DEACTIVATE_ALERTS:
                            setData((prevState) => {
                                return {
                                    ...prevState,
                                    table_data: prevState.table_data.map(i => {
                                        return {
                                            ...i,
                                            status: res?.payload.ids.includes(i.id) ? AlertStatus.DEACTIVE : i.status,
                                        }
                                    }),
                                };
                            });
                            setListItem({
                                ...listItemRef.current,
                                [index]: {
                                    ...listItemRef.current[index],
                                    ids: [],
                                },
                            });
                            return;
                        default:
                            return;
                    }
                }
            })
        );
    };

    const getAlerts = (page: number = START_PAGE, oldTableData: alerts.Item[] = []) => {
        const payload: alerts.GetAlertsActionPayload = {
            index,
            page,
            oldTableData,
            onSuccess,
            onFailure,
        };
        props.getAlerts(payload);
    };

    const onSuccess = (_index: number, _data: alerts.Data) => {
        setListItem({
            ...listItem,
            [_index]: {
                ...listItem[_index],
                all: _data.table_data.map(item => item.id),
                total: _data.total,
            },
        });
        setData({
            ..._data,
            fetching: false,
            refreshing: false,
            canLoadMore: _data.page * _data.perPage < _data.total,
        });
    };

    const onFailure = () => {
        setData((prevState) => {
            return {
                ...prevState,
                fetching: false,
                refreshing: false,
            };
        });
    };

    const refreshControl = () => (
        <RefreshControl
            refreshing={data.refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.color_199744}
            colors={[Colors.color_199744]}
        />
    );

    const onRefresh = () => {
        setData((prevState) => {
            return {
                ...prevState,
                refreshing: true,
            };
        });
        getAlerts();
    };

    const onLoadMore = () => {
        if (data.canLoadMore) {
            getAlerts(data.page + 1, data.table_data);
        }
    };

    const keyExtractor = (item: alerts.Item, _index: number) => {
        const key = item?.id?.toString();
        return (key || '') + _index;
    };

    const renderEmpty = () => (
        <View style={styles.emptyContent}>
            <Svgs.IcBell2 width={scales(48)} height={scales(48)} />
            <Text style={styles.emptyTitle}>{t('no_alerts')}</Text>
            <Text style={styles.emptyDescription}>{t('tap_to_add_one')}</Text>
        </View>
    );

    const renderSeparator = () => <View style={styles.separator} />;

    const renderItem: ListRenderItem<alerts.Item> = ({ item }) => (
        <AlertItem
            data={item}
            onCheckItem={() => onCheckItem(item)}
            inCheckMode={listItem[index].ids.length > 0}
            isChecked={listItem[index].ids.includes(item.id)}
        />
    );

    const onCheckItem = (item: alerts.Item) => {
        if (listItem[index].ids.includes(item.id)) {
            setListItem({
                ...listItem,
                [index]: {
                    ...listItem[index],
                    ids: listItem[index].ids.filter(id => item.id !== id),
                },
            });
        } else {
            setListItem({
                ...listItem,
                [index]: {
                    ...listItem[index],
                    ids: [...listItem[index].ids, item.id],
                },
            });
        }
    };

    const renderFooter = () => data.canLoadMore ? <AlertsSkeleton isFooter /> : null;

    return data.fetching ? <AlertsSkeleton /> : (
        <FlatList
            style={styles.container}
            contentContainerStyle={styles.content}
            refreshControl={refreshControl()}
            data={data.table_data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ListEmptyComponent={renderEmpty()}
            ListFooterComponent={renderFooter}
            onEndReached={onLoadMore}
            onEndReachedThreshold={0.01}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default connect<null, DispatchProps>(null, {
    getAlerts: alertActionCreators.getAlerts,
})(AlertsScene);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.color_FFFFFF,
    },
    content: {
        flexGrow: 1,
        paddingBottom: scales(80),
    },
    separator: {
        height: scales(1),
        backgroundColor: Colors.color_A2A4AA,
    },
    emptyContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    emptyTitle: {
        ...Fonts.w500,
        fontSize: scales(18),
        color: Colors.color_5E626F,
        marginVertical: scales(8),
    },
    emptyDescription: {
        ...Fonts.w500,
        fontSize: scales(14),
        color: Colors.color_5E626F,
        marginBottom: scales(36),
    },
});
