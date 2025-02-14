import { all, call, take } from 'redux-saga/effects';

import { newsActions, newsActionTypes } from 'modules/news/src/actions';
import * as newsApi from 'modules/news/src/api';

export function* newsRuntime() {
    yield all([call(getNewsRuntime), call(getNewsUriRuntime)]);
}

function* getNewsRuntime() {
    while (true) {
        const action: newsActionTypes.getNewsActionType = yield take(newsActions.GET_NEWS);
        const { page, per_page, type, currentData, onSuccess, onFailure } = action.payload;

        try {
            const params: news.GetNewsParams = {
                page,
                per_page,
                type,
            };

            const res: news.GetNewsResponse = yield call(newsApi.getNews, params);

            if (res.c === 1) {
                onSuccess({
                    ...res.data,
                    table_data: [...currentData, ...res.data.table_data],
                });
            } else {
                onFailure();
            }
        } catch (err) {
            onFailure();
        }
    }
}

function* getNewsUriRuntime() {
    while (true) {
        const action: newsActionTypes.getNewsUriActionType = yield take(newsActions.GET_NEWS_URI);
        const { onSuccess, onFailure } = action.payload;

        try {
            const params: news.GetNewsUriParams = {
                newId: action.payload.newsId,
            };

            const res: news.GetNewsUriResponse = yield call(newsApi.getNewsUri, params);

            if (res.c === 1) {
                onSuccess(res.data);
            } else {
                onFailure();
            }
        } catch (err) {
            onFailure();
        }
    }
}
