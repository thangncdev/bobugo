class LaunchActions {
    public readonly INIT_DATA = 'INIT_DATA';
    public readonly INIT_DATA_SUCCESS = 'INIT_DATA_SUCCESS';
    public readonly INIT_DATA_FAILURE = 'INIT_DATA_FAILURE';
}

export declare namespace launchActionTypes {
    type initDataActionType = TypedActionEmpty<typeof launchActions.INIT_DATA>;
    type initDataSuccessActionType = TypedActionEmpty<typeof launchActions.INIT_DATA_SUCCESS>;
    type initDataFailureActionType = TypedActionError<typeof launchActions.INIT_DATA_FAILURE, string>;
}

class LaunchActionCreators {
    public initData = (): launchActionTypes.initDataActionType => ({ type: launchActions.INIT_DATA });
    public initDataSuccess = (): launchActionTypes.initDataSuccessActionType => ({ type: launchActions.INIT_DATA_SUCCESS });
    public initDataFailure = (error: string): launchActionTypes.initDataFailureActionType => ({ type: launchActions.INIT_DATA_FAILURE, error });
}

export const launchActions = new LaunchActions();
export const launchActionCreators = new LaunchActionCreators();
