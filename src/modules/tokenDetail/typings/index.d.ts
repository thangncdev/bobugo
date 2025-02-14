declare namespace tokenDetail {
    interface Route {
        key: TokenDetailTab;
        title: string;
    }

    interface RouteParams {
        name: string;
        logo: string;
        key: markets.Key;
    }

    interface GetOverviewActionPayload {
        key: markets.Key;
        onSuccess: (data: OverviewData) => void;
        onFailure: () => void;
    }

    interface GetOverviewResponse extends Response {
        data: OverviewData;
    }

    interface OverviewData {
        name: string;
        logo: string;
        price: string;
        usd: string;
        pricePctChg: string;
        volumePctChg: string;
    }

    interface GetHistoryRequestBase {
        timeframe: string;
        sortBy: string; // Options are amount, time. Default is time.
        order: string; // Options are asc, desc. Default is desc
        minAmount?: number;
        from?: number;
        page: number;
        perPage: number;
    }

    type GetHistoryTokenRequest = GetHistoryRequestBase & markets.TokenKey;

    type GetHistoryNftRequest = GetHistoryRequestBase & markets.NftKey;

    type GetHistoryRequest = GetHistoryTokenRequest | GetHistoryNftRequest;

    interface GetHistoryActionPayload {
        key: markets.Key;
        page: number;
        oldTableData: TableData[];
        timeframe: string;
        onSuccess: (data: HistoryData, canLoadMore: boolean) => void;
        onFailure: () => void;
    }

    interface GetHistoryResponse extends Response {
        data: HistoryData;
    }

    interface HistoryData {
        page: number;
        perPage: number;
        table_header: masterdata.NftHeader;
        table_data: TableData[];
    }

    interface TableData {
        key: TokenKey | NftKey;
        colums: string[];
    }

    interface NftKey {
        policy: string;
        hash: string;
    }

    interface TokenKey {
        unit: string;
        hash: string;
        color: string;
    }

    interface GetPoolInfoActionPayload {
        key: markets.Key;
        onSuccess: (data: PoolInfo) => void;
        onFailure: () => void;
    }

    interface PoolInfoResponse extends Response {
        data: PoolInfo;
    }

    interface PoolInfo {
        table_data: PoolInfoItem[];
    }

    interface PoolInfoItem {
        label: string;
        value: string;
    }

    interface GetNewsActionPayload {
        page: int;
        per_page: int;
        key: string;
        currentData: tokenDetail.NewsItem[];
        onSuccess: (res: NewsData) => void;
        onFailure: () => void;
    }

    interface GetNewsParams {
        page: int;
        per_page: int;
        key: string;
    }

    interface GetNewsResponse extends Response {
        data: NewsData;
    }

    interface NewsData {
        page: number;
        perPage: number;
        total: number;
        table_data: NewsItem[];
    }

    interface NewsItem {
        id: string;
        title: string;
        description: string;
        image: string;
        create_date: string;
    }

    interface GetNewsUriActionPayload {
        newsId: int;
        onSuccess: (res: NewsUriData) => void;
        onFailure: () => void;
    }

    interface GetNewsUriParams {
        newId: int;
    }

    interface GetNewsUriResponse extends Response {
        data: NewsUriData;
    }

    interface NewsUriData {
        id: string;
        title: string;
        description: string;
        image: string;
        create_date: string;
        url: string;
    }
}
