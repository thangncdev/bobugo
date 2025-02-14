import notifee, { EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { get } from 'lodash';
import { useEffect } from 'react';
import { Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AlertsScreen from 'modules/alerts/views/Alerts';
import MainTabBar from 'modules/main/views/components/MainTabBar';
import MarketsScreen from 'modules/markets/views/Markets';
import { RootNavigatorParamList } from 'modules/navigation/typings';
import NewsScreen from 'modules/news/views/News';
import PortfolioScreen from 'modules/portfolio/views/Portfolio';
import { userActionCreators } from 'modules/user/src/actions';
import { isLoginSelector } from 'modules/user/src/selectors';
import WatchlistsScreen from 'modules/watchlists/views/Watchlists';
import { AppDispatch } from 'redux/store';
import NotificationServices from 'services/notifications';

const Tab = createBottomTabNavigator<RootNavigatorParamList>();

const MainScreen = () => {
    const dispatch = useDispatch<AppDispatch>();

    const isLogin: boolean = useSelector(isLoginSelector);

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            NotificationServices.pushNotificationLocal(remoteMessage).catch();
        });

        handleDeeplink().catch();
        return unsubscribe;
    }, []);

    useEffect(() => {
        NotificationServices.checkPermission(updateFCMToken).catch();
    }, [isLogin]);

    const handleDeeplink = async () => {
        const message = await messaging().getInitialNotification();
        const link = NotificationServices.handleNavigateScreen(message?.data);

        if (link) {
            await Linking.openURL(link);
        }

        notifee.onForegroundEvent(({ type, detail }) => {
            switch (type) {
                case EventType.PRESS:
                    const payload = get(detail, 'notification.data.payload', null);
                    if (payload) {
                        const jsonData = JSON.parse(payload);
                        const linkNotifiee = NotificationServices.handleNavigateScreen(jsonData);
                        if (linkNotifiee) {
                            Linking.openURL(linkNotifiee)
                        }
                    }
                    break;
            }
        });

        messaging().onNotificationOpenedApp(remoteMessage => {
            const linkOpenedApp = NotificationServices.handleNavigateScreen(remoteMessage?.data);
            if (linkOpenedApp) {
                Linking.openURL(linkOpenedApp)
            }
        });
    }

    useEffect(() => {
        getInitialURL().catch();
    }, []);

    const getInitialURL = async () => {
        try {
            const url = await Linking.getInitialURL();
            NotificationServices.navigateDeeplink(url, isLogin);
        } catch (err) {
            // TODO:
        }
    }

    const updateFCMToken = (fcmToken: string) => {
        if (isLogin) {
            const payload: login.UpdateFCMTokenRequest = { firebase_id: fcmToken };
            dispatch(userActionCreators.updateFcmToken(payload));
        }
    }

    const renderTabBar = (bottomTabBarProps: BottomTabBarProps) => {
        const tabBarProps = {
            ...bottomTabBarProps,
        }
        return <MainTabBar {...tabBarProps} />;
    };

    return (
        <>
            <Tab.Navigator
                initialRouteName='Markets'
                screenOptions={{
                    headerShown: false,
                    tabBarHideOnKeyboard: true,
                }}
                tabBar={renderTabBar}
            >
                <Tab.Screen name='Markets' component={MarketsScreen} />

                <Tab.Screen name='News' component={NewsScreen} />

                <Tab.Screen name='Watchlists' component={WatchlistsScreen} />

                <Tab.Screen name='Alerts' component={AlertsScreen} />

                <Tab.Screen name='Portfolio' component={PortfolioScreen} />
            </Tab.Navigator>
        </>
    );
}

export default MainScreen;
