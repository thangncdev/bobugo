import { all, call, put, take } from 'redux-saga/effects';

import { launchActions } from 'modules/launch/src/actions';
import { masterdataActionCreators } from 'modules/masterdata/src/actions';
import * as masterdataApi from 'modules/masterdata/src/api';

export function* masterdataRuntime() {
    yield all([
        call(getMasterdataRuntime),
    ]);
}

function* getMasterdataRuntime() {
    while (true) {
        try {
            yield take([launchActions.INIT_DATA]);
            const [
                tokenHeader,
                tokenOrders,
                tokenIntervals,
                nftHeader,
                nftOrders,
                nftIntervals,
                tokenWatchlistsHeader,
                nftWatchlistsHeader,
                supportWebsite,
            ] = yield all([
                call(masterdataApi.getTokenHeader),
                call(masterdataApi.getTokenOrders),
                call(masterdataApi.getTokenIntervals),
                call(masterdataApi.getNftHeader),
                call(masterdataApi.getNftOrders),
                call(masterdataApi.getNftIntervals),
                call(masterdataApi.getWatchlistsTokenHeader),
                call(masterdataApi.getWatchlistsNftHeader),
                call(masterdataApi.getSupportWebsite),
            ]);

            yield put(masterdataActionCreators.getMasterDataSuccess({
                tokenHeader: tokenHeader?.data,
                tokenOrders: tokenOrders?.data,
                tokenIntervals: tokenIntervals?.data,
                nftHeader: nftHeader?.data,
                nftOrders: nftOrders?.data,
                nftIntervals: nftIntervals?.data,
                tokenWatchlistsHeader: tokenWatchlistsHeader?.data,
                nftWatchlistsHeader: nftWatchlistsHeader?.data,
                unitSelected: undefined,
                supportWebsite: supportWebsite?.data,
            }));
        } catch (err) {
            yield put(masterdataActionCreators.getMasterDataFailure(err.message));
        }
    }
}
