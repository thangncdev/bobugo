import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItem, RefreshControl, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { Subscription } from 'rxjs';

import Images from 'assets/images';
import Svgs from 'assets/svgs';
import { TouchableOpacity } from 'components/base';
import DialogUtil from 'components/dialog';
import HeaderMain from 'components/header/HeaderMain';
import { ITEM_LOAD, START_PAGE } from 'constants/constants';
import { useSetting } from 'contexts/SettingProvider';
import { CurrencyUnit } from 'modules/markets/src/constants';
import { masterdataActionCreators } from 'modules/masterdata/src/actions';
import { masterdataUnitSelectedSelector } from 'modules/masterdata/src/selectors';
import { portfolioActionCreators } from 'modules/portfolio/src/action';
import { goToAddAddress } from 'modules/portfolio/src/utils';
import PortfolioItem from 'modules/portfolio/views/components/PortfolioItem';
import PortfolioSkeleton from 'modules/portfolio/views/components/PortfolioSkeleton';
import RightHeaderPortfolio from 'modules/portfolio/views/components/RightHeaderPortfolio';
import { profileInfoSelector } from 'modules/user/src/selectors';
import EventBus, { EventBusName } from 'services/event-bus';
import { Colors, Fonts } from 'themes';
import scales from 'utils/scales';

interface StateProps {
    unitSelected: CurrencyUnit;
    profile: user.Profile;
}

interface PortfolioScreenDispatchProps {
    changeUnitSelected: (currency: CurrencyUnit) => void;
    getPortfolios: typeof portfolioActionCreators.getPortfolios;
    sendMailSupportPortfolio: typeof portfolioActionCreators.sendMailSupportPortfolio;
}

const PortfolioScreen = (props: PortfolioScreenDispatchProps & StateProps) => {
    const { t } = useSetting();
    const { getPortfolios, profile, sendMailSupportPortfolio, unitSelected, changeUnitSelected } = props;

    const [data, setData] = useState<portfolio.Data & FlatListLoadData>({
        page: START_PAGE,
        perPage: ITEM_LOAD,
        total: 0,
        table_data: [],
        refreshing: false,
        fetching: true,
        canLoadMore: false,
    });

    useEffect(() => {
        _getPortfolios();
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
                switch (res.type) {
                    case EventBusName.ADD_PORTFOLIO:
                        setData((prevState) => {
                            return {
                                ...prevState,
                                total: prevState.total + 1,
                                table_data: [...res?.payload?.data, ...prevState.table_data],
                            };
                        });
                        return;
                    case EventBusName.EDIT_PORTFOLIO:
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
                    case EventBusName.DELETE_PORTFOLIO:
                        setData((prevState) => {
                            return {
                                ...prevState,
                                total: prevState.total - 1,
                                table_data: prevState.table_data.filter((i) => !res?.payload?.data?.includes(i.id)),
                            };
                        });
                        return;
                    default:
                        return;
                }
            })
        );
    };

    const _getPortfolios = (page: number = START_PAGE, oldTableData: portfolio.Item[] = []) => {
        const payload: portfolio.GetPortfoliosActionPayload = {
            page,
            oldTableData,
            onSuccess,
            onFailure,
        };
        getPortfolios(payload);
    };

    const onSuccess = (_data: portfolio.Data) => {
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

    const goToAddAddressValid = () => {
        if (profile?.limit_alert_wallet > data.total) {
            goToAddAddress();
        } else {
            showDialogLimit();
        }
    };

    const showDialogLimit = () => {
        DialogUtil.showMessageDialog({
            title: t('you_have_reached_address'),
            onConfirm: onSendMailSupport,
            textButtonConfirm: t('send'),
            icon: Images.WARNING,
        }).catch();
    };

    const onSendMailSupport = () => {
        DialogUtil.dismiss();
        sendMailSupportPortfolio();
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
        _getPortfolios();
    };

    const onLoadMore = () => {
        if (data.canLoadMore) {
            _getPortfolios(data.page + 1, data.table_data);
        }
    };

    const renderSeparator = () => <View style={styles.separator} />;

    const renderEmpty = () => (
        <View style={styles.emptyContent}>
            <Svgs.IcBell2 width={scales(48)} height={scales(48)} />
            <Text style={styles.emptyTitle}>{t('no_address')}</Text>
            <Text style={styles.emptyDescription}>{t('tap_to_add_address')}</Text>
        </View>
    );

    const keyExtractor = (item: portfolio.Item, _index: number) => {
        const key = item?.id?.toString();
        return (key || '') + _index;
    };

    const renderItem: ListRenderItem<portfolio.Item> = ({ item }) => (
        <PortfolioItem data={item} unitSelected={unitSelected} />
    );

    const renderFooter = () => data.canLoadMore ? <PortfolioSkeleton isFooter /> : null;

    const renderAddressList = () => data.fetching ? <PortfolioSkeleton /> : (
        <FlatList
            style={styles.container}
            contentContainerStyle={styles.content}
            refreshControl={refreshControl()}
            data={data.table_data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ListEmptyComponent={renderEmpty()}
            ItemSeparatorComponent={renderSeparator}
            ListFooterComponent={renderFooter}
            onEndReached={onLoadMore}
            onEndReachedThreshold={0.01}
            showsVerticalScrollIndicator={false}
        />
    );

    const renderButtonPortfolio = () => (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={goToAddAddressValid}
            style={styles.touchableContainer}
        >
            <LinearGradient
                colors={[Colors.color_4FE54D, Colors.color_1CB21A]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                locations={[0.36, 0.96]}
                style={styles.btnAlerts}
            >
                <Svgs.IcAdd width={scales(24)} height={scales(24)} color={Colors.color_FFFFFF} />
                <Text style={styles.textAlerts}>{t('address')}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );

    const renderHeaderRight = () => (
        <RightHeaderPortfolio
            unitSelected={unitSelected}
            changeUnitSelected={changeUnitSelected}
        />
    );

    const renderHeader = () => (
        <>
            <HeaderMain right={renderHeaderRight()} />
            <LinearGradient
                colors={[Colors.color_000000_10, Colors.transparent]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{ height: scales(8) }}
            />
        </>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderAddressList()}
            {renderButtonPortfolio()}
        </View>
    );
};

const mapState = (state: GlobalState) => ({
    profile: profileInfoSelector(state),
    unitSelected: masterdataUnitSelectedSelector(state),
});

const mapDispatch = {
    getPortfolios: portfolioActionCreators.getPortfolios,
    sendMailSupportPortfolio: portfolioActionCreators.sendMailSupportPortfolio,
    changeUnitSelected: masterdataActionCreators.changeUnitSelected,
};

export default connect(mapState, mapDispatch)(PortfolioScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.color_FFFFFF,
    },
    touchableContainer: {
        position: 'absolute',
        bottom: scales(28),
        right: scales(16),
        zIndex: 1,
    },
    btnAlerts: {
        flexDirection: 'row',
        backgroundColor: Colors.color_199744,
        paddingVertical: scales(8),
        paddingHorizontal: scales(24),
        borderRadius: scales(5),
        alignItems: 'center',
    },
    textAlerts: {
        fontSize: scales(14),
        ...Fonts.w500,
        color: Colors.color_FFFFFF,
        marginLeft: scales(8),
    },
    content: {
        flexGrow: 1,
        paddingBottom: scales(80),
        paddingTop: scales(16),
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
    separator: {
        height: scales(16),
    },
});
