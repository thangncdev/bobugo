import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Svgs from 'assets/svgs';
import { TouchableOpacity } from 'components/base';
import Skeleton from 'components/skeleton/Skeleton';
import { CurrencyUnit } from 'modules/markets/src/constants';
import { userActionCreators } from 'modules/user/src/actions';
import { Colors } from 'themes';
import TextStyles from 'themes/textStyles';
import scales from 'utils/scales';

interface Props {
    portfolio: walletDetail.PortfolioData & FlatListLoadData,
    showBalance: boolean,
    unitSelected: CurrencyUnit;
    toggleBalance: typeof userActionCreators.toggleBalance,
}

const PortfolioBalance = (props: Props) => {
    const { portfolio, showBalance, unitSelected, toggleBalance } = props;

    const totalValue = unitSelected === CurrencyUnit.ADA ? portfolio?.total_value_ada : portfolio?.total_value_usd;
    const totalValueChange = unitSelected === CurrencyUnit.ADA ? portfolio?.total_value_change_ada : portfolio?.total_value_change_usd;

    const renderAsset = () => (
        <View style={styles.assetContainer}>
            <Text style={styles.money}>{showBalance ? totalValue : '******'}</Text>
            <TouchableOpacity onPress={toggleBalance}>
                {showBalance ? <Svgs.IcEye width={scales(24)} height={scales(24)} /> : <Svgs.IcEyeOff width={scales(24)} height={scales(24)} />}
            </TouchableOpacity>
        </View>
    );

    const renderVolatility = () => {
        const isUp = portfolio?.total_value_change_type === 'up';

        return (
            <View style={styles.volatilityContainer}>
                <Text style={[styles.volatility, isUp ? { color: Colors.color_199744 } : {}]}>{totalValueChange}</Text>
            </View>
        );
    };

    const renderSkeletonLoading = () => (
        <View>
            <Skeleton width={scales(100)} height={scales(20)} />
            <View style={{ height: scales(8) }} />
            <Skeleton width={scales(195)} height={scales(20)} />
        </View>
    );

    const renderContent = () => (
        <View>
            {renderAsset()}
            {renderVolatility()}
        </View>
    );

    return (
        <View style={styles.container}>
            {portfolio.fetching ? renderSkeletonLoading() : renderContent()}
        </View>
    )
};
export default PortfolioBalance;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: scales(18),
    },
    assetContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    money: {
        ...TextStyles.H1,
        color: Colors.color_199744,
        marginRight: scales(16),
    },
    volatilityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: scales(8),
    },
    volatility: {
        ...TextStyles.SubTitle3,
        color: Colors.color_CC0A00,
        marginRight: scales(16),
    },
});
