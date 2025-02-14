import { call } from 'redux-saga/effects';

import { AuthorizationMode } from 'constants/constants';
import { postRequest } from 'services/api-requests';

const ROUTES = {
    FORGOT_PASSWORD: 'api/customer/forgot_pwd/',
    FORGOT_PASSWORD_RESEND: 'api/customer/forgot_pwd_resendcode/',
    FORGOT_PASSWORD_CHANGE: 'api/customer/forgot_pwd_change_password/',
};

export function* forgotPassword(data: forgotPassword.ForgotPasswordRequest) {
    const request = postRequest(`${ROUTES.FORGOT_PASSWORD}`, AuthorizationMode.PUBLIC, data);
    return yield call(request);
}

export function* forgotPasswordResend() {
    const request = postRequest(`${ROUTES.FORGOT_PASSWORD_RESEND}`, AuthorizationMode.PUBLIC);
    return yield call(request);
}

export function* forgotPasswordUpdate(data: login.LoginRequest) {
    const request = postRequest(`${ROUTES.FORGOT_PASSWORD_CHANGE}`, AuthorizationMode.PUBLIC, data);
    return yield call(request);
}
