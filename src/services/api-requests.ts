import NetInfo from '@react-native-community/netinfo';
import Config from 'react-native-config';
import UserAgent from 'react-native-user-agent';
import { call, put, select } from 'redux-saga/effects';

import { AuthorizationMode } from 'constants/constants';
import { ResponseCode } from 'constants/http-status';
import { userActionCreators } from 'modules/user/src/actions';
import { accessTokenSelector, isLoginSelector } from 'modules/user/src/selectors';
import { Colors } from 'themes';
import { convertPayloadToQueryString, removeUndefinedField } from 'utils/string';

function getFullUrl(url) {
    if (url.includes('https')) {
        return url;
    }
    return `${Config.END_POINT}/${url}`;
}

export async function _checkConnected() {
    const state = await NetInfo.fetch();
    return state.isConnected;
}

function* getHeader(authorizationMode: AuthorizationMode, customHeaders?: Record<string, unknown>) {
    const header = customHeaders || {};
    if (authorizationMode === AuthorizationMode.ACCESS_TOKEN) {
        header['Authorization'] = yield select(accessTokenSelector);
    }
    return {
        ...header,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': UserAgent.getUserAgent(),
    };
}

function* processResponse(response, needCheckExpire = true) {
    yield call(checkResponseCode, response, needCheckExpire);

    const content = yield response.text();
    return yield dataResponse(content, response, needCheckExpire);
}

function* checkResponseCode(response, needCheckExpire = true) {
    if (!response.ok) {
        // handle catch call api
        if (response.status === ResponseCode.UNAUTHORIZED && needCheckExpire) {
            const isLogin = yield select(isLoginSelector);
            if (isLogin) {
                // TODO: Handle force logout
            }
        } else {
            // error other (#401)
            const content = yield response.text();
            throw yield dataResponse(content, response, needCheckExpire);
        }
    }
}

function* dataResponse(content, response, needCheckExpire = true) {
    let data;
    try {
        data = content ? JSON.parse(content) : {};
        // handle token expire
        if (data.c === -4 && needCheckExpire) {
            const isLogin = yield select(isLoginSelector);
            if (isLogin) {
                yield put(userActionCreators.logout(true));
            }
        }
        logResponse(response, data);
    } catch (error) {
        logResponse(response, error);
        throw error;
    }

    return data;
}

function logRequest(method, url, params) {
    if (__DEV__) {
        console.log(`${method}: ${url}`, params);
    }
}

function logResponse(response, data) {
    if (__DEV__) {
        console.log(
            `%cRESPONSE:%c${' ' + response.url + ' '} %c${response.status}`,
            `color: #fff; background: ${Colors.color_199744}`,
            `color: #fff; background: ${Colors.transparent}`,
            `color: #fff; background: ${response.status === 200 ? Colors.color_199744 : Colors.color_CC0A00}`,
            data
        );
    }
}

export function getRequest(url, authorizationMode: AuthorizationMode, params = {}) {
    return function* rest() {
        const data: object = { ...removeUndefinedField(params) };
        const requestConfig = {
            method: 'GET',
            headers: yield getHeader(authorizationMode),
        };
        const query = convertPayloadToQueryString(data);
        const fullUrl = query ? `${getFullUrl(url)}?${query}` : getFullUrl(url);
        const response = yield call(fetch, fullUrl, requestConfig);

        logRequest('GET', url, data);
        return yield processResponse(response);
    };
}

export function postRequest(url, authorizationMode: AuthorizationMode, params = {}, needCheckExpire = true) {
    return function* rest() {
        const data: object = { ...removeUndefinedField(params) };
        const requestConfig = {
            method: 'POST',
            headers: yield getHeader(authorizationMode),
            body: JSON.stringify(data),
        };
        const response = yield call(fetch, getFullUrl(url), requestConfig);

        logRequest('POST', url, data);
        return yield processResponse(response, needCheckExpire);
    };
}

export function putRequest(url, authorizationMode: AuthorizationMode, params = {}) {
    return function* rest() {
        const data: object = { ...removeUndefinedField(params) };
        const requestConfig = {
            method: 'PUT',
            headers: yield getHeader(authorizationMode),
            body: JSON.stringify(data),
        };
        const response = yield call(fetch, getFullUrl(url), requestConfig);

        logRequest('PUT', url, data);
        return yield processResponse(response);
    };
}

export function postFormData(url, authorizationMode: AuthorizationMode, params) {
    return function* rest() {
        const data = { ...params };
        const requestConfig = {
            method: 'POST',
            headers: {
                ...(yield getHeader(authorizationMode)),
                'Content-Type': 'multipart/form-data',
            },
            body: data,
        };
        const response = yield call(fetch, getFullUrl(url), requestConfig);

        logRequest('POST', url, data);
        return yield processResponse(response);
    };
}

export function delRequest(url, authorizationMode: AuthorizationMode, params = {}) {
    return function* rest() {
        const data: object = { ...removeUndefinedField(params) };
        const requestConfig = {
            method: 'DELETE',
            headers: yield getHeader(authorizationMode),
            body: JSON.stringify(data),
        };
        const response = yield call(fetch, getFullUrl(url), requestConfig);

        logRequest('DELETE', url, data);
        return yield processResponse(response);
    };
}

export function putRequestWithArray(url, authorizationMode: AuthorizationMode, params = []) {
    return function* rest() {
        const data: object = { ...removeUndefinedField(params) };
        const requestConfig = {
            method: 'PUT',
            headers: yield getHeader(authorizationMode),
            body: JSON.stringify(params),
        };
        const response = yield call(fetch, getFullUrl(url), requestConfig);

        logRequest('PUT', url, data);
        return yield processResponse(response);
    };
}
