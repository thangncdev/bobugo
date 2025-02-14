class WatchlistActions {
    public readonly CHECK_EXIST_WATCHLISTS = 'CHECK_EXIST_WATCHLISTS';
    public readonly ADD_TO_WATCHLISTS = 'ADD_TO_WATCHLISTS';
    public readonly REMOVE_FROM_WATCHLISTS = 'REMOVE_FROM_WATCHLISTS';

    public readonly GET_WATCHLISTS_TOKEN = 'GET_WATCHLISTS_TOKEN';

    public readonly GET_WATCHLISTS_NFT = 'GET_WATCHLISTS_NFT';
}

export declare namespace watchlistActionTypes {
    type checkExistWatchlistsActionType = TypedAction<typeof watchlistActions.CHECK_EXIST_WATCHLISTS, watchlists.CheckExistWatchlistsActionPayload>;
    type addToWatchlistsActionType = TypedAction<typeof watchlistActions.ADD_TO_WATCHLISTS, watchlists.AddWatchlistsActionPayload>;
    type removeFromWatchlistsActionType = TypedAction<typeof watchlistActions.REMOVE_FROM_WATCHLISTS, watchlists.AddWatchlistsActionPayload>;

    type getWatchlistsTokenActionType = TypedAction<typeof watchlistActions.GET_WATCHLISTS_TOKEN, watchlists.GetWatchlistsTokensActionPayload>;

    type getWatchlistsNftActionType = TypedAction<typeof watchlistActions.GET_WATCHLISTS_NFT, watchlists.GetWatchlistsNftsActionPayload>;
}

class WatchlistActionCreators {
    public checkExistWatchlists = (payload: watchlists.CheckExistWatchlistsActionPayload): watchlistActionTypes.checkExistWatchlistsActionType => ({ type: watchlistActions.CHECK_EXIST_WATCHLISTS, payload });
    public addToWatchlists = (payload: watchlists.AddWatchlistsActionPayload): watchlistActionTypes.addToWatchlistsActionType => ({ type: watchlistActions.ADD_TO_WATCHLISTS, payload });
    public removeFromWatchlists = (payload: watchlists.AddWatchlistsActionPayload): watchlistActionTypes.removeFromWatchlistsActionType => ({ type: watchlistActions.REMOVE_FROM_WATCHLISTS, payload });

    public getWatchlistsToken = (payload: watchlists.GetWatchlistsTokensActionPayload): watchlistActionTypes.getWatchlistsTokenActionType => ({ type: watchlistActions.GET_WATCHLISTS_TOKEN , payload});

    public getWatchlistsNft = (payload: watchlists.GetWatchlistsNftsActionPayload): watchlistActionTypes.getWatchlistsNftActionType => ({ type: watchlistActions.GET_WATCHLISTS_NFT, payload });
}

export const watchlistActions = new WatchlistActions();
export const watchlistActionCreators = new WatchlistActionCreators();
