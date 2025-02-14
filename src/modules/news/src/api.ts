import { call } from 'redux-saga/effects';

import { AuthorizationMode } from 'constants/constants';
import { getRequest } from 'services/api-requests';

const ROUTES = {
    GET_NEWS: 'api/token/get_list_news_token',
    GET_NEWS_URI: 'api/token/get_detail_new',
};

export function* getNews(params: news.GetNewsParams) {
    const request = getRequest(`${ROUTES.GET_NEWS}`, AuthorizationMode.PUBLIC, params);
    return yield call(request);
}

export function* getNewsUri(params: news.GetNewsUriParams) {
    const request = getRequest(`${ROUTES.GET_NEWS_URI}`, AuthorizationMode.PUBLIC, params);
    return yield call(request);
}
