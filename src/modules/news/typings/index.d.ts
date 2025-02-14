declare namespace news {
    interface Route {
        key: NewsTab;
        title: string;
    }

    interface GetNewsActionPayload {
        page: int;
        per_page: int;
        type: NewsType.NEWS | NewsType.ISPO;
        currentData: tokenDetail.NewsItem[];
        onSuccess: (res: NewsData) => void;
        onFailure: () => void;
    }

    interface GetNewsParams {
        page: int;
        per_page: int;
        type: NewsType.NEWS | NewsType.ISPO;
    }

    interface GetNewsResponse extends Response {
        data: NewsData;
    }

    interface NewsData {
        page: number;
        perPage: number;
        total: number;
        table_data: NewsItem[];
    }

    interface NewsItem {
        id: string;
        title: string;
        description: string;
        image: string;
        create_date: string;
    }

    interface GetNewsUriActionPayload {
        newsId: int;
        onSuccess: (res: NewsUriData) => void;
        onFailure: () => void;
    }

    interface GetNewsUriParams {
        newId: int;
    }

    interface GetNewsUriResponse extends Response {
        data: NewsUriData;
    }

    interface NewsUriData {
        id: string;
        title: string;
        description: string;
        image: string;
        create_date: string;
        url: string;
    }
}
