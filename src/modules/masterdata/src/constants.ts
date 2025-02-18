import { CurrencyUnit } from 'modules/markets/src/constants';

const TOKEN_HEADER: masterdata.TokenHeader = {
    volume: {
        colums: [
            '#',
            'logo',
            'Name',
            'Price',
            'Volume',
        ],
        widthArr: [
            '30',
            '70',
            '150',
            '100',
            '100',
        ],
        alignItems: [
            'flex-start',
            'center',
            'flex-start',
            'flex-start',
            'flex-start',
        ],
    },
    liquidity: {
        colums: [
            '#',
            'logo',
            'Name',
            'Price',
            'Liquidity',
        ],
        widthArr: [
            '30',
            '70',
            '150',
            '100',
            '100',
        ],
        alignItems: [
            'flex-start',
            'center',
            'flex-start',
            'flex-start',
            'flex-start',
        ],
    },
    mcap: {
        colums: [
            '#',
            'logo',
            'Name',
            'Price',
            'Mcap',
        ],
        widthArr: [
            '30',
            '70',
            '150',
            '100',
            '100',
        ],
        alignItems: [
            'flex-start',
            'center',
            'flex-start',
            'flex-start',
            'flex-start',
        ],
    },
};

const TOKEN_ORDERS: masterdata.NftOrder[] = [
    {
        icon: '',
        color: [
            '#FF5C00',
            '#FF5C00',
        ],
        label: 'Top Liquidity',
        key: 'liquidity',
    },
    {
        icon: '',
        color: [
            '#16C783',
            '#16C783',
        ],
        label: 'Top Mcap',
        key: 'mcap',
    },
];

const TOKEN_INTERVALS: masterdata.Interval[] = [
    {
        label: '3 min',
        key: '3m',
    },
    {
        label: '5 min',
        key: '5m',
    },
    {
        label: '15 min',
        key: '15m',
    },
    {
        label: '30 min',
        key: '30m',
    },
    {
        label: '1 hour',
        key: '1h',
    },
    {
        label: '2 hour',
        key: '2h',
    },
    {
        label: '4 hour',
        key: '4h',
    },
    {
        label: '12 hour',
        key: '12h',
    },
    {
        label: '1 day',
        key: '1d',
    },
    {
        label: '3 day',
        key: '3d',
    },
    {
        label: '1 week',
        key: '1w',
    },
    {
        label: '1 month',
        key: '1M',
    },
];

const NFT_HEADER: masterdata.NftHeader = {
    colums: [
        '#',
        'logo',
        'Name',
        'Price',
        'MCap',
        '24h',
    ],
    widthArr: [
        '30',
        '70',
        '150',
        '100',
        '100',
        '100',
    ],
    alignItems: [
        'flex-start',
        'center',
        'flex-start',
        'flex-start',
        'flex-start',
        'flex-end',
    ],
};

const NFT_ORDERS: masterdata.NftOrder[] = [
    {
        icon: 'IcTradding',
        color: [
            '#FF5C00',
            '#FF5C00',
        ],
        label: 'Trending',
        key: 'volume',
    },
    {
        icon: 'IcTopGainers',
        color: [
            '#16C783',
            '#16C783',
        ],
        label: 'Top Gainers',
        key: 'gainers',
    },
    {
        icon: 'IcLosers',
        color: [
            '#F02A79',
            '#F02A79',
        ],
        label: 'Top Losers',
        key: 'losers',
    },
];

const NFT_INTERVALS: masterdata.Interval[] = [
    {
        label: '3 min',
        key: '3m',
    },
    {
        label: '5 min',
        key: '5m',
    },
    {
        label: '15 min',
        key: '15m',
    },
    {
        label: '30 min',
        key: '30m',
    },
    {
        label: '1 hour',
        key: '1h',
    },
    {
        label: '2 hour',
        key: '2h',
    },
    {
        label: '4 hour',
        key: '4h',
    },
    {
        label: '12 hour',
        key: '12h',
    },
    {
        label: '1 day',
        key: '1d',
    },
    {
        label: '3 day',
        key: '3d',
    },
    {
        label: '1 week',
        key: '1w',
    },
    {
        label: '1 month',
        key: '1M',
    },
];

const NFT_WATCH_LIST_HEADER: masterdata.NftWatchlistHeader = {
    colums: [
        '#',
        'logo',
        'Name',
        'Price',
        'Volume',
        '24h',
    ],
    widthArr: [
        '30',
        '70',
        '150',
        '100',
        '100',
        '100',
    ],
    alignItems: [
        'flex-start',
        'center',
        'flex-start',
        'flex-start',
        'flex-start',
        'flex-end',
    ],
};

const TOKEN_WATCH_LIST_HEADER: masterdata.TokenWatchlistHeader = {
    colums: [
        '#',
        'logo',
        'Name',
        'Price',
        'Volume',
    ],
    widthArr: [
        '30',
        '70',
        '150',
        '100',
        '100',
    ],
    alignItems: [
        'flex-start',
        'center',
        'flex-start',
        'flex-start',
        'flex-start',
    ],
};

const SUPPORT_WEBSITE: masterdata.SupportWebsite = {
    link_website: 'https://bamboolabs.xyz/',
    link_teams_of_use: 'https://bamboolabs.xyz/link-n849.htm',
    link_privacy_policy: 'https://bamboolabs.xyz/link-n850.htm',
    link_contact_us: 'https://bamboolabs.xyz/link-n852.htm',
    END_POINT: 'https://backend.bobugo.com/mobile',
    CHART_URL: 'https://chart.bambooapp.xyz',
    EMAIL_SUPPORT: 'support@bobugo.com',
};

export const MASTERDATA_INITIAL_STATE: masterdata.State = {
    tokenHeader: TOKEN_HEADER,
    tokenOrders: TOKEN_ORDERS,
    tokenIntervals: TOKEN_INTERVALS,
    nftHeader: NFT_HEADER,
    nftOrders: NFT_ORDERS,
    nftIntervals: NFT_INTERVALS,
    unitSelected: CurrencyUnit.ADA,
    tokenWatchlistsHeader: TOKEN_WATCH_LIST_HEADER,
    nftWatchlistsHeader: NFT_WATCH_LIST_HEADER,
    supportWebsite: SUPPORT_WEBSITE,
};
