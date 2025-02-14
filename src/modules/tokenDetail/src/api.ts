import { call } from 'redux-saga/effects';

import { AuthorizationMode } from 'constants/constants';
import { isTokenKey } from 'modules/tokenDetail/src/utils';
import { getRequest } from 'services/api-requests';

const ROUTES = {
    TOKEN_OVERVIEW: 'api/mark/token/overview',
    NFT_OVERVIEW: 'api/mark/nft/overview',
    TOKEN_HISTORY: 'api/mark/token/sale/history',
    NFT_HISTORY: 'api/mark/nft/sale/history',
    TOKEN_POOL_INFO: 'api/mark/token/info',
    NFT_POOL_INFO: 'api/mark/nft/info',
    GET_NEWS_TOKEN_DETAIL: 'api/token/get_list_news_token',
    GET_NEWS_URI: 'api/token/get_detail_new',
};

export function* getOverview(key: markets.Key) {
    const requestToken = getRequest(`${ROUTES.TOKEN_OVERVIEW}`, AuthorizationMode.PUBLIC, key);
    const requestNft = getRequest(`${ROUTES.NFT_OVERVIEW}`, AuthorizationMode.PUBLIC, key);
    const request = isTokenKey(key) ? requestToken : requestNft;

    return yield call(request);
}

export function* getPoolInfo(key: markets.Key) {
    const requestToken = getRequest(`${ROUTES.TOKEN_POOL_INFO}`, AuthorizationMode.PUBLIC, key);
    const requestNft = getRequest(`${ROUTES.NFT_POOL_INFO}`, AuthorizationMode.PUBLIC, key);
    const request = isTokenKey(key) ? requestToken : requestNft;

    return yield call(request);
}

export function* getHistory(params: tokenDetail.GetHistoryRequest) {
    const requestToken = getRequest(`${ROUTES.TOKEN_HISTORY}`, AuthorizationMode.PUBLIC, params);
    const requestNft = getRequest(`${ROUTES.NFT_HISTORY}`, AuthorizationMode.PUBLIC, params);
    const tokenParams = params as tokenDetail.GetHistoryTokenRequest;
    const nftParams = params as tokenDetail.GetHistoryNftRequest;
    const key: markets.Key = tokenParams.unit ? { unit: tokenParams.unit } : { policy: nftParams.policy };
    const request = isTokenKey(key) ? requestToken : requestNft;

    return yield call(request);
}

export function* getNews(params: tokenDetail.GetNewsParams) {
    const request = getRequest(`${ROUTES.GET_NEWS_TOKEN_DETAIL}`, AuthorizationMode.PUBLIC, params);
    return yield call(request);
}

export function* getNewsUri(params: tokenDetail.GetNewsUriParams) {
    const request = getRequest(`${ROUTES.GET_NEWS_URI}`, AuthorizationMode.PUBLIC, params);
    return yield call(request);
}
