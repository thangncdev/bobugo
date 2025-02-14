export type RootNavigatorParamList = {
    // tabbar region
    Markets: undefined;
    News: undefined;
    Watchlists: undefined;
    Alerts: undefined;
    Portfolio: undefined;
    // tabbar region

    Launch: undefined;
    Onboarding: undefined;
    Login: login.RouteParams;
    Register: undefined;
    ForgotPassword: undefined;
    UpdatePassword: forgotPassword.UpdatePasswordRouteParams;
    Verification: verification.RouteParams;
    Profile: undefined;
    Main: undefined;
    MarketSearch: markets.MarketSearchRouteParams;
    TokenDetail: tokenDetail.RouteParams;
    ChangePassword: undefined;
    NewsDetail: newsDetail.RouteParams;
    AddPriceAlerts: { isTokenRoute: boolean };
    AddTokenAlert: alerts.AddTokenAlertRouteParams;
    EditTokenAlert: { item: alerts.Item };
    AddNftAlert: alerts.AddNftAlertRouteParams;
    EditNftAlert: { item: alerts.Item };
    Settings: undefined;
    AlertsSetting: undefined;
    Webview: webview.RouteParams;
    AddAddress: undefined;
    EditAddress: portfolio.Item;
    ScanAddress: portfolio.ScanAddressRouteParams;
    WalletDetail: portfolio.RouteParams;
};
