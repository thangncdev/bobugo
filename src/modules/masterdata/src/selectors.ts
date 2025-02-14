import { createSelector } from 'reselect';

import { CurrencyUnit } from 'modules/markets/src/constants';
import { MASTERDATA_INITIAL_STATE } from 'modules/masterdata/src/constants';

export const masterdataSelector = (state: GlobalState) => state.masterdata;

export const masterdataTokenHeadersSelector = createSelector(
    masterdataSelector,
    masterdata => masterdata.tokenHeader as masterdata.TokenHeader ?? MASTERDATA_INITIAL_STATE.tokenHeader,
);

export const masterdataTokenOrdersSelector = createSelector(
    masterdataSelector,
    masterdata => masterdata.tokenOrders as masterdata.NftOrder[] ?? MASTERDATA_INITIAL_STATE.tokenOrders,
);

export const masterdataTokenIntervalsSelector = createSelector(
    masterdataSelector,
    masterdata => masterdata.tokenIntervals as masterdata.Interval[] ?? MASTERDATA_INITIAL_STATE.tokenIntervals,
);

export const masterdataNftHeaderSelector = createSelector(
    masterdataSelector,
    masterdata => masterdata.nftHeader as masterdata.NftHeader ?? MASTERDATA_INITIAL_STATE.nftHeader,
);

export const masterdataNftOrdersSelector = createSelector(
    masterdataSelector,
    masterdata => masterdata.nftOrders as masterdata.NftOrder[] ?? MASTERDATA_INITIAL_STATE.nftOrders,
);

export const masterdataNftIntervalsSelector = createSelector(
    masterdataSelector,
    masterdata => masterdata.nftIntervals as masterdata.Interval[] ?? MASTERDATA_INITIAL_STATE.nftIntervals,
);

export const masterdataUnitSelectedSelector = createSelector(
    masterdataSelector,
    masterdata => masterdata.unitSelected as CurrencyUnit ?? MASTERDATA_INITIAL_STATE.unitSelected,
);

export const masterdataSupportWebsiteSelector = createSelector(
    masterdataSelector,
    masterdata => masterdata.supportWebsite as masterdata.SupportWebsite ?? MASTERDATA_INITIAL_STATE.supportWebsite,
);
