declare namespace verification {
    interface RouteParams {
        username: string;
    }

    interface ResendCodeRequest {
        username: string;
    }

    interface ActiveCustomerPayload extends ActiveCustomerRequest {
        onActiveFailure: () => void;
    }

    interface ActiveCustomerRequest {
        username: string;
        verifi_code: number;
    }
}
