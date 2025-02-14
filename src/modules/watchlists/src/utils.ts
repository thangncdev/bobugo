import { t } from 'i18next';
import { isNil } from 'lodash';

import { MarketsRanking, TokensType } from 'modules/markets/src/constants';
import { MASTERDATA_INITIAL_STATE } from 'modules/masterdata/src/constants';
import { store } from 'redux/store';

export const getWatchlistRoutes = (): markets.Route[] => {
    return [
        { label: t('tokens'), key: TokensType.TOKEN, ranking: MarketsRanking.VOLUME },
        { label: t('nfts'), key: TokensType.NFT, ranking: MarketsRanking.MARKET_CAP },
    ];
};

export const getWatchliststHeader = (index: number): masterdata.NftHeader => {
    const { masterdata } = store.getState();
    const { tokenWatchlistsHeader, nftWatchlistsHeader } = masterdata;
    if (isWatchlistsTokensRoute(index)) {
        return isNil(tokenWatchlistsHeader) ? MASTERDATA_INITIAL_STATE.tokenWatchlistsHeader : tokenWatchlistsHeader;
    }
    return isNil(nftWatchlistsHeader) ? MASTERDATA_INITIAL_STATE.nftWatchlistsHeader : nftWatchlistsHeader;
}

export const isWatchlistsTokensRoute = (index: number): boolean => {
    return index === 0;
}

export const isWatchlistsNftsRoute = (index: number): boolean => {
    return index === 1;
}
