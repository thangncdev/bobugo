export const USER_INITIAL_STATE: user.State = {
    isLogin: false,
    authPair: {
        token: '',
        refresh_token: '',
    },
    profile: {} as user.Profile,
    showBalance: true,
};
