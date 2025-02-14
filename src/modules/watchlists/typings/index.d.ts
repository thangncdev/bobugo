declare namespace watchlists {
    type State = Readonly<Info>;

    interface Info {
        tokens: markets.TableData[];
        nfts: markets.TableData[];
    }

    interface Route {
        icon?: string;
        color?: string[];
        label: string;
        key: string | TokensType;
    }

    interface GetWatchlistsTokensActionPayload {
        page: number;
        oldTableData: markets.TableData[];
        onSuccess: (data: markets.NftsData, canLoadMore: boolean) => void;
        onFailure: (error: string) => void;
    }

    interface GetWatchlistsNftsActionPayload {
        page: number;
        oldTableData: markets.TableData[];
        onSuccess: (data: markets.NftsData, canLoadMore: boolean) => void;
        onFailure: (error: string) => void;
    }

    interface GetWatchlistsTokensRequest {
        page: number;
        perPage: number;
    }

    interface GetWatchlistsNftsRequest {
        page: number;
        perPage: number;
    }

    interface AddWatchlistsRequest {
        key: markets.Key;
    }

    interface AddWatchlistsActionPayload extends AddWatchlistsRequest {
        onFailure: () => void;
    }

    interface CheckExistWatchlistsActionPayload extends AddWatchlistsRequest {
        onSuccess: () => void;
    }

    interface GetWatchlistsResponse extends Response {
        data: NftsData;
    }
}
