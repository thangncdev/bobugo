import { all } from 'redux-saga/effects';

import { alertRuntime } from 'modules/alerts/src/sagas';
import { launchRuntime } from 'modules/launch/src/sagas';
import { marketsRuntime } from 'modules/markets/src/sagas';
import { masterdataRuntime } from 'modules/masterdata/src/sagas';
import { newsRuntime } from 'modules/news/src/sagas';
import { portfolioRuntime } from 'modules/portfolio/src/sagas';
import { tokenDetailRuntime } from 'modules/tokenDetail/src/sagas';
import { userRuntime } from 'modules/user/src/sagas';
import { verificationRuntime } from 'modules/verification/src/sagas';
import { walletDetailRuntime } from 'modules/walletDetail/src/sagas';
import { watchlistsRuntime } from 'modules/watchlists/src/sagas';

export default function* rootSaga() {
    yield all([
        alertRuntime(),
        launchRuntime(),
        marketsRuntime(),
        masterdataRuntime(),
        newsRuntime(),
        portfolioRuntime(),
        tokenDetailRuntime(),
        userRuntime(),
        verificationRuntime(),
        walletDetailRuntime(),
        watchlistsRuntime(),
    ]);
}
