import notifee, { AndroidImportance, AndroidLaunchActivityFlag, AndroidStyle } from '@notifee/react-native';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { get } from 'lodash';
import { PermissionsAndroid, Platform } from 'react-native';

import { navigate } from 'modules/navigation/src/utils';
import { convertPayloadToQueryString, convertQueryStringToPayload, getExtraParams, getExtraPrefix } from 'utils/string';

const NotificationChannelId = 'bamboo';
const NotificationChannelName = 'bamboo';
const iconNotification = 'ic_notification';
const NAVIGATION_IDS = ['WalletDetail', 'TokenDetail', 'NewsDetail'];

const createDefaultChannel = async () => {
    if (Platform.OS === 'android') {
        await notifee.createChannel({
            id: NotificationChannelId,
            name: NotificationChannelName,
            importance: AndroidImportance.DEFAULT,
            sound: 'bamboo_sound',
        });
    }
};

const pushNotificationLocal = async (res: FirebaseMessagingTypes.RemoteMessage) => {
    try {
        await createDefaultChannel();
        const image =
            Platform.OS === 'android'
                ? get(res, 'notification.android.imageUrl')
                : get(res, 'data.fcm_options.image');

        if (image) {
            await sendImageWithImage(res, image);
        } else {
            await sendImageWithoutImage(res);
        }
    } catch (err) {
        throw err;
    }
};

const sendImageWithoutImage = async (res) => {
    await notifee.displayNotification({
        id: res?.data?.id?.toString() || res?.messageId?.toString() || Date.now()?.toString(),
        title: res?.notification?.title || '',
        body: res?.notification?.body || '',
        android: {
            channelId: NotificationChannelId,
            importance: AndroidImportance.DEFAULT,
            // largeIcon: iconNotification,
            smallIcon: iconNotification,
            pressAction: {
                id: 'default',
                launchActivity: 'default',
                launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
            },
            sound: 'bamboo_sound',
        },
        data: {
            payload: (res?.data && JSON.stringify(res?.data)) || '',
        },
    });
};

const sendImageWithImage = async (res, image) => {
    await notifee.displayNotification({
        id: res?.data?.id?.toString() || res?.messageId?.toString() || Date.now()?.toString(),
        title: res?.notification?.title || '',
        body: res?.notification?.body || '',
        android: {
            channelId: NotificationChannelId,
            importance: AndroidImportance.DEFAULT,
            style: { type: AndroidStyle.BIGPICTURE, picture: image },
            largeIcon: image,
            smallIcon: iconNotification,
            pressAction: {
                id: 'default',
                launchActivity: 'default',
                launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
            },
            sound: 'bamboo_sound',
        },
        ios: {
            attachments: [
                {
                    url: image,
                    thumbnailHidden: false,
                    thumbnailClippingRect: { x: 0.0, y: 0.0, width: 1.0, height: 1.0 },
                },
            ],
        },
        data: {
            payload: (res?.data && JSON.stringify(res?.data)) || '',
        },
    });
};
const checkPermission = async (updateFCMToken) => {
    try {
        const enabled = await messaging().hasPermission();
        if (enabled === 1) {
            await getToken(updateFCMToken);
        } else {
            await requestPermission(updateFCMToken);
        }
    } catch (err) {
        throw err;
    }
};

async function requestPermission(updateFCMToken) {
    if (Platform.OS === 'android') {
        const OsVer = Platform.constants['Release'];
        if (parseInt(OsVer) >= 13) {
            // Android 13 need request post notification permission.
            await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        }
    } else {
        await notifee.requestPermission();
    }

    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        await getToken(updateFCMToken);
    }
}

const getToken = async (updateFCMToken) => {
    const deviceToken = await messaging().getToken();
    console.log('fcmToken', deviceToken);
    // Clipboard.setString(deviceToken);
    if (deviceToken) {
        updateFCMToken(deviceToken);
    }
};

const handleNotification = async () => {
    await createDefaultChannel();
};

function handleNavigateScreen(data): string | null {
    const navigationId = data?.navigationId;

    if (!NAVIGATION_IDS.includes(navigationId)) {
        return null;
    }
    if (navigationId === 'WalletDetail') {
        return handleNavigateWalletDetail(data);
    }
    if (navigationId === 'TokenDetail') {
        return handleNavigateTokenDetail(data);
    }
    if (navigationId === 'NewsDetail') {
        return handleNavigateNewsDetail(data);
    }
    return null;
}

const handleNavigateWalletDetail = (data) => {
    const params = convertPayloadToQueryString(data);
    // const walletId = get(data, 'walletId', null);
    // const walletName = get(data, 'walletName', null);
    return `bamboo://WalletDetail?${params}`;
    // bamboo://WalletDetail
};

const handleNavigateTokenDetail = (data) => {
    const params = convertPayloadToQueryString(data);
    // const tokenName = get(data, 'tokenName', null);
    // const tokenLogo = get(data, 'tokenLogo', null);
    // const tokenKey = get(data, 'tokenKey', null);
    // const typeKey = get(data, 'typeKey', null);
    return `bamboo://TokenDetail?${params}`;
    // bamboo://TokenDetail
};

const handleNavigateNewsDetail = (data) => {
    const params = convertPayloadToQueryString(data);
    // const newsId = get(data, 'newsId', null);
    return `bamboo://NewsDetail?${params}`;
    // bamboo://NewsDetail?newsId=3222
};

// eslint-disable-next-line complexity
const navigateDeeplink = (url: string, isLogin: boolean) => {
    if (!url?.includes('bamboo://')) {
        return;
    }

    const extraPrefix = getExtraPrefix(url);
    const extraParams = getExtraParams(url);
    const paramsObj = convertQueryStringToPayload(extraParams);


    if (extraPrefix) {
        switch (extraPrefix) {
            case NAVIGATION_IDS[0]: { // Wallet Detail
                if (!isLogin) {
                    return;
                }
                const walletId = get(paramsObj, 'walletId', null);
                const walletName = get(paramsObj, 'walletName', null);
                const params = {
                    id: walletId,
                    name: walletName?.includes('%') ? decodeURIComponent(walletName) : walletName,
                };
                if (walletId) {
                    navigate('WalletDetail', params);
                }
                return;
            }
            case NAVIGATION_IDS[1]: { // Token Detail
                const tokenName = get(paramsObj, 'tokenName', '');
                const tokenLogo = get(paramsObj, 'tokenLogo', '');
                const tokenKey = get(paramsObj, 'tokenKey', '');
                const typeKey: 'unit' | 'policy' = get(paramsObj, 'typeKey', 'unit');
                const params = {
                    name: tokenName?.includes('%') ? decodeURIComponent(tokenName) : tokenName,
                    logo: tokenLogo?.includes('%') ? decodeURIComponent(tokenLogo) : tokenLogo,
                    key: {
                        [typeKey]: tokenKey,
                    },
                };
                if (typeKey && tokenKey) {
                    navigate('TokenDetail', params);
                }
                return;
            }
            case NAVIGATION_IDS[2]: { // News
                const newsId = get(paramsObj, 'newsId', '');
                if (newsId) {
                    navigate('NewsDetail', { newsId });
                }
                return;
            }
            default:
                return;
        }
    }
};

const NotificationServices = {
    handleNotification,
    pushNotificationLocal,
    checkPermission,
    handleNavigateScreen,
    navigateDeeplink,
};

export default NotificationServices;
