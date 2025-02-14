declare namespace register {
    interface RegisterRequest {
        username: string;
        password: string;
        re_password: string;
    }

    interface RegisterResponse extends Response {
        d: user.Token[];
    }

    type ValidatePassword = (password: string) => boolean;
}
