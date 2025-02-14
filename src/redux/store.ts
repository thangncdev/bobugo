import { applyMiddleware, combineReducers, compose, createStore, Middleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import state from 'redux/reducers';
import rootSaga from 'redux/sagas';

const sagaMiddleware = createSagaMiddleware();

const mainLog = createLogger({
    collapsed: true,
    duration: true,
    // TODO: Add action you don't want to log
    // predicate: (getState, action) => (
    //     action.type !== marketsActions.UPDATE_LIST_FUTURES
    // ),
});

const GLOBAL_STATE = combineReducers(state);
const MIDDLEWARE: Middleware[] = [sagaMiddleware];

if (__DEV__) {
    MIDDLEWARE.push(mainLog);
    const createDebugger = require('redux-flipper').default;
    MIDDLEWARE.push(createDebugger());
}

const createStoreWithMiddleware = __DEV__
    ? compose(applyMiddleware(...MIDDLEWARE))(createStore)
    : applyMiddleware(...MIDDLEWARE)(createStore);

// @ts-ignore
export const store = createStoreWithMiddleware<GlobalState>(GLOBAL_STATE, undefined);

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
