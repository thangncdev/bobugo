import { createSelector } from 'reselect';

import { USER_INITIAL_STATE } from 'modules/user/src/constants';

const userSelector = (state: GlobalState) => state.user;

export const isLoginSelector = createSelector(
    userSelector,
    user => user.isLogin as boolean ?? USER_INITIAL_STATE.isLogin,
);

export const accessTokenSelector = createSelector(
    userSelector,
    user => user.authPair.token as string ?? USER_INITIAL_STATE.authPair.token,
);

export const profileInfoSelector = createSelector(
    userSelector,
    user => user.profile as user.Profile ?? USER_INITIAL_STATE.profile,
);

export const showBalanceSelector = createSelector(
    userSelector,
    user => user.showBalance as boolean ?? USER_INITIAL_STATE.showBalance,
);
