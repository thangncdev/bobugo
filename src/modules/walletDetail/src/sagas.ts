import { all, call, take } from 'redux-saga/effects';

import { ITEM_LOAD } from 'constants/constants';
import { walletDetailActions, walletDetailActionTypes } from 'modules/walletDetail/src/actions';
import * as rewardsApi from 'modules/walletDetail/src/api';

export function* walletDetailRuntime() {
    yield all([call(getRewardsRuntime), call(getPortfolioRuntime)]);
}

function* getRewardsRuntime() {
    while (true) {
        const action: walletDetailActionTypes.getRewardsActionType = yield take(walletDetailActions.GET_REWARDS);
        const { id, page, oldTableData, onSuccess, onFailure } = action.payload;

        try {
            const params: walletDetail.GetRewardsRequest = {
                id,
                page,
                perPage: ITEM_LOAD,
            };

            const res: walletDetail.GetRewardsResponse = yield call(rewardsApi.getRewards, params);
            if (res.c === 1) {
                onSuccess(
                    {
                        ...res.data,
                        table_data: [...oldTableData, ...res.data.table_data],
                    },
                    res.data.table_data.length >= ITEM_LOAD
                );
            } else {
                onFailure(res.m);
            }
        } catch (err) {
            onFailure(err.message);
        }
    }
}

function* getPortfolioRuntime() {
    while (true) {
        const action: walletDetailActionTypes.getPortfolioActionType = yield take(walletDetailActions.GET_PORTFOLIO);
        const { id, onSuccess, onFailure } = action.payload;

        try {
            const res: walletDetail.GetPortfolioResponse = yield call(rewardsApi.getPortfolio, { id });
            if (res.c === 1) {
                onSuccess({ ...res.data });
            } else {
                onFailure(res.m);
            }
        } catch (err) {
            onFailure(err.message);
        }
    }
}
