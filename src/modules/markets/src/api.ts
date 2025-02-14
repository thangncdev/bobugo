import { call } from 'redux-saga/effects';

import { AuthorizationMode } from 'constants/constants';
import { getRequest } from 'services/api-requests';

const ROUTES = {
    TOKENS: 'api/mark/token',
    NFTS: 'api/mark/nft',
    SEARCH_TOKEN: 'api/mark/token/get_list_token_search',
    SEARCH_NFT: 'api/mark/nft/get_list_nft_search',
};

export function* getTokens(params: markets.GetTokensRequest) {
    const request = getRequest(`${ROUTES.TOKENS}`, AuthorizationMode.PUBLIC, params);
    return yield call(request);
}

export function* getNfts(params: markets.GetNftsRequest) {
    const request = getRequest(`${ROUTES.NFTS}`, AuthorizationMode.PUBLIC, params);
    return yield call(request);
}

export function* searchToken(params: markets.SearchRequest) {
    const request = getRequest(`${ROUTES.SEARCH_TOKEN}`, AuthorizationMode.PUBLIC, params);
    return yield call(request);
}

export function* searchNfts(params: markets.SearchRequest) {
    const request = getRequest(`${ROUTES.SEARCH_NFT}`, AuthorizationMode.PUBLIC, params);
    return yield call(request);
}
