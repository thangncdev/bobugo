class WalletDetailActions {
    public readonly GET_REWARDS = 'GET_REWARDS';
    public readonly GET_PORTFOLIO = 'GET_PORTFOLIO';
}

export declare namespace walletDetailActionTypes {
    type getRewardsActionType = TypedAction<typeof walletDetailActions.GET_REWARDS, walletDetail.GetRewardsActionPayload>;
    type getPortfolioActionType = TypedAction<typeof walletDetailActions.GET_PORTFOLIO, walletDetail.GetPortfolioActionPayload>;
}

class WalletDetailActionCreators {
    public getRewards = (payload: walletDetail.GetRewardsActionPayload): walletDetailActionTypes.getRewardsActionType => ({ type: walletDetailActions.GET_REWARDS, payload });
    public getPortfolio = (payload: walletDetail.GetPortfolioActionPayload): walletDetailActionTypes.getPortfolioActionType => ({ type: walletDetailActions.GET_PORTFOLIO, payload });
}

export const walletDetailActions = new WalletDetailActions();
export const walletDetailActionCreators = new WalletDetailActionCreators();
