class MarketActions {
    public readonly GET_TOKENS = 'GET_MARKET_TOKENS';

    public readonly GET_NFTS = 'GET_MARKET_NFTS';

    public readonly SEARCH_TOKENS = 'SEARCH_TOKENS';
    public readonly SEARCH_NFTS = 'SEARCH_NFTS';

    public readonly SAVE_TOKENS_RECENTLY = 'SAVE_TOKENS_RECENTLY';
    public readonly SAVE_NFTS_RECENTLY = 'SAVE_NFTS_RECENTLY';
}

export declare namespace marketActionTypes {
    type getTokensActionType = TypedAction<typeof marketActions.GET_TOKENS, markets.GetTokensActionPayload>;

    type getNftsActionType = TypedAction<typeof marketActions.GET_NFTS, markets.GetNftsActionPayload>;

    type searchTokensActionType = TypedAction<typeof marketActions.SEARCH_TOKENS, markets.SearchTokensActionPayload>;
    type searcNftshActionType = TypedAction<typeof marketActions.SEARCH_NFTS, markets.SearchNftsActionPayload>;

    type saveTokensActionType = TypedAction<typeof marketActions.SAVE_TOKENS_RECENTLY, markets.SearchTokensItem>;
    type saveNftsActionType = TypedAction<typeof marketActions.SAVE_NFTS_RECENTLY, markets.SearchNftItem>;
}

class MarketActionCreators {
    public getTokens = (payload: markets.GetTokensActionPayload): marketActionTypes.getTokensActionType => ({ type: marketActions.GET_TOKENS, payload });

    public getNfts = (payload: markets.GetNftsActionPayload): marketActionTypes.getNftsActionType => ({ type: marketActions.GET_NFTS, payload });

    public searchTokens = (payload: markets.SearchTokensActionPayload): marketActionTypes.searchTokensActionType => ({ type: marketActions.SEARCH_TOKENS, payload });
    public searchNfts = (payload: markets.SearchNftsActionPayload): marketActionTypes.searcNftshActionType => ({ type: marketActions.SEARCH_NFTS, payload });

    public saveTokensRecently = (payload: markets.SearchTokensItem): marketActionTypes.saveTokensActionType => ({ type: marketActions.SAVE_TOKENS_RECENTLY, payload });
    public saveNftsRecently = (payload: markets.SearchNftItem): marketActionTypes.saveNftsActionType => ({ type: marketActions.SAVE_NFTS_RECENTLY, payload });
}

export const marketActions = new MarketActions();
export const marketActionCreators = new MarketActionCreators();
