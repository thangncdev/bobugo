import { all, call, takeEvery, takeLatest } from 'redux-saga/effects';

import { ITEM_LOAD } from 'constants/constants';
import { popToTop } from 'modules/navigation/src/utils';
import { portfolioActions, portfolioActionTypes } from 'modules/portfolio/src/action';
import * as portfolioApi from 'modules/portfolio/src/api';
import { EventBusName, onPushEventBus } from 'services/event-bus';

export function* portfolioRuntime() {
    yield all([
        takeEvery(portfolioActions.GET_PORTFOLIOS, getPortfolios),
        takeLatest(portfolioActions.ADD_PORTFOLIO, addPortfolio),
        takeLatest(portfolioActions.EDIT_PORTFOLIO, editPortfolio),
        takeLatest(portfolioActions.DELETE_PORTFOLIO, deletePortfolio),
        takeLatest(portfolioActions.SEND_MAIL_SUPPORT_PORTFOLIO, sendMailSupportPortfolio),
    ]);
}

function* getPortfolios(action: portfolioActionTypes.getPortfoliosActionType) {
    const { page, oldTableData, onSuccess, onFailure } = action.payload;
    try {
        const params: portfolio.GetPortfoliosRequest = {
            page,
            perPage: ITEM_LOAD,
        }
        const res: portfolio.GetPortfoliosResponse = yield portfolioApi.getPortfolios(params);
        if (res?.c === 1) {
            onSuccess(
                { ...res.d, table_data: [...oldTableData, ...res.d.table_data] },
            );
        } else {
            onFailure(res?.m);
        }
    } catch (err) {
        onFailure(err.message);
    }
}

function* addPortfolio(action: portfolioActionTypes.addPortfolioActionType) {
    try {
        global.showLoading();
        const res: portfolio.AddPortfolioResponse = yield call(portfolioApi.addPortfolio, action.payload);
        if (res?.c === 1) {
            global.showToastSuccess(res?.m);
            global.hideLoading();
            onPushEventBus(EventBusName.ADD_PORTFOLIO, { data: [res.d] });
            popToTop();
        } else {
            global.showToastError(res?.m);
            global.hideLoading();
        }
    } catch (err) {
        global.showToastError(err.message);
        global.hideLoading();
    }
}

function* editPortfolio(action: portfolioActionTypes.editPortfolioActionType) {
    try {
        global.showLoading();
        const res = yield call(portfolioApi.editPortfolio, action.payload);
        if (res?.c === 1) {
            global.showToastSuccess(res?.m);
            global.hideLoading();
            onPushEventBus(EventBusName.EDIT_PORTFOLIO, { data: action.payload });
            popToTop();
        } else {
            global.showToastError(res?.m);
            global.hideLoading();
        }
    } catch (err) {
        global.showToastError(err.message);
        global.hideLoading();
    }
}

function* deletePortfolio(action: portfolioActionTypes.deletePortfolioActionType) {
    try {
        global.showLoading();
        const res = yield call(portfolioApi.deletePortfolio, action.payload);
        if (res?.c === 1) {
            global.showToastSuccess(res?.m);
            global.hideLoading();
            onPushEventBus(EventBusName.DELETE_PORTFOLIO, { data: action.payload });
        } else {
            global.showToastError(res?.m);
            global.hideLoading();
        }
    } catch (err) {
        global.showToastError(err.message);
        global.hideLoading();
    }
}

function* sendMailSupportPortfolio() {
    try {
        yield call(portfolioApi.sendMailSupportPortfolio);
    } catch (err) {
        // TODO
    }
}


