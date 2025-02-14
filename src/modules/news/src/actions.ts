class NewsActions {
    public readonly GET_NEWS = 'GET_NEWS_OVERVIEW';
    public readonly GET_NEWS_URI = 'GET_NEWS_URI_OVER_VIEW';
}

export declare namespace newsActionTypes {
    type getNewsActionType = TypedAction<typeof newsActions.GET_NEWS, news.GetNewsActionPayload>;
    type getNewsUriActionType = TypedAction<typeof newsActions.GET_NEWS_URI, news.GetNewsUriActionPayload>;
}

class NewsActionCreators {
    public getNews = (payload: news.GetNewsActionPayload): newsActionTypes.getNewsActionType => ({ type: newsActions.GET_NEWS, payload });
    public getNewsUri = (payload: news.GetNewsUriActionPayload): newsActionTypes.getNewsUriActionType => ({ type: newsActions.GET_NEWS_URI, payload });
}

export const newsActions = new NewsActions();
export const newsActionCreators = new NewsActionCreators();
