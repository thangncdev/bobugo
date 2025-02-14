import { all, call, take, takeEvery, takeLatest } from 'redux-saga/effects';

import { ITEM_LOAD } from 'constants/constants';
import { watchlistActions, watchlistActionTypes } from 'modules/watchlists/src/actions';
import * as watchlistsApi from 'modules/watchlists/src/api';
import { EventBusName, onPushEventBus } from 'services/event-bus';

export function* watchlistsRuntime() {
    yield all([
        call(checkExistWatchlistsTokenRuntime),
        takeLatest(watchlistActions.ADD_TO_WATCHLISTS, addToWatchlists),
        takeLatest(watchlistActions.REMOVE_FROM_WATCHLISTS, removeFromWatchlists),
        takeEvery(watchlistActions.GET_WATCHLISTS_TOKEN,getWatchlistsToken),
        takeEvery(watchlistActions.GET_WATCHLISTS_NFT, getWatchlistsNft),
    ]);
}

function* checkExistWatchlistsTokenRuntime() {
    while (true) {
        const action: watchlistActionTypes.checkExistWatchlistsActionType = yield take(watchlistActions.CHECK_EXIST_WATCHLISTS);
        const { key, onSuccess } = action.payload;

        try {
            const res = yield call(watchlistsApi.checkExistWatchlists, key);
            if (res.c === 1 && (res.data.unit || res.data.policy)) {
                onSuccess();
            } else {
                // TODO: No need action
            }
        } catch (err) {
            // TODO: No need action
        }
    }
}

function* addToWatchlists(action: watchlistActionTypes.addToWatchlistsActionType) {
    const { key, onFailure } = action.payload;
    try {
        const res: Response = yield call(watchlistsApi.addToWatchlists, key);
        if (res.c === 1) {
            onPushEventBus(EventBusName.CHANGE_WATCHLISTS, key);
        } else {
            onFailure();
            global.showToastError(res.m);
        }
    } catch (err) {
        onFailure();
        global.showToastError(err.message);
    }
}

function* removeFromWatchlists(action: watchlistActionTypes.removeFromWatchlistsActionType) {
    const { key, onFailure } = action.payload;
    try {
        const res: Response = yield call(watchlistsApi.removeFromWatchlists, key);
        if (res.c === 1) {
            onPushEventBus(EventBusName.CHANGE_WATCHLISTS, key);
        } else {
            onFailure();
            global.showToastError(res.m);
        }
    } catch (err) {
        onFailure();
        global.showToastError(err.message);
    }
}

function* getWatchlistsToken(action: watchlistActionTypes.getWatchlistsTokenActionType) {
    const { page, oldTableData, onSuccess, onFailure } = action.payload;
        try {
            const params: watchlists.GetWatchlistsTokensRequest = {
                page,
                perPage: ITEM_LOAD,
            }
            const res: watchlists.GetWatchlistsResponse = yield watchlistsApi.getWatchlistsToken(params);
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

function* getWatchlistsNft(action: watchlistActionTypes.getWatchlistsNftActionType) {
        const { page, oldTableData, onSuccess, onFailure } = action.payload;
        try {
            const params: watchlists.GetWatchlistsTokensRequest = {
                page,
                perPage: ITEM_LOAD,
            }
            const res: watchlists.GetWatchlistsResponse = yield watchlistsApi.getWatchlistsNft(params);
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
