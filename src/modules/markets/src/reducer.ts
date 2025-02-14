import { combineReducers } from 'redux';

import { marketActions, marketActionTypes } from 'modules/markets/src/actions';
import { SEARCH_NFTS_DATA, SEARCH_TOKENS_DATA } from 'modules/markets/src/constants';
import persistReducerUtil from 'redux/persists';

const tokensRecently = (
    state: markets.SearchTokensItem[] = SEARCH_TOKENS_DATA.dt,
    action: marketActionTypes.saveTokensActionType,
) => {
    switch (action.type) {
        case marketActions.SAVE_TOKENS_RECENTLY:
            const arr = state.filter((item) => item.unit !== action.payload.unit)
            return [{...action.payload, isRecently: true}, ...arr];
        default:
            return state;
    }
};

const nftsRecently = (
    state: markets.SearchNftItem[] = SEARCH_NFTS_DATA.dt,
    action: marketActionTypes.saveNftsActionType,
) => {
    switch (action.type) {
        case marketActions.SAVE_NFTS_RECENTLY:
            const arr = state.filter((item) => item.policy !== action.payload.policy)
            return [{...action.payload, isRecently: true}, ...arr];
        default:
            return state;
    }
};

const marketsReducer = combineReducers({
    tokensRecently,
    nftsRecently,
});

export default persistReducerUtil(
    'markets',
    marketsReducer,
    ['tokensRecently', 'nftsRecently'],
);
