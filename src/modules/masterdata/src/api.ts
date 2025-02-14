import { call } from 'redux-saga/effects';

import { AuthorizationMode } from 'constants/constants';
import { getRequest } from 'services/api-requests';

const ROUTES = {
    TOKEN_HEADER: 'api/mark/token/header',
    TOKEN_ORDERS: 'api/mark/token/order',
    TOKEN_INTERVALS: 'api/mark/token/interval',
    TOKEN_WATCH_LIST_HEADER: 'api/mark/token/get_watch_list_token_header',
    NFT_HEADER: 'api/mark/nft/header',
    NFT_ORDERS: 'api/mark/nft/order/',
    NFT_INTERVALS: 'api/mark/nft/interval',
    NFT_WATCH_LIST_HEADER: 'api/mark/nft/get_watch_list_nft_header',
    SUPPORT_WEBSITE: 'api/support/get_link_website',
};

export function* getTokenHeader() {
    try {
        const request = getRequest(`${ROUTES.TOKEN_HEADER}`, AuthorizationMode.PUBLIC);
        return yield call(request)
    } catch (err) {
        return undefined;
    }
}

export function* getTokenOrders() {
    try {
        const request = getRequest(`${ROUTES.TOKEN_ORDERS}`, AuthorizationMode.PUBLIC);
        return yield call(request);
    } catch (err) {
        return undefined;
    }
}

export function* getTokenIntervals() {
    try {
        const request = getRequest(`${ROUTES.TOKEN_INTERVALS}`, AuthorizationMode.PUBLIC);
        return yield call(request);
    } catch (err) {
        return undefined;
    }
}

export function* getNftHeader() {
    try {
        const request = getRequest(`${ROUTES.NFT_HEADER}`, AuthorizationMode.PUBLIC);
        return yield call(request);
    } catch (err) {
        return undefined;
    }
}

export function* getNftOrders() {
    try {
        const request = getRequest(`${ROUTES.NFT_ORDERS}`, AuthorizationMode.PUBLIC);
        return yield call(request);
    } catch (err) {
        return undefined;
    }
}

export function* getNftIntervals() {
    try {
        const request = getRequest(`${ROUTES.NFT_INTERVALS}`, AuthorizationMode.PUBLIC);
        return yield call(request);
    } catch (err) {
        return undefined;
    }
}

export function* getWatchlistsTokenHeader() {
    try {
        const request = getRequest(`${ROUTES.TOKEN_WATCH_LIST_HEADER}`, AuthorizationMode.PUBLIC);
        return yield call(request)
    } catch (err) {
        return undefined;
    }
}

export function* getWatchlistsNftHeader() {
    try {
        const request = getRequest(`${ROUTES.NFT_WATCH_LIST_HEADER}`, AuthorizationMode.PUBLIC);
        return yield call(request);
    } catch (err) {
        return undefined;
    }
}

export function* getSupportWebsite() {
    try {
        const request = getRequest(`${ROUTES.SUPPORT_WEBSITE}`, AuthorizationMode.PUBLIC);
        return yield call(request);
    } catch (err) {
        return undefined;
    }
}
