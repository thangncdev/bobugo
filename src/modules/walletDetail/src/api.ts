import { call } from 'redux-saga/effects';

import { AuthorizationMode } from 'constants/constants';
import { postRequest } from 'services/api-requests';

const ROUTES = {
    GET_REWARDS: 'api/wallet/rewards/',
    GET_PORTFOLIO: 'api/wallet/portfolio/',
};

export function* getRewards(params: walletDetail.GetRewardsRequest) {
    const request = postRequest(`${ROUTES.GET_REWARDS}`, AuthorizationMode.ACCESS_TOKEN, params);
    return yield call(request);
}

export function* getPortfolio(params: walletDetail.GetPortfolioRequest) {
    const request = postRequest(`${ROUTES.GET_PORTFOLIO}`, AuthorizationMode.ACCESS_TOKEN, params);
    return yield call(request);
}
