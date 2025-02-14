class VerificationActions {
    public readonly RESEND_CODE = 'RESEND_CODE';
    public readonly RESEND_CODE_SUCCESS = 'RESEND_CODE_SUCCESS';
    public readonly RESEND_CODE_FAILURE = 'RESEND_CODE_FAILURE';

    public readonly ACTIVE_CUSTOMER = 'ACTIVE_CUSTOMER';
    public readonly ACTIVE_CUSTOMER_SUCCESS = 'ACTIVE_CUSTOMER_SUCCESS';
    public readonly ACTIVE_CUSTOMER_FAILURE = 'ACTIVE_CUSTOMER_FAILURE';
}

export declare namespace verificationActionTypes {
    type resendCodeActionType = TypedAction<typeof verificationActions.RESEND_CODE, verification.ResendCodeRequest>;
    type resendCodeSuccessActionType = TypedActionEmpty<typeof verificationActions.RESEND_CODE_SUCCESS>;
    type resendCodeFailureActionType = TypedActionError<typeof verificationActions.RESEND_CODE_FAILURE, string>;

    type activeCustomerActionType = TypedAction<typeof verificationActions.ACTIVE_CUSTOMER, verification.ActiveCustomerPayload>;
    type activeCustomerSuccessActionType = TypedActionEmpty<typeof verificationActions.ACTIVE_CUSTOMER_SUCCESS>;
    type activeCustomerFailureActionType = TypedActionError<typeof verificationActions.ACTIVE_CUSTOMER_FAILURE, string>;
}

class VerificationActionCreators {
    public resendCode = (payload: verification.ResendCodeRequest): verificationActionTypes.resendCodeActionType => ({ type: verificationActions.RESEND_CODE, payload });
    public resendCodeSuccess = (): verificationActionTypes.resendCodeSuccessActionType => ({ type: verificationActions.RESEND_CODE_SUCCESS });
    public resendCodeFailure = (error: string): verificationActionTypes.resendCodeFailureActionType => ({ type: verificationActions.RESEND_CODE_FAILURE, error });

    public activeCustomer = (payload: verification.ActiveCustomerPayload): verificationActionTypes.activeCustomerActionType => ({ type: verificationActions.ACTIVE_CUSTOMER, payload });
    public activeCustomerSuccess = (): verificationActionTypes.activeCustomerSuccessActionType => ({ type: verificationActions.ACTIVE_CUSTOMER_SUCCESS });
    public activeCustomerFailure = (error: string): verificationActionTypes.activeCustomerFailureActionType => ({ type: verificationActions.ACTIVE_CUSTOMER_FAILURE, error });
}

export const verificationActions = new VerificationActions();
export const verificationActionCreators = new VerificationActionCreators();
