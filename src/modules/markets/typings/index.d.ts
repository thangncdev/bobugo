declare namespace markets {
    type State = Readonly<Info>;

    interface Info {
        tokensRecently: SearchTokensItem[];
        nftsRecently: SearchNftItem[];
    }
    interface Route {
        icon?: string;
        color?: string[];
        label: string;
        key: string | TokensType;
        ranking: MarketsRanking;
    }

    interface GetTokensRequest {
        page: number;
        perPage: number;
        type: MarketsRanking;
    }

    interface GetTokensActionPayload {
        page: number;
        type: MarketsRanking;
        oldTableData: TableData[];
        onSuccess: (data: NftsData, canLoadMore: boolean) => void;
        onFailure: (error: string) => void;
    }

    interface GetNftsRequest {
        page: number;
        per_page: number;
        currency_unit: CurrencyUnit;
        ranking: MarketsRanking;
    }

    interface SearchRequest {
        name: string;
        page: number;
        perPage: number;
    }

    interface SearchNftsActionPayload {
        page: number;
        name: string;
        oldData: SearchNftItem[];
        onNftsSuccess: (data: SearchNftsData, canLoadMore: boolean) => void;
        onNftsFailure: (error: string) => void;
    }

    interface SearchTokensActionPayload {
        page: number;
        name: string;
        oldData: SearchTokensItem[];
        onTokensSuccess: (data: SearchTokensData, canLoadMore: boolean) => void;
        onTokensFailure: (error: string) => void;
    }

    interface GetNftsActionPayload {
        page: number;
        ranking: MarketsRanking;
        oldTableData: TableData[];
        onSuccess: (data: NftsData, canLoadMore: boolean) => void;
        onFailure: (error: string) => void;
    }

    interface SearchNftsResponse extends Response {
        d: SearchNftsData;
    }

    interface SearchTokensResponse extends Response {
        d: SearchTokensData;
    }

    interface SearchTokensData {
        total: number;
        page: number;
        per_page: number;
        dt: SearchTokensItem[];
    }

    interface SearchNftsData {
        total: number;
        page: number;
        per_page: number;
        dt: SearchNftItem[];
    }

    interface SearchNftItem {
        name: string;
        policy: string;
        logo: string;
        price_ada: string;
        price_usd: string;
        volume_ada: string;
        volume_usd: string;
        isRecently: boolean;
    }

    interface SearchTokensItem {
        name: string;
        unit: string;
        category: string;
        icon: string;
        price_ada: string;
        price_usd: string;
        volume_ada: string;
        volume_usd: string;
        isRecently: boolean;
    }
    interface GetNftsResponse extends Response {
        data: NftsData;
    }

    interface NftsData {
        page: number;
        perPage: number;
        total: number;
        table_data: TableData[];
    }

    interface TableData {
        key: TokenKey | NftKey;
        colums: number | string[];
    }

    type Key = TokenKey | NftKey;

    interface TokenKey {
        unit: string;
    }

    interface NftKey {
        policy: string;
    }

    interface MarketSearchRouteParams {
        tokenType: TokensType;
    }
}
