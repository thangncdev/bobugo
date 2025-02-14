import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
import { all, call, put, select, take } from 'redux-saga/effects';

import { launchActionCreators } from 'modules/launch/src/actions';
import { masterdataActions } from 'modules/masterdata/src/actions';
import { resetStack } from 'modules/navigation/src/utils';
import { userActionCreators } from 'modules/user/src/actions';
import { isLoginSelector } from 'modules/user/src/selectors';
import Storages, { KeyStorage } from 'utils/storages';

export function* launchRuntime() {
    yield all([
        call(initDataRuntime),
    ]);
}

function* initDataRuntime() {
    while (true) {
        try {
            yield take([masterdataActions.GET_MASTERDATA_SUCCESS, masterdataActions.GET_MASTERDATA_FAILURE]);

            const isLogin: boolean = yield select(isLoginSelector);

            if (isLogin) {
                yield all([
                    put(userActionCreators.getProfile()),
                ]);
            }
            yield all([
                // TODO: Normal actions
                call(initializeGGSdk),
            ]);
            yield put(launchActionCreators.initDataSuccess());
            yield call(setRoot);
        } catch (err) {
            yield put(launchActionCreators.initDataFailure(err));
        }
    }
}

function* setRoot() {
    const agreedTempsPrivacy: string = yield Storages.get(KeyStorage.AgreedTermsPrivacy);

    if (agreedTempsPrivacy) {
        resetStack('Main');
    } else {
        resetStack('Onboarding');
    }
}

function* initializeGGSdk() {
    GoogleSignin.configure({ webClientId: Config.WEB_CLIENT_ID });
}
