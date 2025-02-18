declare namespace masterdata {
    type State = Readonly<Info>;

    interface Info {
        tokenHeader: TokenHeader;
        tokenOrders: NftOrder[];
        tokenIntervals: Interval[];
        nftHeader: NftHeader;
        nftOrders: NftOrder[];
        nftIntervals: Interval[];
        unitSelected: CurrencyUnit;
        tokenWatchlistsHeader: TokenWatchlistHeader;
        nftWatchlistsHeader: NftWatchlistHeader;
        supportWebsite: SupportWebsite;
    }

    interface NftOrder {
        icon: string;
        color: string[];
        label: string;
        key: string;
    }

    interface NftHeader {
        colums: string[];
        widthArr: string[];
        alignItems?: FlexAlignType[];
    }

    type TokenHeader = Record<string, NftHeader>;

    type TokenWatchlistHeader = NftHeader;
    type NftWatchlistHeader = NftHeader;

    interface Interval {
        label: string;
        key: string;
    }

    interface SupportWebsite {
        link_website: string;
        link_teams_of_use: string;
        link_privacy_policy: string;
        link_contact_us: string;
        END_POINT: string;
        CHART_URL: string;
        EMAIL_SUPPORT: string;
    }
}
