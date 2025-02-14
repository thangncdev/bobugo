declare namespace walletDetail {
    interface Route {
        key: import('modules/walletDetail/src/constants').WalletMode;
        title: string;
    }

    interface RewardsData {
        page: number;
        perPage: number;
        table_header: masterdata.NftHeader;
        table_data: RewardItem[];
        canLoadMore: boolean;
    }

    interface RewardItem {
        colums: [number, string, string];
    }

    interface GetRewardsActionPayload {
        id: number;
        page: number;
        oldTableData: RewardItem[];
        onSuccess: (data: RewardsData, canLoadMore: boolean) => void;
        onFailure: (error: string) => void;
    }

    interface GetRewardsRequest {
        id: number;
        page: number;
        perPage: number;
    }

    interface GetRewardsResponse extends Response {
        data: RewardsData;
    }

    interface PortfolioData {
        total_value_usd: string;
        total_value_ada: string;
        total_value_change_usd: string;
        total_value_change_ada: string;
        total_value_change_type: 'down' | 'up';
        percenter_token: string;
        percenter_nft: string;
        asset_percenter: AssetPercent[];
        asset_list: AssetList;
    }

    interface AssetPercent {
        name: string;
        percenter: string;
    }

    interface AssetList {
        asset_header: masterdata.NftHeader;
        asset_data: AssetItem[];
    }

    interface AssetItem {
        colums: [string, string, string, string];
    }

    interface GetPortfolioActionPayload {
        id: number;
        onSuccess: (data: PortfolioData) => void;
        onFailure: (error: string) => void;
    }

    interface GetPortfolioRequest {
        id: number;
    }

    interface GetPortfolioResponse extends Response {
        data: PortfolioData;
    }
}
