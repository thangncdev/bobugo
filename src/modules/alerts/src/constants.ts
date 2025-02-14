import { t } from 'i18next';

import { TokensType } from 'modules/markets/src/constants';
import scales from 'utils/scales';

export const AlertsRoute = [
    { label: t('tokens'), key: TokensType.TOKEN },
    { label: t('nfts'), key: TokensType.NFT },
]

export enum MoreOptions {
    DEACTIVATE = 'Deactivate',
    SELECT = 'Select',
    UNSELECT = 'UnSelect',
    EDIT = 'Edit',
    DELETE = 'Delete',
    ACTIVATE = 'Activate',
    SELECT_ALL = 'Select All',
    UNSELECT_ALL = 'UnSelect All',
}

export enum AlertStatus {
    ACTIVE = 'Active',
    DEACTIVE = 'Diactive',
}

export const ALERTS_DROPDOWN_WIDTH = scales(195);
export const ALERTS_DROPDOWN_HEIGHT_ITEM = scales(56);
