import { CurrencyUnit } from 'modules/markets/src/constants';
class MasterdataActions {
    public readonly GET_MASTERDATA_SUCCESS = 'GET_MASTERDATA_SUCCESS';
    public readonly GET_MASTERDATA_FAILURE = 'GET_MASTERDATA_FAILURE';

    public readonly CHANGE_UNIT_SELECTED = 'CHANGE_UNIT_SELECTED';
}

export declare namespace masterdataActionTypes {
    type getMasterDataSuccessActionType = TypedAction<typeof masterdataActions.GET_MASTERDATA_SUCCESS, masterdata.State | undefined>;
    type getMasterDataFailureActionType = TypedActionError<typeof masterdataActions.GET_MASTERDATA_FAILURE, string>;

    type changeUnitSelectedActionType = TypedAction<typeof masterdataActions.CHANGE_UNIT_SELECTED, CurrencyUnit>;
}

class MasterdataActionCreators {
    public getMasterDataSuccess = (payload?: masterdata.State): masterdataActionTypes.getMasterDataSuccessActionType => ({ type: masterdataActions.GET_MASTERDATA_SUCCESS, payload });
    public getMasterDataFailure = (error: string): masterdataActionTypes.getMasterDataFailureActionType => ({ type: masterdataActions.GET_MASTERDATA_FAILURE, error });

    public changeUnitSelected = (payload: CurrencyUnit): TypedAction<typeof masterdataActions.CHANGE_UNIT_SELECTED, CurrencyUnit> => ({ type: masterdataActions.CHANGE_UNIT_SELECTED, payload });
}

export const masterdataActions = new MasterdataActions();
export const masterdataActionCreators = new MasterdataActionCreators();
