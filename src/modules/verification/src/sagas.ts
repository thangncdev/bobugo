import { t } from 'i18next';
import { all, call, put, take, takeLatest } from 'redux-saga/effects';

import { verificationActionCreators, verificationActions, verificationActionTypes } from 'modules/verification/src/actions';
import * as verificationApi from 'modules/verification/src/api';

export function* verificationRuntime() {
    yield all([
        takeLatest(verificationActions.RESEND_CODE, resendCode),
        call(activeCustomerRuntime),
    ]);
}

function* resendCode(action: verificationActionTypes.resendCodeActionType) {
    try {
        const res: Response = yield call(verificationApi.resendCode, action.payload);
        if (res.c === 1) {
            yield put(verificationActionCreators.resendCodeSuccess());
        }
    } catch (err) {
        yield put(verificationActionCreators.resendCodeFailure(err.message));
    }
}

function* activeCustomerRuntime() {
    while (true) {
        const action: verificationActionTypes.activeCustomerActionType = yield take(verificationActions.ACTIVE_CUSTOMER);
        try {
            global.showLoading();
            const res = yield call(verificationApi.activeCustomer, action.payload);
            if (res.c === 1) {
                yield put(verificationActionCreators.activeCustomerSuccess());
                global.hideLoading();
                global.showSuccess(t('account_successfully_created'));
            } else {
                global.showToastError(res.m);
                global.hideLoading();
                action.payload.onActiveFailure();
            }
        } catch (err) {
            yield put(verificationActionCreators.activeCustomerFailure(err.message));
            global.showToastError(err.message);
            global.hideLoading();
            action.payload.onActiveFailure();
        }
    }
}
