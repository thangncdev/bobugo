import { Action } from 'redux';

import { store } from 'redux/store';

export function dispatch(action: Action) {
    return store.dispatch(action);
}
