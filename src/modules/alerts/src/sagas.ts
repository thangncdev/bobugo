import { all, call, takeEvery, takeLatest } from 'redux-saga/effects';

import { ITEM_LOAD } from 'constants/constants';
import { alertActions, alertActionTypes } from 'modules/alerts/src/action';
import * as alertApi from 'modules/alerts/src/api';
import { popToTop } from 'modules/navigation/src/utils';
import { EventBusName, onPushEventBus } from 'services/event-bus';

export function* alertRuntime() {
    yield all([
        takeLatest(alertActions.ADD_TOKEN_ALERT, addTokenAlert),
        takeLatest(alertActions.EDIT_TOKEN_ALERT, editTokenAlert),

        takeLatest(alertActions.ADD_NFT_ALERT, addNftAlert),
        takeLatest(alertActions.EDIT_NFT_ALERT, editNftAlert),

        takeEvery(alertActions.GET_ALERTS, getAlerts),
        takeLatest(alertActions.DELETE_ALERTS, deleteAlerts),
        takeLatest(alertActions.ACTIVATE_ALERTS, activateAlerts),
        takeLatest(alertActions.DEACTIVATE_ALERTS, deactivateAlerts),
        takeLatest(alertActions.SEND_MAIL_SUPPORT_ALERT, sendMailSupportAlert),
    ]);
}

// token region
function* addTokenAlert(action: alertActionTypes.addTokenAlertActionType) {
    try {
        global.showLoading();
        const res: alerts.AddTokenAlertResponse = yield call(alertApi.addTokenAlert, action.payload);
        if (res?.c === 1) {
            global.showToastSuccess(res?.m);
            global.hideLoading();
            onPushEventBus(EventBusName.ADD_ALERT, { index: 0, data: [res.d] });
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

function* editTokenAlert(action: alertActionTypes.editTokenAlertActionType) {
    try {
        global.showLoading();
        const res = yield call(alertApi.editTokenAlert, action.payload);
        if (res?.c === 1) {
            global.showToastSuccess(res?.m);
            global.hideLoading();
            onPushEventBus(EventBusName.EDIT_ALERT, { index: 0, data: action.payload });
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

// nft region
function* addNftAlert(action: alertActionTypes.addNftAlertActionType) {
    try {
        global.showLoading();
        const res: alerts.AddNftAlertResponse = yield call(alertApi.addNftAlert, action.payload);
        if (res?.c === 1) {
            global.showToastSuccess(res?.m);
            global.hideLoading();
            onPushEventBus(EventBusName.ADD_ALERT, { index: 1, data: res.d });
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

function* editNftAlert(action: alertActionTypes.editNftAlertActionType) {
    try {
        global.showLoading();
        const res = yield call(alertApi.editNftAlert, action.payload);
        if (res?.c === 1) {
            global.showToastSuccess(res?.m);
            global.hideLoading();
            onPushEventBus(EventBusName.EDIT_ALERT, { index: 1, data: action.payload });
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

function* getAlerts(action: alertActionTypes.getAlertsActionType) {
    const { index, page, oldTableData, onSuccess, onFailure } = action.payload;
    try {
        const params: alerts.GetAlertsRequest = {
            page,
            perPage: ITEM_LOAD,
        }
        const res: alerts.GetAlertsResponse = yield alertApi.getAlerts(index, params);
        if (res?.c === 1) {
            onSuccess(
                index,
                { ...res.d, table_data: [...oldTableData, ...res.d.table_data] },
            );
        } else {
            onFailure(res?.m);
        }
    } catch (err) {
        onFailure(err.message);
    }
}

function* deleteAlerts(action: alertActionTypes.deleteAlertsActionType) {
    const { index, ids } = action.payload;
    try {
        global.showLoading();
        const res = yield call(alertApi.deleteAlerts, index, ids);
        if (res?.c === 1) {
            global.showToastSuccess(res?.m);
            global.hideLoading();
            onPushEventBus(EventBusName.DELETE_ALERTS, { index, ids });
        } else {
            global.showToastError(res?.m);
            global.hideLoading();
        }
    } catch (err) {
        global.showToastError(err.message);
        global.hideLoading();
    }
}

function* activateAlerts(action: alertActionTypes.activateAlertsActionType) {
    const { index, ids } = action.payload;
    try {
        global.showLoading();
        const res = yield call(alertApi.activateAlerts, index, ids);
        if (res?.c === 1) {
            global.showToastSuccess(res?.m);
            global.hideLoading();
            onPushEventBus(EventBusName.ACTIVATE_ALERTS, { index, ids });
        } else {
            global.showToastError(res?.m);
            global.hideLoading();
        }
    } catch (err) {
        global.showToastError(err.message);
        global.hideLoading();
    }
}

function* deactivateAlerts(action: alertActionTypes.deactivateAlertsActionType) {
    const { index, ids } = action.payload;
    try {
        global.showLoading();
        const res = yield call(alertApi.deactivateAlerts, index, ids);
        if (res?.c === 1) {
            global.showToastSuccess(res?.m);
            global.hideLoading();
            onPushEventBus(EventBusName.DEACTIVATE_ALERTS, { index, ids });
        } else {
            global.showToastError(res?.m);
            global.hideLoading();
        }
    } catch (err) {
        global.showToastError(err.message);
        global.hideLoading();
    }
}

function* sendMailSupportAlert(action: alertActionTypes.sendMailSupportAlertActionType) {
    try {
        yield call(alertApi.sendMailSupportAlert, action.payload);
    } catch (err) {
        // TODO
    }
}
