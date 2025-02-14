declare namespace alerts {
    interface AddTokenAlertRouteParams {
        unit: string;
        name: string;
        price_ada: string;
        price_usd: string;
    }

    interface AddNftAlertRouteParams {
        policy: string;
        name: string;
        logo: string;
        price_ada: string;
    }

    interface AddTokenAlertRequest {
        unit: string;
        price: number;
        note: string;
    }

    interface AddTokenAlertResponse extends Response {
        d: TokenItem[];
    }

    interface EditTokenAlertRequest {
        id: number;
        price: number;
        note: string;
    }

    interface AddNftAlertRequest {
        policy: string;
        price: number | string;
        listing: number | string;
        note: string;
        repeat: number; // 0 | 1
    }

    interface AddNftAlertResponse extends Response {
        d: NftItem[];
    }

    interface EditNftAlertRequest {
        id: number;
        price: number;
        listing: number;
        note: string;
        repeat: number; // 0 | 1
    }

    type ListItemByRoute = Record<number, ItemByRoute>;

    interface ItemByRoute {
        total: number;
        all: number[];
        ids: number[];
    }

    interface GetAlertsActionPayload {
        index: number; // 0 | 1
        page: number;
        oldTableData: Item[];
        onSuccess: (index: number, data: Data) => void;
        onFailure: (error: string) => void;
    }

    interface GetAlertsRequest {
        page: number;
        perPage: number;
    }

    interface GetAlertsResponse extends Response {
        d: Data;
    }

    interface Data {
        page: number;
        perPage: number;
        total: number;
        table_data: Item[];
    }

    type Item = TokenItem | NftItem;

    interface TokenItem {
        id: number;
        unit: string;
        name: string;
        type: string;
        price: number;
        note: string;
        status: string;
        day: string;
        time: string;
        price_usd: string;
    }

    interface NftItem {
        id: number;
        policy: string;
        name: string;
        type: string;
        price: number;
        listing: number;
        note: string;
        repeat: number;
        status: string;
        day: string;
        time: string;
        price_usd: number;
        logo: string;
    }

    interface AlertsActionPayload {
        index: number; // 0 | 1
        ids: number[];
    }
}
