import { call } from 'redux-saga/effects';

import { AuthorizationMode } from 'constants/constants';
import { postRequest } from 'services/api-requests';

const ROUTES = {
    REGISTER: 'api/customer/register/',
};

export function* register(data: register.RegisterRequest) {
    const request = postRequest(`${ROUTES.REGISTER}`, AuthorizationMode.PUBLIC, data);
    return yield call(request);
}
