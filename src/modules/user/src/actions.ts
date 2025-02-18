class UserActions {
    public readonly LOGIN = 'LOGIN';
    public readonly LOGIN_SUCCESS = 'LOGIN_SUCCESS';
    public readonly LOGIN_FAILURE = 'LOGIN_FAILURE';

    public readonly LOGIN_WITH_GG = 'LOGIN_WITH_GG';
    public readonly LOGIN_WITH_GG_SUCCESS = 'LOGIN_WITH_GG_SUCCESS';
    public readonly LOGIN_WITH_GG_FAILURE = 'LOGIN_WITH_GG_FAILURE';

    public readonly LOGIN_WITH_APPLE = 'LOGIN_WITH_APPLE';
    public readonly LOGIN_WITH_APPLE_SUCCESS = 'LOGIN_WITH_APPLE_SUCCESS';
    public readonly LOGIN_WITH_APPLE_FAILURE = 'LOGIN_WITH_APPLE_FAILURE';

    public readonly REGISTER = 'REGISTER';
    public readonly REGISTER_SUCCESS = 'REGISTER_SUCCESS';
    public readonly REGISTER_FAILURE = 'REGISTER_FAILURE';

    public readonly FORGOT_PASSWORD = 'FORGOT_PASSWORD';
    public readonly FORGOT_PASSWORD_UPDATE = 'FORGOT_PASSWORD_UPDATE';

    public readonly LOGOUT = 'LOGOUT';
    public readonly LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
    public readonly LOGOUT_FAILURE = 'LOGOUT_FAILURE';

    public readonly GET_PROFILE = 'GET_PROFILE';
    public readonly GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
    public readonly GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';

    public readonly CHANGE_PASSWORD = 'CHANGE_PASSWORD';

    public readonly DELETE_PROFILE = 'DELETE_PROFILE';

    public readonly UPDATE_FCM_TOKEN = 'UPDATE_FCM_TOKEN';

    public readonly TOGGLE_BALANCE = 'TOGGLE_BALANCE';
}

export declare namespace userActionTypes {
    type loginActionType = TypedAction<typeof userActions.LOGIN, login.LoginRequest>;
    type loginSuccessActionType = TypedActionResponse<typeof userActions.LOGIN_SUCCESS, user.AuthPair>;
    type loginFailureActionType = TypedActionError<typeof userActions.LOGIN_FAILURE, string>;

    type loginWithGGActionType = TypedAction<typeof userActions.LOGIN_WITH_GG, string>;
    type loginWithGGSuccessActionType = TypedActionResponse<typeof userActions.LOGIN_WITH_GG_SUCCESS, user.AuthPair>;
    type loginWithGGFailureActionType = TypedActionError<typeof userActions.LOGIN_WITH_GG_FAILURE, string>;

    type loginWithAppleActionType = TypedAction<typeof userActions.LOGIN_WITH_APPLE, login.LoginWithAppleRequest>;
    type loginWithAppleSuccessActionType = TypedActionResponse<
        typeof userActions.LOGIN_WITH_APPLE_SUCCESS,
        user.AuthPair
    >;
    type loginWithAppleFailureActionType = TypedActionError<typeof userActions.LOGIN_WITH_APPLE_FAILURE, string>;

    type registerActionType = TypedAction<typeof userActions.REGISTER, register.RegisterRequest>;
    type registerSuccessActionType = TypedActionEmpty<typeof userActions.REGISTER_SUCCESS>;
    type registerFailureActionType = TypedActionError<typeof userActions.REGISTER_FAILURE, string>;

    type forgotPasswordActionType = TypedAction<
        typeof userActions.FORGOT_PASSWORD,
        forgotPassword.ForgotPasswordRequest
    >;
    type forgotPasswordUpdateActionType = TypedAction<
        typeof userActions.FORGOT_PASSWORD_UPDATE,
        forgotPassword.ForgotPasswordUpdateRequest
    >;

    type logoutActionType = TypedAction<typeof userActions.LOGOUT, boolean | undefined>;
    type logoutSuccessActionType = TypedActionEmpty<typeof userActions.LOGOUT_SUCCESS>;
    type logoutFailureActionType = TypedActionError<typeof userActions.LOGOUT_FAILURE, string>;

    type getProfileActionType = TypedActionEmpty<typeof userActions.GET_PROFILE>;
    type getProfileSuccessActionType = TypedActionResponse<typeof userActions.GET_PROFILE_SUCCESS, user.Profile>;
    type getProfileFailureActionType = TypedActionError<typeof userActions.GET_PROFILE_FAILURE, string>;

    type changePasswordActionType = TypedAction<typeof userActions.CHANGE_PASSWORD, user.ChangePasswordRequest>;

    type deleteProfileActionType = TypedActionEmpty<typeof userActions.DELETE_PROFILE>;

    type updateFcmTokenActionType = TypedAction<typeof userActions.UPDATE_FCM_TOKEN, login.UpdateFCMTokenRequest>;

    type toggleBalanceActionType = TypedActionEmpty<typeof userActions.TOGGLE_BALANCE>;
}

class UserActionCreators {
    public login = (payload: login.LoginRequest): userActionTypes.loginActionType => ({
        type: userActions.LOGIN,
        payload,
    });
    public loginSuccess = (response: user.AuthPair): userActionTypes.loginSuccessActionType => ({
        type: userActions.LOGIN_SUCCESS,
        response,
    });
    public loginFailure = (error: string): userActionTypes.loginFailureActionType => ({
        type: userActions.LOGIN_FAILURE,
        error,
    });

    public loginWithGG = (payload: string): userActionTypes.loginWithGGActionType => ({
        type: userActions.LOGIN_WITH_GG,
        payload,
    });
    public loginWithGGSuccess = (response: user.AuthPair): userActionTypes.loginWithGGSuccessActionType => ({
        type: userActions.LOGIN_WITH_GG_SUCCESS,
        response,
    });
    public loginWithGGFailure = (error: string): userActionTypes.loginWithGGFailureActionType => ({
        type: userActions.LOGIN_WITH_GG_FAILURE,
        error,
    });

    public loginWithApple = (payload: login.LoginWithAppleRequest): userActionTypes.loginWithAppleActionType => ({
        type: userActions.LOGIN_WITH_APPLE,
        payload,
    });
    public loginWithAppleSuccess = (response: user.AuthPair): userActionTypes.loginWithAppleSuccessActionType => ({
        type: userActions.LOGIN_WITH_APPLE_SUCCESS,
        response,
    });
    public loginWithAppleFailure = (error: string): userActionTypes.loginWithAppleFailureActionType => ({
        type: userActions.LOGIN_WITH_APPLE_FAILURE,
        error,
    });

    public register = (payload: register.RegisterRequest): userActionTypes.registerActionType => ({
        type: userActions.REGISTER,
        payload,
    });
    public registerSuccess = (): userActionTypes.registerSuccessActionType => ({ type: userActions.REGISTER_SUCCESS });
    public registerFailure = (error: string): userActionTypes.registerFailureActionType => ({
        type: userActions.REGISTER_FAILURE,
        error,
    });

    public forgotPassword = (
        payload: forgotPassword.ForgotPasswordRequest
    ): userActionTypes.forgotPasswordActionType => ({ type: userActions.FORGOT_PASSWORD, payload });
    public forgotPasswordUpdate = (
        payload: forgotPassword.ForgotPasswordUpdateRequest
    ): userActionTypes.forgotPasswordUpdateActionType => ({ type: userActions.FORGOT_PASSWORD_UPDATE, payload });

    public logout = (payload?: boolean): userActionTypes.logoutActionType => ({ type: userActions.LOGOUT, payload });
    public logoutSuccess = (): userActionTypes.logoutSuccessActionType => ({ type: userActions.LOGOUT_SUCCESS });
    public logoutFailure = (error: string): userActionTypes.logoutFailureActionType => ({
        type: userActions.LOGOUT_FAILURE,
        error,
    });

    public getProfile = (): userActionTypes.getProfileActionType => ({ type: userActions.GET_PROFILE });
    public getProfileSuccess = (response: user.Profile): userActionTypes.getProfileSuccessActionType => ({
        type: userActions.GET_PROFILE_SUCCESS,
        response,
    });
    public getProfileFailure = (error: string): userActionTypes.getProfileFailureActionType => ({
        type: userActions.GET_PROFILE_FAILURE,
        error,
    });

    public changePassword = (payload: user.ChangePasswordRequest): userActionTypes.changePasswordActionType => ({
        type: userActions.CHANGE_PASSWORD,
        payload,
    });

    public deleteProfile = (): userActionTypes.deleteProfileActionType => ({ type: userActions.DELETE_PROFILE });

    public updateFcmToken = (payload: login.UpdateFCMTokenRequest): userActionTypes.updateFcmTokenActionType => ({
        type: userActions.UPDATE_FCM_TOKEN,
        payload,
    });

    public toggleBalance = (): userActionTypes.toggleBalanceActionType => ({ type: userActions.TOGGLE_BALANCE });
}

export const userActions = new UserActions();
export const userActionCreators = new UserActionCreators();
