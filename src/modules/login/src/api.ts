import { call } from 'redux-saga/effects';

import { AuthorizationMode } from 'constants/constants';
import { postRequest } from 'services/api-requests';

const ROUTES = {
    LOGIN: 'api/customer/login/',
    LOGIN_WITH_GG: 'api/customer/login_by_google_account/',
    LOGIN_WITH_APPLE: 'api/customer/login_by_apple_account/',
    UPDATE_FCM_TOKEN: 'api/customer/update_firebase_id/',
};

export function* login(data: login.LoginRequest) {
    const request = postRequest(`${ROUTES.LOGIN}`, AuthorizationMode.PUBLIC, data);
    return yield call(request);
}

export function* loginWithGG(idtoken: string) {
    const request = postRequest(`${ROUTES.LOGIN_WITH_GG}`, AuthorizationMode.PUBLIC, { idtoken });
    return yield call(request);
}

export function* loginWithApple(data: login.LoginWithAppleRequest) {
    const request = postRequest(`${ROUTES.LOGIN_WITH_APPLE}`, AuthorizationMode.PUBLIC, data);
    return yield call(request);
}

export function* updateFCMToken(data: login.UpdateFCMTokenRequest) {
    const request = postRequest(`${ROUTES.UPDATE_FCM_TOKEN}`, AuthorizationMode.ACCESS_TOKEN, data);
    return yield call(request);
}
