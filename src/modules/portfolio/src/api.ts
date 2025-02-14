import { call } from 'redux-saga/effects';

import { AuthorizationMode } from 'constants/constants';
import { postRequest } from 'services/api-requests';

const ROUTES = {
    GET_PORTFOLIOS : 'api/wallet/list/',
    ADD_PORTFOLIO : 'api/wallet/add/',
    EDIT_PORTFOLIO : 'api/wallet/edit/',
    DELETE_PORTFOLIO : 'api/wallet/delete/',
    SEND_MAIL_SUPPORT_PORTFOLIO: 'api/wallet/send_email_support_upgrade/',
};

export function* getPortfolios(data: portfolio.GetPortfoliosRequest) {
    const request = postRequest(ROUTES.GET_PORTFOLIOS, AuthorizationMode.ACCESS_TOKEN, data);
    return yield call(request);
}

export function* addPortfolio(data: portfolio.AddPortfolioRequest) {
    const request = postRequest(ROUTES.ADD_PORTFOLIO, AuthorizationMode.ACCESS_TOKEN, data);
    return yield call(request);
}

export function* editPortfolio(data: portfolio.EditPortfolioRequest) {
    const request = postRequest(ROUTES.EDIT_PORTFOLIO, AuthorizationMode.ACCESS_TOKEN, data);
    return yield call(request);
}

export function* deletePortfolio(ids: number[]) {
    const request = postRequest(ROUTES.DELETE_PORTFOLIO, AuthorizationMode.ACCESS_TOKEN, { ids: ids.join(',') });
    return yield call(request);
}

export function* sendMailSupportPortfolio() {
    const request = postRequest(ROUTES.SEND_MAIL_SUPPORT_PORTFOLIO, AuthorizationMode.ACCESS_TOKEN);
    return yield call(request);
}
