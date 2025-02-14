declare namespace user {
    type State = Readonly<Info>;

    interface Info {
        isLogin: boolean;
        authPair: AuthPair;
        profile: Profile;
        showBalance: boolean;
    }

    interface AuthPair {
        token: string;
        refresh_token: string;
    }

    interface Profile {
        name: string;
        code: string;
        username: string;
        email: string;
        phone: string | null;
        is_active: boolean;
        limit_alert_token: number,
        limit_alert_nft: number,
        limit_alert_wallet: number,
    }

    interface GetProfileResponse extends Response {
        d: { infor: Profile }[];
    }

    interface ChangePasswordRequest {
        password_old: string;
        password_new: string;
        repassword: string;
    }

}
