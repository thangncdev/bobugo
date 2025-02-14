import { all, call, take } from 'redux-saga/effects';

import { ITEM_LOAD } from 'constants/constants';
import { tokenDetailActions, tokenDetailActionTypes } from 'modules/tokenDetail/src/actions';
import * as tokenDetailApi from 'modules/tokenDetail/src/api';

export function* tokenDetailRuntime() {
    yield all([
        call(getOverviewRuntime),
        call(getHistoryRuntime),
        call(getPoolInfoRuntime),
        call(getNewsRuntime),
        call(getNewsUriRuntime),
    ]);
}

function* getOverviewRuntime() {
    while (true) {
        const action: tokenDetailActionTypes.getOverviewActionType = yield take(tokenDetailActions.GET_OVERVIEW);
        const { key, onSuccess, onFailure } = action.payload;

        try {
            const res: tokenDetail.GetOverviewResponse = yield call(tokenDetailApi.getOverview, key);
            if (res.c === 1) {
                onSuccess(res.data);
            } else {
                onFailure();
            }
        } catch (err) {
            onFailure();
        }
    }
}

function* getHistoryRuntime() {
    while (true) {
        const action: tokenDetailActionTypes.getHistoryActionType = yield take(tokenDetailActions.GET_HISTORY);
        const { key, page, timeframe, oldTableData, onSuccess, onFailure } = action.payload;

        try {
            const params: tokenDetail.GetHistoryRequest = {
                ...key,
                page,
                perPage: ITEM_LOAD,
                timeframe,
                order: 'desc',
                sortBy: 'time',
            }
            const res: tokenDetail.GetHistoryResponse = yield call(tokenDetailApi.getHistory, params);
            if (res.c === 1) {
                onSuccess(
                    {
                        ...res.data,
                        table_data: [...oldTableData, ...res.data.table_data],
                    },
                    res.data.table_data.length >= ITEM_LOAD
                );
            } else {
                onFailure();
            }
        } catch (err) {
            onFailure();
        }
    }
}

function* getPoolInfoRuntime() {
    while (true) {
        const action: tokenDetailActionTypes.getPoolInfoActionType = yield take(tokenDetailActions.GET_POOL_INFO);
        const { key, onSuccess, onFailure } = action.payload;

        try {
            const res: tokenDetail.PoolInfoResponse = yield call(tokenDetailApi.getPoolInfo, key);
            if (res.c === 1) {
                onSuccess(res.data);
            } else {
                onFailure();
            }
        } catch (err) {
            onFailure();
            global.showToastError(err.message);
        }
    }
}


function* getNewsRuntime() {
    while (true) {
        const action: tokenDetailActionTypes.getNewsActionType = yield take(tokenDetailActions.GET_NEWS);
        const { page, per_page, key, onSuccess, onFailure, currentData } = action.payload;

        try {
            const params: tokenDetail.GetNewsParams = {
                page,
                per_page,
                key,
            };

            const res: tokenDetail.GetNewsResponse = yield call(tokenDetailApi.getNews, params);
            if (res.c === 1) {
                onSuccess({
                    ...res.data,
                    table_data: [...currentData, ...res.data.table_data],
                });
            } else {
                global.showToastError(res.m);
                onFailure();
            }
        } catch (err) {
            onFailure();
            global.showToastError(err.message);
        }
    }
}

function* getNewsUriRuntime() {
    while (true) {
        const action: tokenDetailActionTypes.getNewsUriActionType = yield take(tokenDetailActions.GET_NEWS_URI);
        const { onSuccess, onFailure } = action.payload;

        try {
            const params: tokenDetail.GetNewsUriParams = {
                newId: action.payload.newsId,
            };

            const res: tokenDetail.GetNewsUriResponse = yield call(tokenDetailApi.getNewsUri, params);

            if (res.c === 1) {
                onSuccess(res.data);
            } else {
                global.showToastError(res.m);
                onFailure();
            }
        } catch (err) {
            onFailure();
            global.showToastError(err.message);
        }
    }
}
