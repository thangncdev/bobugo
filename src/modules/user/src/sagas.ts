import { t } from 'i18next';
import { all, call, put, take } from 'redux-saga/effects';

import * as forgotPasswordApi from 'modules/forgotPassword/src/api';
import * as loginApi from 'modules/login/src/api';
import { goBack, navigate, popToTop, resetStack } from 'modules/navigation/src/utils';
import * as registerApi from 'modules/register/src/api';
import { userActionCreators, userActions, userActionTypes } from 'modules/user/src/actions';
import * as profileApi from 'modules/user/src/api';
import Storages, { KeyStorage } from 'utils/storages';

export function* userRuntime() {
    yield all([
        call(loginRuntime),
        call(loginWithGGRuntime),
        call(loginWithAppleRuntime),
        call(registerRuntime),
        call(forgotPasswordRuntime),
        call(forgotPasswordUpdateRuntime),
        call(getProfileRuntime),
        call(changePasswordRuntime),
        call(deleteProfileRuntime),
        call(logoutRuntime),
        call(updateFCMTokenRuntime),
    ]);
}

function* loginRuntime() {
    while (true) {
        const action: userActionTypes.loginActionType = yield take(userActions.LOGIN);
        const { username, password, onLoginSuccess } = action.payload;
        try {
            global.showLoading();
            const dataLogin: login.LoginRequest = {
                username,
                password,
            };
            const res: login.LoginResponse = yield call(loginApi.login, dataLogin);
            if (res.c === 1) {
                yield put(userActionCreators.loginSuccess(res.d[0]));
                yield call(loginSuccess, username, onLoginSuccess);
            } else {
                global.showToastError(res.m);
                global.hideLoading();
            }
        } catch (err) {
            yield put(userActionCreators.loginFailure(err.message));
            global.showToastError(err.message);
            global.hideLoading();
        }
    }
}

function* loginWithGGRuntime() {
    while (true) {
        const action: userActionTypes.loginWithGGActionType = yield take(userActions.LOGIN_WITH_GG);
        try {
            global.showLoading();
            const res: login.LoginResponse = yield call(loginApi.loginWithGG, action.payload);
            if (res.c === 1) {
                yield put(userActionCreators.loginWithGGSuccess(res.d[0]));
                yield call(loginSuccess);
            } else {
                global.showToastError(res.m);
                global.hideLoading();
            }
        } catch (err) {
            yield put(userActionCreators.loginWithGGFailure(err.message));
            global.showToastError(err.message);
            global.hideLoading();
        }
    }
}

function* loginWithAppleRuntime() {
    while (true) {
        const action: userActionTypes.loginWithAppleActionType = yield take(userActions.LOGIN_WITH_APPLE);
        try {
            global.showLoading();
            const res: login.LoginResponse = yield call(loginApi.loginWithApple, action.payload);
            if (res.c === 1) {
                yield put(userActionCreators.loginWithAppleSuccess(res.d[0]));
                yield call(loginSuccess);
            } else {
                global.showToastError(res.m);
                global.hideLoading();
            }
        } catch (err) {
            yield put(userActionCreators.loginWithAppleFailure(err.message));
            global.showToastError(err.message);
            global.hideLoading();
        }
    }
}

function* updateFCMTokenRuntime() {
    while (true) {
        const action: userActionTypes.updateFcmTokenActionType = yield take(userActions.UPDATE_FCM_TOKEN);
        try {
            yield call(loginApi.updateFCMToken, action.payload);
        } catch (err) {
            // TODO: Don't need show error
        }
    }
}

function* loginSuccess(username?: string, onLoginSuccess?: () => void) {
    try {
        // save last email
        if (username) {
            yield Storages.set(KeyStorage.LastEmailLogin, username);
        }

        // TODO: Fetch profile, info needed
        yield put(userActionCreators.getProfile());

        global.hideLoading();

        if (onLoginSuccess) {
            onLoginSuccess();
        } else {
            popToTop();
        }
        global.showToastSuccess(t('login_success'));
    } catch (err) {
        throw err;
    }
}

function* registerRuntime() {
    while (true) {
        const action: userActionTypes.registerActionType = yield take(userActions.REGISTER);
        const { username } = action.payload;
        try {
            global.showLoading();
            const res: register.RegisterResponse = yield call(registerApi.register, action.payload);
            if (res.c === 1) {
                yield put(userActionCreators.registerSuccess());
                global.hideLoading();
                navigate('Verification', { username });
            } else {
                global.showToastError(res.m);
                global.hideLoading();
            }
        } catch (err) {
            yield put(userActionCreators.registerFailure(err.message));
            global.showToastError(err.message);
            global.hideLoading();
        }
    }
}

function* forgotPasswordRuntime() {
    while (true) {
        const action: userActionTypes.forgotPasswordActionType = yield take(userActions.FORGOT_PASSWORD);
        const { username } = action.payload;
        try {
            global.showLoading();
            const res: Response = yield call(forgotPasswordApi.forgotPassword, action.payload);
            if (res.c === 1) {
                global.hideLoading();
                navigate('UpdatePassword', { username });
            } else {
                global.showToastError(res.m);
                global.hideLoading();
            }
        } catch (err) {
            global.showToastError(err.message);
            global.hideLoading();
        }
    }
}

function* forgotPasswordUpdateRuntime() {
    while (true) {
        const action: userActionTypes.forgotPasswordUpdateActionType = yield take(userActions.FORGOT_PASSWORD_UPDATE);
        try {
            global.showLoading();
            const res: Response = yield call(forgotPasswordApi.forgotPasswordUpdate, action.payload);
            if (res.c === 1) {
                global.hideLoading();
                global.showSuccess(t('forgot_password_success'));
            } else {
                global.showToastError(res.m);
                global.hideLoading();
            }
        } catch (err) {
            global.showToastError(err.message);
            global.hideLoading();
        }
    }
}

function* logoutRuntime() {
    while (true) {
        try {
            const aciton: userActionTypes.logoutActionType = yield take(userActions.LOGOUT);
            if (aciton?.payload) {
                // TODO: Handle when force logout
                navigate('Login');
            } else {
                navigate('Markets');
                global.showToastSuccess(t('logout_successfully'));
                yield call(profileApi.logout);
            }
            yield put(userActionCreators.logoutSuccess());
        } catch (err) {
            yield put(userActionCreators.logoutFailure(err.message));
            global.showToastError(err.message);
        }
    }
}

function* changePasswordRuntime() {
    while (true) {
        const action: userActionTypes.changePasswordActionType = yield take(userActions.CHANGE_PASSWORD);
        try {
            global.showLoading();
            const res: Response = yield call(profileApi.changePassword, action.payload);
            global.hideLoading();
            if (res.c === 1) {
                global.showToastSuccess(t('change_pass_success'));
                goBack();
            } else {
                global.showToastError(res.m);
            }
        } catch (err) {
            global.showToastError(err.message);
            global.hideLoading();
        }
    }
}

function* getProfileRuntime() {
    while (true) {
        yield take(userActions.GET_PROFILE);
        try {
            const res: user.GetProfileResponse = yield call(profileApi.getProfile);
            if (res.c === 1) {
                yield put(userActionCreators.getProfileSuccess(res.d[0]?.infor));
            }
        } catch (err) {
            yield put(userActionCreators.getProfileFailure(err));
        }
    }
}

function* deleteProfileRuntime() {
    while (true) {
        yield take(userActions.DELETE_PROFILE);
        try {
            global.showLoading();
            const res: Response = yield call(profileApi.deleteProfile);
            if (res.c === 1) {
                global.showToastSuccess(t('delete_profile_success'));
                global.hideLoading();
                yield put(userActionCreators.logoutSuccess());
                resetStack('Main');
            } else {
                global.showToastError(res.m);
                global.hideLoading();
            }
        } catch (err) {
            global.showToastError(err.message);
            global.hideLoading();
        }
    }
}
