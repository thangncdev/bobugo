import { call } from 'redux-saga/effects';

import { AuthorizationMode } from 'constants/constants';
import { postRequest } from 'services/api-requests';

const ROUTES = {
    PROFILE: 'api/customer/get_infor/',
    DELETE_PROFILE: 'api/customer/delete/',
    CHANGE_PASSWORD: 'api/customer/update_password/',
    LOGOUT: 'api/customer/logout/',
};

export function* getProfile() {
    const request = postRequest(`${ROUTES.PROFILE}`, AuthorizationMode.ACCESS_TOKEN);
    return yield call(request);
}

export function* deleteProfile() {
    const request = postRequest(`${ROUTES.DELETE_PROFILE}`, AuthorizationMode.ACCESS_TOKEN);
    return yield call(request);
}

export function* changePassword(data: user.ChangePasswordRequest) {
    const request = postRequest(`${ROUTES.CHANGE_PASSWORD}`, AuthorizationMode.ACCESS_TOKEN, data);
    return yield call(request);
}

export function* logout() {
    try {
        const request = postRequest(`${ROUTES.LOGOUT}`, AuthorizationMode.ACCESS_TOKEN, {}, false);
        return yield call(request);
    } catch (err) {
        return undefined;
    }
}
