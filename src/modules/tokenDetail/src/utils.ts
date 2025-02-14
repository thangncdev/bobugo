import { navigate } from 'modules/navigation/src/utils';

export const isTokenKey = (key: markets.Key) => {
    const tokenKey = key as markets.TokenKey;
    const nftKey = key as markets.NftKey;
    return tokenKey?.unit ? true : !nftKey?.policy;
};

export const goToTokenDetail = (params: tokenDetail.RouteParams) => navigate('TokenDetail', params);
