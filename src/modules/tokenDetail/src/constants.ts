import { t } from 'i18next';

import { ITEM_LOAD, START_PAGE } from 'constants/constants';

export enum TokenDetailTab {
    OVERVIEW = 'Overview',
    POOL_INFO = 'Pool info',
    NEWS = 'News',
}

export const TokenDetailRoutes = [
    { key: TokenDetailTab.OVERVIEW, title: t('overview') },
    { key: TokenDetailTab.POOL_INFO, title: t('pool_info') },
    { key: TokenDetailTab.NEWS, title: t('tabBar.news') },
];

export const HISTORY_DATA: tokenDetail.HistoryData & FlatListLoadData & { canLoadMore: boolean } = {
    page: START_PAGE,
    perPage: ITEM_LOAD,
    table_header: {} as masterdata.NftHeader,
    table_data: [],
    refreshing: false,
    fetching: true,
    canLoadMore: false,
};

export const INIT_RESPONSE_NEWS = {
    page: START_PAGE,
    perPage: ITEM_LOAD,
    total: 0,
    table_data: [],
};
