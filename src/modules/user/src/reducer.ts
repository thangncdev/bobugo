import { combineReducers } from 'redux';

import { userActions, userActionTypes } from 'modules/user/src/actions';
import { USER_INITIAL_STATE } from 'modules/user/src/constants';
import persistReducerUtil from 'redux/persists';

const isLogin = (
    state: boolean = USER_INITIAL_STATE.isLogin,
    action: userActionTypes.loginSuccessActionType
        | userActionTypes.loginWithGGSuccessActionType
        | userActionTypes.loginWithAppleSuccessActionType
        | userActionTypes.logoutSuccessActionType
): boolean => {
    switch (action.type) {
        case userActions.LOGIN_SUCCESS:
        case userActions.LOGIN_WITH_GG_SUCCESS:
        case userActions.LOGIN_WITH_APPLE_SUCCESS:
            return true;
        case userActions.LOGOUT_SUCCESS:
            return USER_INITIAL_STATE.isLogin;
        default:
            return state;
    }
};

const authPair = (
    state: user.AuthPair = USER_INITIAL_STATE.authPair,
    action: userActionTypes.loginSuccessActionType
        | userActionTypes.loginWithGGSuccessActionType
        | userActionTypes.loginWithAppleSuccessActionType
        | userActionTypes.logoutSuccessActionType
) => {
    switch (action.type) {
        case userActions.LOGIN_SUCCESS:
        case userActions.LOGIN_WITH_GG_SUCCESS:
        case userActions.LOGIN_WITH_APPLE_SUCCESS:
            return {
                ...state,
                ...action.response,
            };
        case userActions.LOGOUT_SUCCESS:
            return USER_INITIAL_STATE.authPair;
        default:
            return state;
    }
};

const profile = (
    state: user.Profile = USER_INITIAL_STATE.profile,
    action: userActionTypes.getProfileSuccessActionType | userActionTypes.logoutSuccessActionType
) => {
    switch (action.type) {
        case userActions.GET_PROFILE_SUCCESS:
            return action.response;
        case userActions.LOGOUT_SUCCESS:
            return USER_INITIAL_STATE.profile;
        default:
            return state;
    }
};

const showBalance = (
    state: boolean = USER_INITIAL_STATE.showBalance,
    action: userActionTypes.toggleBalanceActionType
) => {
    switch (action.type) {
        case userActions.TOGGLE_BALANCE:
            return !state;
        default:
            return state;
    }
};

const userReducer = combineReducers({
    isLogin,
    authPair,
    profile,
    showBalance,
});

export default persistReducerUtil(
    'user',
    userReducer,
    ['isLogin', 'authPair', 'profile'],
    ['authPair'],
);

