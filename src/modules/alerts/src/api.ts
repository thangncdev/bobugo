import { call } from 'redux-saga/effects';

import { AuthorizationMode } from 'constants/constants';
import { postRequest } from 'services/api-requests';

const ROUTES = {
    GET_TOKEN_ALERT: 'api/alerts/token/list/',
    ADD_TOKEN_ALERT: 'api/alerts/token/add/',
    EDIT_ALERT_TOKEN: 'api/alerts/token/edit/',
    DELETE_TOKEN_ALERT: 'api/alerts/token/delete/',
    ACTIVATE_TOKEN_ALERT: 'api/alerts/token/active/',
    DEACTIVATE_TOKEN_ALERT: 'api/alerts/token/diactive/',
    SEND_MAIL_SUPPORT_TOKEN_ALERT: 'api/alerts/token/send_email_support_upgrade/',

    GET_NFT_ALERT: 'api/alerts/nft/list/',
    ADD_NFT_ALERT: 'api/alerts/nft/add/',
    EDIT_ALERT_NFT: 'api/alerts/nft/edit/',
    DELETE_NFT_ALERT: 'api/alerts/nft/delete/',
    ACTIVATE_NFT_ALERT: 'api/alerts/nft/active/',
    DEACTIVATE_NFT_ALERT: 'api/alerts/nft/diactive/',
    SEND_MAIL_SUPPORT_NFT_ALERT: 'api/alerts/nft/send_email_support_upgrade/',

};

export function* getAlerts(index: number, data: alerts.GetAlertsRequest) {
    const route = index === 0 ? ROUTES.GET_TOKEN_ALERT : ROUTES.GET_NFT_ALERT;
    const request = postRequest(route, AuthorizationMode.ACCESS_TOKEN, data);
    return yield call(request);
}

export function* deleteAlerts(index: number, ids: number[]) {
    const route = index === 0 ? ROUTES.DELETE_TOKEN_ALERT : ROUTES.DELETE_NFT_ALERT;
    const request = postRequest(route, AuthorizationMode.ACCESS_TOKEN, { ids: ids.join(',') });
    return yield call(request);
}

export function* activateAlerts(index: number, ids: number[]) {
    const route = index === 0 ? ROUTES.ACTIVATE_TOKEN_ALERT : ROUTES.ACTIVATE_NFT_ALERT;
    const request = postRequest(route, AuthorizationMode.ACCESS_TOKEN, { ids: ids.join(',') });
    return yield call(request);
}

export function* deactivateAlerts(index: number, ids: number[]) {
    const route = index === 0 ? ROUTES.DEACTIVATE_TOKEN_ALERT : ROUTES.DEACTIVATE_NFT_ALERT;
    const request = postRequest(route, AuthorizationMode.ACCESS_TOKEN, { ids: ids.join(',') });
    return yield call(request);
}

export function* sendMailSupportAlert(index: number) {
    const route = index === 0 ? ROUTES.SEND_MAIL_SUPPORT_TOKEN_ALERT : ROUTES.SEND_MAIL_SUPPORT_NFT_ALERT;
    const request = postRequest(route, AuthorizationMode.ACCESS_TOKEN);
    return yield call(request);
}

// token region
export function* addTokenAlert(data: alerts.AddTokenAlertRequest) {
    const request = postRequest(`${ROUTES.ADD_TOKEN_ALERT}`, AuthorizationMode.ACCESS_TOKEN, data);
    return yield call(request);
}

export function* editTokenAlert(data: alerts.EditTokenAlertRequest) {
    const request = postRequest(`${ROUTES.EDIT_ALERT_TOKEN}`, AuthorizationMode.ACCESS_TOKEN, data);
    return yield call(request);
}

// nft region
export function* addNftAlert(data: alerts.AddNftAlertRequest) {
    const request = postRequest(`${ROUTES.ADD_NFT_ALERT}`, AuthorizationMode.ACCESS_TOKEN, data);
    return yield call(request);
}

export function* editNftAlert(data: alerts.EditNftAlertRequest) {
    const request = postRequest(`${ROUTES.EDIT_ALERT_NFT}`, AuthorizationMode.ACCESS_TOKEN, data);
    return yield call(request);
}
