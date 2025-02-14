declare namespace forgotPassword {
    interface ForgotPasswordRequest {
        username: string;
    }

    interface UpdatePasswordRouteParams {
        username: string;
    }

    interface ForgotPasswordUpdateRequest {
        username: string;
        code_reset_password: string;
        password: string;
        re_password: string;
    }
}
