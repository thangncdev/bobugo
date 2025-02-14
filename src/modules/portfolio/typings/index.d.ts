declare namespace portfolio {
    interface ScanAddressRouteParams {
        setValue: (value: string) => void;
    }

    interface Data {
        page: number;
        perPage: number;
        total: number;
        table_data: ItemPortfolio[];
    }

    interface Item {
        id: number;
        name: string;
        address: string;
        asset: string;
        asset_ada: string;
    }

    interface GetPortfoliosActionPayload {
        page: number;
        oldTableData: ItemPortfolio[];
        onSuccess: (data: Data) => void;
        onFailure: (error: string) => void;
    }

    interface GetPortfoliosRequest {
        page: number;
        perPage: number;
    }

    interface GetPortfoliosResponse extends Response {
        d: Data;
    }

    interface AddPortfolioRequest {
        name: string;
        address: string;
    }

    interface AddPortfolioResponse extends Response {
        d: Item[];
    }

    interface EditPortfolioRequest {
        id: number;
        name: string;
        address: string;
    }

    interface RouteParams {
        id: number;
        name: string;
    }
}
