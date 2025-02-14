import { t } from 'i18next';

import { ITEM_LOAD, START_PAGE } from 'constants/constants';

export enum WalletMode {
    PORTFOLIO = 'portfolio',
    REWARDS = 'rewards',
}

export const WalletRoutes = [
    { key: WalletMode.PORTFOLIO, title: t('portfolio_mode') },
    { key: WalletMode.REWARDS, title: t('rewards_mode') },
];

const REWARDS_TABLE_HEADER: masterdata.NftHeader = {
    colums: ['Epoch', 'Pool', 'Rewards'],
    widthArr: ['50', '90', '60'],
    alignItems: ['flex-start', 'flex-start', 'flex-end'],
};

const PORTFOLIO_TABLE_HEADER: masterdata.NftHeader = {
    colums: ['Logo', 'Asset', 'Price', 'Allocation'],
    widthArr: ['30', '70', '60', '70'],
    alignItems: ['center', 'flex-start', 'flex-end', 'flex-end'],
};

export const REWARDS_INIT_DATA: walletDetail.RewardsData & FlatListLoadData & { canLoadMore: boolean } = {
    page: START_PAGE,
    perPage: ITEM_LOAD,
    table_header: REWARDS_TABLE_HEADER,
    table_data: [],
    refreshing: false,
    fetching: true,
    canLoadMore: false,
};

export const PORTFOLIO_INIT_DATA: walletDetail.PortfolioData & FlatListLoadData = {
    total_value_usd: '',
    total_value_ada: '',
    total_value_change_usd: '',
    total_value_change_ada: '',
    total_value_change_type: 'up',
    percenter_token: '',
    percenter_nft: '',
    asset_percenter: [],
    asset_list: {
        asset_header: PORTFOLIO_TABLE_HEADER,
        asset_data: [],
    },
    refreshing: false,
    fetching: true,
    canLoadMore: false,
};
