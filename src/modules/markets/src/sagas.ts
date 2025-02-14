import { all, takeEvery, takeLatest } from 'redux-saga/effects';

import { ITEM_LOAD } from 'constants/constants';
import { marketActions, marketActionTypes } from 'modules/markets/src/actions';
import * as marketsApi from 'modules/markets/src/api';
import { CurrencyUnit } from 'modules/markets/src/constants';

export function* marketsRuntime() {
    yield all([
        takeEvery(marketActions.GET_TOKENS, getTokens),
        takeEvery(marketActions.GET_NFTS, getNfts),
        takeLatest(marketActions.SEARCH_TOKENS, searchTokens),
        takeLatest(marketActions.SEARCH_NFTS, searchNfts),
    ]);
}

function* getTokens(action: marketActionTypes.getTokensActionType) {
    const { page, type, oldTableData, onSuccess, onFailure } = action.payload;
    try {
        const params: markets.GetTokensRequest = {
            page,
            perPage: ITEM_LOAD,
            type,
        }
        const res: markets.GetNftsResponse = yield marketsApi.getTokens(params);
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

function* getNfts(action: marketActionTypes.getNftsActionType) {
    const { page, ranking, oldTableData, onSuccess, onFailure } = action.payload;
    try {
        const params: markets.GetNftsRequest = {
            page,
            per_page: ITEM_LOAD,
            currency_unit: CurrencyUnit.ADA,
            ranking,
        }
        const res: markets.GetNftsResponse = yield marketsApi.getNfts(params);
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


function* searchTokens(action: marketActionTypes.searchTokensActionType) {
    const { page, name, oldData, onTokensSuccess, onTokensFailure } = action.payload;
    try {
        const params: markets.SearchRequest = {
            page,
            perPage: ITEM_LOAD,
            name,
        }
        const res: markets.SearchTokensResponse = yield marketsApi.searchToken(params);
        if (res.c === 1) {
            onTokensSuccess(
                {
                    ...res.d,
                    dt: [...oldData, ...res.d.dt],
                },
                res.d.dt.length >= ITEM_LOAD
            );
        } else {
            onTokensFailure(res.m);
        }
    } catch (err) {
        onTokensFailure(err.message);
    }
}

function* searchNfts(action: marketActionTypes.searcNftshActionType) {
    const { page, name, oldData, onNftsSuccess, onNftsFailure } = action.payload;
    try {
        const params: markets.SearchRequest = {
            page,
            perPage: ITEM_LOAD,
            name,
        }
        const res: markets.SearchNftsResponse = yield marketsApi.searchNfts(params);
        if (res.c === 1) {
            onNftsSuccess(
                {
                    ...res.d,
                    dt: [...oldData, ...res.d.dt],
                },
                res.d.dt.length >= ITEM_LOAD
            );
        } else {
            onNftsFailure(res.m);
        }
    } catch (err) {
        onNftsFailure(err.message);
    }
}
