import BigNumber from 'bignumber.js';
import { t } from 'i18next';
import { isNil } from 'lodash';

import { MarketsRanking, TokensType } from 'modules/markets/src/constants';
import { MASTERDATA_INITIAL_STATE } from 'modules/masterdata/src/constants';
import { store } from 'redux/store';
import { Sizes } from 'themes';
import scales from 'utils/scales';

export const getMarketRoutes = (): markets.Route[] => {
    const { masterdata } = store.getState();
    const { tokenOrders, nftOrders } = masterdata;

    let routes: markets.Route[] = [
        { label: t('tokens'), key: TokensType.TOKEN, ranking: MarketsRanking.VOLUME },
        { label: t('nfts'), key: TokensType.NFT, ranking: MarketsRanking.MARKET_CAP },
    ];

    const _tokenOrders: markets.Route[] = tokenOrders.map(tokenOrder => {
        return { ...tokenOrder, key: `${TokensType.TOKEN}_${tokenOrder.key}`, ranking: tokenOrder.key }
    });
    const _nftOrders = nftOrders.map(nftOrder => {
        return { ...nftOrder, key: `${TokensType.NFT}_${nftOrder.key}`, ranking: nftOrder.key }
    });
    routes = [...routes, ..._tokenOrders, ..._nftOrders];

    return routes;
};

export const getMainAndSubRoutes = (routes: markets.Route[]): {
    mainRoutes: markets.Route[];
    tokenOrderRoutes: markets.Route[];
    nftOrderRoutes: markets.Route[];
} => {
    const mainRoutes = routes.slice(0, 2);
    const orderRoutes = routes.slice(2);
    let tokenOrderRoutes: markets.Route[] = [];
    let nftOrderRoutes: markets.Route[] = [];
    orderRoutes.forEach(orderRoute => {
        if (orderRoute.key.includes(TokensType.TOKEN)) {
            tokenOrderRoutes = [...tokenOrderRoutes, orderRoute];
        } else if (orderRoute.key.includes(TokensType.NFT)) {
            nftOrderRoutes = [...nftOrderRoutes, orderRoute];
        }
    });
    return {
        mainRoutes,
        tokenOrderRoutes,
        nftOrderRoutes,
    }
};

export const isTokensRoute = (index: number): boolean => {
    const { masterdata } = store.getState();
    const { tokenOrders } = masterdata;

    return index === 0 || (index >= 2 && index <= tokenOrders.length + 1);
}

export const isNftsRoute = (index: number): boolean => {
    const { masterdata } = store.getState();
    const { tokenOrders, nftOrders } = masterdata;

    return index === 1 || (index > tokenOrders.length + 1 && index <= tokenOrders.length + nftOrders.length + 1);
}

export const getMarketHeader = (index: number, ranking: MarketsRanking): masterdata.NftHeader => {
    const { masterdata } = store.getState();
    const { tokenHeader, nftHeader } = masterdata;

    if (isTokensRoute(index)) {
        const defaultTokenHeader = MASTERDATA_INITIAL_STATE.tokenHeader;
        const header = isNil(tokenHeader) ? defaultTokenHeader[ranking] : tokenHeader[ranking];
        return isNil(header) ? defaultTokenHeader[MarketsRanking.VOLUME] : header;
    }
    return isNil(nftHeader) ? MASTERDATA_INITIAL_STATE.nftHeader : nftHeader;
}

export const getWidthOfColumn = (percent: string = '1', header: masterdata.NftHeader) => {
    const total = header.widthArr.reduce((_total, _width) => {
        return new BigNumber(_total).plus(new BigNumber(_width)).toNumber()
    }, 0);
    const width = new BigNumber(Sizes.screenWidth - scales(32)).times(percent).div(total);
    return width.isNaN() ? 0 : width.minus(7).toNumber();
}
