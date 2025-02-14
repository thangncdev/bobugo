class TokenDetailActions {
    public readonly GET_OVERVIEW = 'GET_OVERVIEW';

    public readonly GET_HISTORY = 'GET_HISTORY';

    public readonly GET_POOL_INFO = 'GET_POOL_INFO';

    public readonly GET_NEWS = 'GET_NEWS';
    public readonly GET_NEWS_URI = 'GET_NEWS_URI';
}

export declare namespace tokenDetailActionTypes {
    type getOverviewActionType = TypedAction<typeof tokenDetailActions.GET_OVERVIEW, tokenDetail.GetOverviewActionPayload>;

    type getHistoryActionType = TypedAction<typeof tokenDetailActions.GET_HISTORY, tokenDetail.GetHistoryActionPayload>;

    type getPoolInfoActionType = TypedAction<typeof tokenDetailActions.GET_POOL_INFO, tokenDetail.GetPoolInfoActionPayload>;

    type getNewsActionType = TypedAction<typeof tokenDetailActions.GET_NEWS, tokenDetail.GetNewsActionPayload>;
    type getNewsUriActionType = TypedAction<typeof tokenDetailActions.GET_NEWS_URI, tokenDetail.GetNewsUriActionPayload>;
}

class TokenDetailActionCreators {
    public getOverview = (payload: tokenDetail.GetOverviewActionPayload): tokenDetailActionTypes.getOverviewActionType => ({ type: tokenDetailActions.GET_OVERVIEW, payload });

    public getHistory = (payload: tokenDetail.GetHistoryActionPayload): tokenDetailActionTypes.getHistoryActionType => ({ type: tokenDetailActions.GET_HISTORY, payload });

    public getPoolInfo = (payload: tokenDetail.GetPoolInfoActionPayload): tokenDetailActionTypes.getPoolInfoActionType => ({ type: tokenDetailActions.GET_POOL_INFO, payload });

    public getNews = (payload: tokenDetail.GetNewsActionPayload): tokenDetailActionTypes.getNewsActionType => ({ type: tokenDetailActions.GET_NEWS, payload });
    public getNewsUri = (payload: tokenDetail.GetNewsUriActionPayload): tokenDetailActionTypes.getNewsUriActionType => ({ type: tokenDetailActions.GET_NEWS_URI, payload });
}

export const tokenDetailActions = new TokenDetailActions();
export const tokenDetailActionCreators = new TokenDetailActionCreators();
