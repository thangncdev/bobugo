import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import Images from 'assets/images';
import Svgs from 'assets/svgs';
import { TouchableOpacity } from 'components/base';
import DialogUtil from 'components/dialog';
import Skeleton from 'components/skeleton/Skeleton';
import { DialogType } from 'constants/constants';
import { useSetting } from 'contexts/SettingProvider';
import { goToAddNftAlert, goToAddTokenAlert } from 'modules/alerts/src/utils';
import { CurrencyUnit } from 'modules/markets/src/constants';
import { navigate } from 'modules/navigation/src/utils';
import { tokenDetailActionCreators } from 'modules/tokenDetail/src/actions';
import { isTokenKey } from 'modules/tokenDetail/src/utils';
import { isLoginSelector } from 'modules/user/src/selectors';
import { Colors, Fonts, Sizes } from 'themes';
import scales from 'utils/scales';

interface DispatchProps {
    getOverview: typeof tokenDetailActionCreators.getOverview;
}

interface StateProps {
    isLogin: boolean;
    unitSelected: CurrencyUnit;
}

interface Props {
    token: tokenDetail.RouteParams;
}

type OverviewProps = Props & StateProps & DispatchProps;

const Overview = (props: OverviewProps) => {
    const { t } = useSetting();
    const { isLogin, token, unitSelected, getOverview } = props;

    const [overview, setOverview] = useState<tokenDetail.OverviewData>();
    const [fetching, setFetching] = useState<boolean>(true);

    useEffect(() => {
        _getOverview();
    }, []);

    const _getOverview = () => {
        const payload: tokenDetail.GetOverviewActionPayload = {
            key: token.key,
            onSuccess,
            onFailure,
        };
        getOverview(payload);
    };

    const onSuccess = (data: tokenDetail.OverviewData) => {
        setOverview(data);
        setFetching(false);
    };

    const onFailure = () => {
        setFetching(false);
    };

    const getColor = (isNegative: boolean) => {
        return isNegative ? Colors.color_CC0A00 : Colors.color_199744;
    }

    const renderName = () => (
        <Text style={styles.name}>
            {overview?.name || token?.name}
        </Text>
    );

    const renderInfo = () => (
        <View style={styles.info}>
            {renderLeftInfo()}
            {renderRightInfo()}
        </View>
    );

    const renderLeftInfo = () => (
        <View>
            {renderPrice()}
            {renderSubPrice()}
        </View>
    );

    const renderPrice = () => {
        const price = unitSelected === CurrencyUnit.ADA ? (overview?.price || '0.00₳') : (overview?.usd || '0.00$');
        return (
            <View style={styles.viewPrice}>
                {fetching ? (
                    <Skeleton width={scales(100)} height={scales(30)} />
                ) : (
                    <Text style={styles.price}>{price}</Text>
                )}
            </View>
        );
    }

    const renderSubPrice = () => {
        const subPrice = unitSelected === CurrencyUnit.ADA ? (overview?.usd || '0.00$') : (overview?.price || '0.00₳');
        return (
            <View>
                {fetching ? (
                    <Skeleton width={Sizes.screenWidth / 2 - scales(50)} height={scales(20)} />
                ) : (
                    <View style={styles.row}>
                        <View style={styles.row}>
                            <Svgs.IcArrowDownUp width={scales(16)} height={scales(16)} />
                            <Text style={styles.subPrice}>{subPrice}</Text>
                        </View>
                        {renderPriceChange()}
                    </View>
                )}
            </View>
        );
    }

    const renderPriceChange = () => {
        const pricePctChg = overview?.pricePctChg || '0.00%(24h)';
        const isNegativePricePctChg = pricePctChg?.includes('-');

        return (
            <View style={[styles.row, { paddingLeft: scales(8) }]}>
                <View style={{ transform: [{ rotate: isNegativePricePctChg ? '180deg' : '0deg' }] }}>
                    <Svgs.IcArrowUpFill width={scales(16)} height={scales(16)} color={getColor(isNegativePricePctChg)} />
                </View>
                <Text style={[styles.subPrice, { color: getColor(isNegativePricePctChg) }]}>
                    {pricePctChg}
                </Text>
            </View>
        );
    };

    const renderRightInfo = () => {
        const volumePctChg = overview?.volumePctChg || '0.00%';
        const isNegativeVolumePctChg = volumePctChg?.includes('-');

        return (
            <View style={styles.row}>
                <TouchableOpacity onPress={onSetAlert}>
                    <Svgs.IcBell width={scales(32)} height={scales(32)} />
                </TouchableOpacity>
                <View style={{ width: scales(8) }} />
                <View>
                    {fetching ? (
                        <Skeleton width={scales(90)} height={scales(32)} />
                    ) : (
                        <View style={[styles.volumeChangeView, { backgroundColor: getColor(isNegativeVolumePctChg) }]}>
                            <View style={{ transform: [{ rotate: isNegativeVolumePctChg ? '180deg' : '0deg' }] }}>
                                <Svgs.IcArrowUpFill width={scales(24)} height={scales(24)} color={Colors.color_FFFFFF} />
                            </View>
                            <Text style={styles.volumeChange}>
                                {volumePctChg}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        );
    };

    const onSetAlert = () => {
        if (!isLogin) {
            DialogUtil.showMessageDialog({
                type: DialogType.TWO,
                icon: Images.WARNING,
                title: t('need_login'),
                onConfirm: () => goToLogin(),
            }).catch();
            return;
        }
        if (isTokenKey(token.key)) {
            const tokenKey = token?.key as markets.TokenKey;
            goToAddTokenAlert(
                tokenKey?.unit,
                token?.name,
                overview?.price,
                overview?.usd,
            );
        } else {
            const nftKey = token?.key as markets.NftKey;
            goToAddNftAlert(
                nftKey?.policy,
                token?.name,
                token?.logo,
                overview?.price,
            );
        }
    };

    const goToLogin = () => {
        DialogUtil.dismiss()
        navigate('Login');
    }

    return (
        <View style={styles.container}>
            {renderName()}
            {renderInfo()}
        </View>
    )
};

const mapState = (state: GlobalState) => ({
    isLogin: isLoginSelector(state),
    unitSelected: state.masterdata.unitSelected,
});

const mapDispatch = {
    getOverview: tokenDetailActionCreators.getOverview,
}

export default connect(mapState, mapDispatch)(Overview);

const styles = StyleSheet.create({
    container: {
        paddingVertical: scales(8),
        paddingHorizontal: scales(16),
    },
    name: {
        ...Fonts.w700,
        color: Colors.color_090F24,
        fontSize: scales(16),
        lineHeight: scales(24),
        paddingBottom: scales(16),
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    viewPrice: {
        paddingBottom: scales(8),
    },
    price: {
        ...Fonts.w400,
        color: Colors.color_199744,
        fontSize: scales(30),
        lineHeight: scales(35),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subPrice: {
        ...Fonts.w500,
        fontSize: scales(12),
        lineHeight: scales(20),
        paddingLeft: scales(4),
        color: Colors.color_5E626F,
    },
    volumeChangeView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scales(4),
        height: scales(32),
        borderRadius: scales(5),
    },
    volumeChange: {
        ...Fonts.w500,
        fontSize: scales(16),
        lineHeight: scales(24),
        color: Colors.color_FFFFFF,
    },
});
