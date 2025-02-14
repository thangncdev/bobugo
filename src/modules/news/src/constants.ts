import { t } from 'i18next';

import { ITEM_LOAD, START_PAGE } from 'constants/constants';

export enum NewsType {
    NEWS = 'news',
    ISPO = 'ispo',
}

export const NewsRoutes = [
    { key: NewsType.NEWS, title: t('news') },
    { key: NewsType.ISPO, title: t('ispo') },
];

export const INIT_RESPONSE_NEWS = {
    page: START_PAGE,
    perPage: ITEM_LOAD,
    total: 0,
    table_data: [],
};
