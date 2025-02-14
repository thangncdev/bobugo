import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { CurrencyUnit } from 'modules/markets/src/constants';
import { masterdataUnitSelectedSelector } from 'modules/masterdata/src/selectors';
import { userActionCreators } from 'modules/user/src/actions';
import { showBalanceSelector } from 'modules/user/src/selectors';
import { walletDetailActionCreators } from 'modules/walletDetail/src/actions';
import { PORTFOLIO_INIT_DATA } from 'modules/walletDetail/src/constants';
import PortfolioAssets from 'modules/walletDetail/views/components/PortfolioAssets';
import PortfolioBalance from 'modules/walletDetail/views/components/PortfolioBalance';
import scales from 'utils/scales';

interface StateProps {
    showBalance: boolean;
    unitSelected: CurrencyUnit;
}

interface DispatchProps {
    toggleBalance: typeof userActionCreators.toggleBalance;
    getPortfolio: typeof walletDetailActionCreators.getPortfolio;
}

interface Props {
    id: number;
}

type PortfolioModeSceneProps = Props & StateProps & DispatchProps;

const PortfolioModeScene = (props: PortfolioModeSceneProps) => {
    const { showBalance, unitSelected, toggleBalance, getPortfolio } = props;

    const [portfolio, setPortfolio] = useState<walletDetail.PortfolioData & FlatListLoadData>(PORTFOLIO_INIT_DATA);

    useEffect(() => {
        _getPortfolio();
    }, []);

    const _getPortfolio = () => {
        const payload: walletDetail.GetPortfolioActionPayload = {
            id: props.id,
            onSuccess,
            onFailure,

        }
        getPortfolio(payload)
    }


    const onSuccess = (data: walletDetail.PortfolioData) => {
        setPortfolio({
            ...data,
            fetching: false,
            refreshing: false,
            canLoadMore: false,
        });
    }

    const onFailure = () => {
        setPortfolio((prevState) => {
            return {
                ...prevState,
                fetching: false,
                refreshing: false,
            }
        });
    }

    const onRefresh = () => {
        setPortfolio((prevState) => {
            return {
                ...prevState,
                refreshing: true,
            }
        });
        _getPortfolio();
    }


    return (
        <View style={styles.container}>
            <PortfolioBalance
                portfolio={portfolio}
                showBalance={showBalance}
                unitSelected={unitSelected}
                toggleBalance={toggleBalance}
            />
            <PortfolioAssets
                showBalance={showBalance}
                portfolio={portfolio}
                onRefresh={onRefresh}
            />
        </View>
    )
};

const mapState = (state: GlobalState) => ({
    showBalance: showBalanceSelector(state),
    unitSelected: masterdataUnitSelectedSelector(state),
});

const mapDispatch = {
    toggleBalance: userActionCreators.toggleBalance,
    getPortfolio: walletDetailActionCreators.getPortfolio,
};

export default connect(mapState, mapDispatch)(PortfolioModeScene);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: scales(12),
    },
});
