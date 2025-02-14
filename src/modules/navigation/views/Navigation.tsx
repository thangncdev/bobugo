import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Linking, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';

import Drawer from 'components/drawer/Drawer';
import Loading from 'components/global/Loading';
import SuccessBlur from 'components/global/SuccessBlur';
import Toast from 'components/global/Toast';
import AddNftAlertScreen from 'modules/alerts/views/AddNftAlert';
import AddPriceAlerts from 'modules/alerts/views/AddPriceAlerts';
import AddTokenAlertScreen from 'modules/alerts/views/AddTokenAlert';
import EditNftAlertScreen from 'modules/alerts/views/EditNftAlert';
import EditTokenAlertScreen from 'modules/alerts/views/EditTokenAlert';
import AlertsSettingScreen from 'modules/alertsSetting/views/AlertsSetting';
import ChangePassword from 'modules/changePassword/views/ChangePassword';
import ForgotPasswordScreen from 'modules/forgotPassword/views/ForgotPassword';
import UpdatePasswordScreen from 'modules/forgotPassword/views/UpdatePassword';
import LaunchScreen from 'modules/launch/views/Launch';
import LoginScreen from 'modules/login/views/Login';
import MainScreen from 'modules/main/views/Main';
import MarketSearchScreen from 'modules/markets/views/MarketSearch';
import { navigationRef } from 'modules/navigation/src/utils';
import { RootNavigatorParamList } from 'modules/navigation/typings';
import NewsDetailScreen from 'modules/newsDetail/views/NewsDetail';
import OnboardingScreen from 'modules/onboarding/views/Onboarding';
import AddAddressScreen from 'modules/portfolio/views/AddAddress';
import EditAddressScreen from 'modules/portfolio/views/EditAddress';
import ScanAddressScreen from 'modules/portfolio/views/ScanAddress';
import RegisterScreen from 'modules/register/views/Register';
import SettingsScreen from 'modules/settings/views/Settings';
import TokenDetailScreen from 'modules/tokenDetail/views/TokenDetail';
import { isLoginSelector } from 'modules/user/src/selectors';
import ProfileScreen from 'modules/user/views/Profile';
import VerificationScreen from 'modules/verification/views/Verification';
import WalletDetailScreen from 'modules/walletDetail/views/WalletDetail';
import WebviewScreen from 'modules/webview/views/Webview';
import NotificationServices from 'services/notifications';
import { Colors } from 'themes';

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

const RootStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
            initialRouteName='Launch'
        >
            <Stack.Screen name='Launch' component={LaunchScreen} />

            <Stack.Screen name='Onboarding' component={OnboardingScreen} options={{ gestureEnabled: false, animation: 'fade_from_bottom' }} />

            <Stack.Screen name='Main' component={MainScreen} options={{ gestureEnabled: false, animation: 'fade_from_bottom' }} />

            <Stack.Screen name='Login' component={LoginScreen} />

            <Stack.Screen name='Register' component={RegisterScreen} />

            <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />

            <Stack.Screen name='UpdatePassword' component={UpdatePasswordScreen} />

            <Stack.Screen name='Verification' component={VerificationScreen} />

            <Stack.Screen name='Profile' component={ProfileScreen} />

            <Stack.Screen name='MarketSearch' component={MarketSearchScreen} options={{ gestureEnabled: false, animation: 'fade_from_bottom' }} />

            <Stack.Screen name='TokenDetail' component={TokenDetailScreen} />

            <Stack.Screen name='ChangePassword' component={ChangePassword} />

            <Stack.Screen name='NewsDetail' component={NewsDetailScreen} />

            <Stack.Screen name='AddPriceAlerts' component={AddPriceAlerts} />

            <Stack.Screen name='AddTokenAlert' component={AddTokenAlertScreen} />

            <Stack.Screen name='EditTokenAlert' component={EditTokenAlertScreen} />

            <Stack.Screen name='AddNftAlert' component={AddNftAlertScreen} />

            <Stack.Screen name='EditNftAlert' component={EditNftAlertScreen} />

            <Stack.Screen name='Settings' component={SettingsScreen} />

            <Stack.Screen name='AlertsSetting' component={AlertsSettingScreen} />

            <Stack.Screen name='Webview' component={WebviewScreen} />

            <Stack.Screen name='AddAddress' component={AddAddressScreen} />

            <Stack.Screen name='EditAddress' component={EditAddressScreen} />

            <Stack.Screen name='ScanAddress' component={ScanAddressScreen} />

            <Stack.Screen name='WalletDetail' component={WalletDetailScreen} />
        </Stack.Navigator>
    );
};


const StackNavigator = () => {
    const isLogin = useSelector(isLoginSelector);

    const linking: LinkingOptions<RootNavigatorParamList> = {
        prefixes: ['bamboo://'],
        config: {
            initialRouteName: 'Launch',
            screens: {
                // NewsDetail: 'NewsDetail/:newsId',
                // WalletDetail: 'WalletDetail/:id/:name',
                // TokenDetail: 'TokenDetail/:key/:name/:logo',
            },
        },

        subscribe(listener) {
            const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
                NotificationServices.navigateDeeplink(url, isLogin);
                listener(url);
            });

            return () => {
                linkingSubscription.remove();
            };
        },
    };

    return (
        <NavigationContainer linking={linking} ref={navigationRef}>
            <StatusBar
                backgroundColor={Colors.color_FFFFFF}
                barStyle={'dark-content'}
                translucent
            />
            <RootStack />
            <Drawer />
            <Loading />
            <Toast />
            <SuccessBlur />
        </NavigationContainer>
    );

};

export default StackNavigator;
