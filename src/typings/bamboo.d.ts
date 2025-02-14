declare interface Action {
    readonly type: string;
    readonly payload?: object;
}

declare interface TypedAction<T, U> {
    type: T;
    payload: U;
}

declare interface TypedActionResponse<T, U> {
    type: T;
    response: U;
}

declare interface TypedActionError<T, U> {
    type: T;
    error: U;
}

declare interface TypedActionEmpty<T> {
    type: T;
}

declare interface Response {
    c: number;
    m: string;
}

declare interface FlatListLoadData {
    refreshing: boolean;
    fetching: boolean;
    canLoadMore: boolean;
}
