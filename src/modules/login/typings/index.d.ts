declare namespace login {
    interface LoginRequest extends RouteParams {
        username: string;
        password: string;
    }

    interface LoginWithAppleRequest {
        idtoken: string;
        name: string;
        email: string;
    }

    interface RouteParams {
        onLoginSuccess?: () => void;
    }

    interface LoginResponse extends Response {
        d: user.AuthPair[];
    }

    interface UpdateFCMTokenRequest {
        firebase_id: string;
    }
}
