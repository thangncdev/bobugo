import { call } from 'redux-saga/effects';

import { AuthorizationMode } from 'constants/constants';
import { isTokenKey } from 'modules/tokenDetail/src/utils';
import { postRequest } from 'services/api-requests';

const ROUTES = {
    // Token
    GET_WATCHLISTS_TOKEN: 'api/mark/token/get_watch_list_token/',
    CHECK_TOKEN_EXIST_WATCHLIST: 'api/mark/token/check_token_in_watchlist/',
    ADD_TOKEN_TO_WATCHLIST: 'api/mark/token/add_token_to_watchlist/',
    REMOVE_TOKEN_FROM_WATCHLIST: 'api/mark/token/remove_token_from_watchlist/',
    // Nft
    GET_WATCHLISTS_NFT: 'api/mark/nft/get_watch_list_nft/',
    CHECK_NFT_EXIST_WATCHLIST: 'api/mark/nft/check_nft_in_watchlist/',
    ADD_NFT_TO_WATCHLIST: 'api/mark/nft/add_nft_to_watchlist/',
    REMOVE_NFT_FROM_WATCHLIST: 'api/mark/nft/remove_nft_from_watchlist/',
};

export function* checkExistWatchlists(key: markets.Key) {
    const requestToken = postRequest(`${ROUTES.CHECK_TOKEN_EXIST_WATCHLIST}`, AuthorizationMode.ACCESS_TOKEN, key);
    const requestNft = postRequest(`${ROUTES.CHECK_NFT_EXIST_WATCHLIST}`, AuthorizationMode.ACCESS_TOKEN, key);
    const request = isTokenKey(key) ? requestToken : requestNft;
    return yield call(request);
}

export function* addToWatchlists(key: markets.Key) {
    const requestToken = postRequest(`${ROUTES.ADD_TOKEN_TO_WATCHLIST}`, AuthorizationMode.ACCESS_TOKEN, key);
    const requestNft = postRequest(`${ROUTES.ADD_NFT_TO_WATCHLIST}`, AuthorizationMode.ACCESS_TOKEN, key);
    const request = isTokenKey(key) ? requestToken : requestNft;
    return yield call(request);
}

export function* removeFromWatchlists(key: markets.Key) {
    const requestToken = postRequest(`${ROUTES.REMOVE_TOKEN_FROM_WATCHLIST}`, AuthorizationMode.ACCESS_TOKEN, key);
    const requestNft = postRequest(`${ROUTES.REMOVE_NFT_FROM_WATCHLIST}`, AuthorizationMode.ACCESS_TOKEN, key);
    const request = isTokenKey(key) ? requestToken : requestNft;
    return yield call(request);
}

export function* getWatchlistsToken(params: watchlists.GetWatchlistsTokensRequest) {
    const request = postRequest(`${ROUTES.GET_WATCHLISTS_TOKEN}`, AuthorizationMode.ACCESS_TOKEN, params);
    return yield call(request);
}

export function* getWatchlistsNft(params: watchlists.GetWatchlistsNftsRequest) {
    const request = postRequest(`${ROUTES.GET_WATCHLISTS_NFT}`, AuthorizationMode.ACCESS_TOKEN, params);
    return yield call(request);
}
