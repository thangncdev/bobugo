class AlertActions {
    public readonly ADD_TOKEN_ALERT = 'ADD_TOKEN_ALERT';
    public readonly EDIT_TOKEN_ALERT = 'EDIT_TOKEN_ALERT';

    public readonly ADD_NFT_ALERT = 'ADD_NFT_ALERT';
    public readonly EDIT_NFT_ALERT = 'EDIT_NFT_ALERT';

    public readonly GET_ALERTS = 'GET_ALERTS';
    public readonly DELETE_ALERTS = 'DELETE_ALERTS';
    public readonly ACTIVATE_ALERTS = 'ACTIVATE_ALERTS';
    public readonly DEACTIVATE_ALERTS = 'DEACTIVATE_ALERTS';
    public readonly SEND_MAIL_SUPPORT_ALERT = 'SEND_MAIL_SUPPORT_ALERT';
}

export declare namespace alertActionTypes {
    type addTokenAlertActionType = TypedAction<typeof alertActions.ADD_TOKEN_ALERT, alerts.AddTokenAlertRequest>;
    type editTokenAlertActionType = TypedAction<typeof alertActions.EDIT_TOKEN_ALERT, alerts.EditTokenAlertRequest>;

    type addNftAlertActionType = TypedAction<typeof alertActions.ADD_NFT_ALERT, alerts.AddNftAlertRequest>;
    type editNftAlertActionType = TypedAction<typeof alertActions.EDIT_NFT_ALERT, alerts.EditNftAlertRequest>;

    type getAlertsActionType = TypedAction<typeof alertActions.GET_ALERTS, alerts.GetAlertsActionPayload>;
    type deleteAlertsActionType = TypedAction<typeof alertActions.DELETE_ALERTS, alerts.AlertsActionPayload>;
    type activateAlertsActionType = TypedAction<typeof alertActions.ACTIVATE_ALERTS, alerts.AlertsActionPayload>;
    type deactivateAlertsActionType = TypedAction<typeof alertActions.DEACTIVATE_ALERTS, alerts.AlertsActionPayload>;
    type sendMailSupportAlertActionType = TypedAction<typeof alertActions.SEND_MAIL_SUPPORT_ALERT, number>;
}

class AlertActionCreators {
    public addTokenAlert = (payload?: alerts.AddTokenAlertRequest): alertActionTypes.addTokenAlertActionType => ({ type: alertActions.ADD_TOKEN_ALERT, payload });
    public editTokenAlert = (payload?: alerts.EditTokenAlertRequest): alertActionTypes.editTokenAlertActionType => ({ type: alertActions.EDIT_TOKEN_ALERT, payload });

    public addNftAlert = (payload?: alerts.AddNftAlertRequest): alertActionTypes.addNftAlertActionType => ({ type: alertActions.ADD_NFT_ALERT, payload });
    public editNftAlert = (payload?: alerts.EditNftAlertRequest): alertActionTypes.editNftAlertActionType => ({ type: alertActions.EDIT_NFT_ALERT, payload });

    public getAlerts = (payload: alerts.GetAlertsActionPayload): alertActionTypes.getAlertsActionType => ({ type: alertActions.GET_ALERTS, payload });
    public deleteAlerts = (payload: alerts.AlertsActionPayload): alertActionTypes.deleteAlertsActionType => ({ type: alertActions.DELETE_ALERTS, payload });
    public activateAlerts = (payload: alerts.AlertsActionPayload): alertActionTypes.activateAlertsActionType => ({ type: alertActions.ACTIVATE_ALERTS, payload });
    public deactivateAlerts = (payload: alerts.AlertsActionPayload): alertActionTypes.deactivateAlertsActionType => ({ type: alertActions.DEACTIVATE_ALERTS, payload });
    public sendMailSupportAlert = (payload: number): alertActionTypes.sendMailSupportAlertActionType => ({ type: alertActions.SEND_MAIL_SUPPORT_ALERT, payload });
}

export const alertActions = new AlertActions();
export const alertActionCreators = new AlertActionCreators();
