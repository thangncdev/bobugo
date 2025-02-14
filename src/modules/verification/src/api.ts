import { call } from 'redux-saga/effects';

import { AuthorizationMode } from 'constants/constants';
import { postRequest } from 'services/api-requests';

const ROUTES = {
    RESEND_CODE: 'api/customer/resendcode/',
    ACTIVE_CUSTOMER: 'api/customer/active/',
};

export function* resendCode(data: verification.ResendCodeRequest) {
    const request = postRequest(`${ROUTES.RESEND_CODE}`, AuthorizationMode.PUBLIC, data);
    return yield call(request);
}

export function* activeCustomer(data: verification.ActiveCustomerRequest) {
    const request = postRequest(`${ROUTES.ACTIVE_CUSTOMER}`, AuthorizationMode.PUBLIC, data);
    return yield call(request);
}
