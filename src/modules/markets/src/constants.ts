import { ITEM_LOAD, START_PAGE } from 'constants/constants';
import scales from 'utils/scales';

export enum MarketsRanking {
    MARKET_CAP = 'marketCap',
    VOLUME = 'volume',
    GAINERS = 'gainers',
    LOSERS = 'losers',
    LIQUIDITY = 'liquidity',
    MCAP = 'mcap'
}

export enum CurrencyUnit {
    ADA = 'ada',
    USDT = 'usdt',
}

export enum TokensType {
    TOKEN = 'token',
    NFT = 'nft'
}

export const NFTS_DATA: markets.NftsData & FlatListLoadData = {
    page: START_PAGE,
    perPage: ITEM_LOAD,
    total: 0,
    table_data: [],
    refreshing: false,
    fetching: true,
    canLoadMore: false,
}

export const SEARCH_TOKENS_DATA: markets.SearchTokensData & FlatListLoadData = {
    page: START_PAGE,
    per_page: ITEM_LOAD,
    total: 0,
    dt: [],
    refreshing: false,
    fetching: false,
    canLoadMore: false,
}

export const SEARCH_NFTS_DATA: markets.SearchNftsData & FlatListLoadData = {
    page: START_PAGE,
    per_page: ITEM_LOAD,
    total: 0,
    dt: [],
    refreshing: false,
    fetching: false,
    canLoadMore: false,
}

export const CURRENCY_DROPDOWN_WIDTH = scales(73);
export const SEARCH_DROPDOWN_WIDTH = scales(144);
