import { combineReducers } from 'redux';

import { CurrencyUnit } from 'modules/markets/src/constants';
import { masterdataActions, masterdataActionTypes } from 'modules/masterdata/src/actions';
import { MASTERDATA_INITIAL_STATE } from 'modules/masterdata/src/constants';
import persistReducerUtil from 'redux/persists';

const tokenHeader = (
    state: masterdata.TokenHeader = MASTERDATA_INITIAL_STATE.tokenHeader,
    action: masterdataActionTypes.getMasterDataSuccessActionType,
) => {
    switch (action.type) {
        case masterdataActions.GET_MASTERDATA_SUCCESS:
            return action.payload?.tokenHeader || MASTERDATA_INITIAL_STATE.tokenHeader;
        default:
            return state;
    }
};

const tokenOrders = (
    state: masterdata.NftOrder[] = MASTERDATA_INITIAL_STATE.tokenOrders,
    action: masterdataActionTypes.getMasterDataSuccessActionType,
) => {
    switch (action.type) {
        case masterdataActions.GET_MASTERDATA_SUCCESS:
            return action.payload?.tokenOrders || MASTERDATA_INITIAL_STATE.tokenOrders;
        default:
            return state;
    }
};

const tokenIntervals = (
    state: masterdata.Interval[] = MASTERDATA_INITIAL_STATE.tokenIntervals,
    action: masterdataActionTypes.getMasterDataSuccessActionType,
) => {
    switch (action.type) {
        case masterdataActions.GET_MASTERDATA_SUCCESS:
            return action.payload?.tokenIntervals || MASTERDATA_INITIAL_STATE.tokenIntervals;
        default:
            return state;
    }
};

const nftHeader = (
    state: masterdata.NftHeader = MASTERDATA_INITIAL_STATE.nftHeader,
    action: masterdataActionTypes.getMasterDataSuccessActionType,
) => {
    switch (action.type) {
        case masterdataActions.GET_MASTERDATA_SUCCESS:
            return action.payload?.nftHeader || MASTERDATA_INITIAL_STATE.nftHeader;
        default:
            return state;
    }
};

const nftOrders = (
    state: masterdata.NftOrder[] = MASTERDATA_INITIAL_STATE.nftOrders,
    action: masterdataActionTypes.getMasterDataSuccessActionType,
) => {
    switch (action.type) {
        case masterdataActions.GET_MASTERDATA_SUCCESS:
            return action.payload?.nftOrders || MASTERDATA_INITIAL_STATE.nftOrders;
        default:
            return state;
    }
};

const nftIntervals = (
    state: masterdata.Interval[] = MASTERDATA_INITIAL_STATE.nftIntervals,
    action: masterdataActionTypes.getMasterDataSuccessActionType,
) => {
    switch (action.type) {
        case masterdataActions.GET_MASTERDATA_SUCCESS:
            return action.payload?.nftIntervals || MASTERDATA_INITIAL_STATE.nftIntervals;
        default:
            return state;
    }
};

const unitSelected = (
    state: CurrencyUnit = MASTERDATA_INITIAL_STATE.unitSelected,
    action: masterdataActionTypes.changeUnitSelectedActionType,
) => {
    switch (action.type) {
        case masterdataActions.CHANGE_UNIT_SELECTED:
            return action.payload || MASTERDATA_INITIAL_STATE.unitSelected;
        default:
            return state;
    }
}

const tokenWatchlistsHeader = (
    state: masterdata.TokenWatchlistHeader = MASTERDATA_INITIAL_STATE.tokenWatchlistsHeader,
    action: masterdataActionTypes.getMasterDataSuccessActionType,
) => {
    switch (action.type) {
        case masterdataActions.GET_MASTERDATA_SUCCESS:
            return action.payload?.tokenWatchlistsHeader || MASTERDATA_INITIAL_STATE.tokenWatchlistsHeader;
        default:
            return state;
    }
};

const nftWatchlistsHeader = (
    state: masterdata.NftWatchlistHeader = MASTERDATA_INITIAL_STATE.nftWatchlistsHeader,
    action: masterdataActionTypes.getMasterDataSuccessActionType,
) => {
    switch (action.type) {
        case masterdataActions.GET_MASTERDATA_SUCCESS:
            return action.payload?.nftWatchlistsHeader || MASTERDATA_INITIAL_STATE.nftWatchlistsHeader;
        default:
            return state;
    }
};

const supportWebsite = (
    state: masterdata.SupportWebsite = MASTERDATA_INITIAL_STATE.supportWebsite,
    action: masterdataActionTypes.getMasterDataSuccessActionType,
) => {
    switch (action.type) {
        case masterdataActions.GET_MASTERDATA_SUCCESS:
            return action.payload?.supportWebsite || MASTERDATA_INITIAL_STATE.supportWebsite;
        default:
            return state;
    }
};

const masterdataReducer = combineReducers({
    tokenHeader,
    tokenOrders,
    tokenIntervals,
    nftHeader,
    nftOrders,
    nftIntervals,
    tokenWatchlistsHeader,
    nftWatchlistsHeader,
    unitSelected,
    supportWebsite,
});

export default persistReducerUtil(
    'masterdata',
    masterdataReducer,
    ['tokenHeader', 'tokenOrders', 'tokenIntervals',
     'nftHeader', 'nftOrders', 'nftIntervals',
     'tokenWatchlistsHeader', 'nftWatchlistsHeader', 'unitSelected'],
);
