import { createNavigationContainerRef, StackActions } from '@react-navigation/native';
import { Linking } from 'react-native';

import { RootNavigatorParamList } from 'modules/navigation/typings';

export const navigationRef = createNavigationContainerRef<RootNavigatorParamList>();

export const SCREENS_NEED_LOGIN: (keyof RootNavigatorParamList)[] = [
    'Watchlists',
    'Alerts',
    'Portfolio',
]

export function navigate(
    name: keyof RootNavigatorParamList,
    params?: RootNavigatorParamList[keyof RootNavigatorParamList],
) {
    if (navigationRef.isReady()) {
        // @ts-ignore
        navigationRef.navigate(name, params);
    }
}

export function replace(name: keyof RootNavigatorParamList, params?: RootNavigatorParamList[keyof RootNavigatorParamList]) {
    navigationRef.dispatch(StackActions.replace(name, params));
}

export function popToTop() {
    navigationRef.dispatch(StackActions.popToTop());
}

export function pop(position: number = 1) {
    navigationRef.dispatch(StackActions.pop(position));
}

export function goBack() {
    navigationRef.goBack();
}

export function resetStack(name: keyof RootNavigatorParamList, params = {}) {
    navigationRef.reset({
        index: 0,
        routes: [
            {
                name,
                params,
            },
        ],
    });
}

export function getCurrentRoute() {
    return navigationRef.getCurrentRoute()?.name;
}

export function pushToPage(name: string, params?: RootNavigatorParamList[keyof RootNavigatorParamList]): void {
    navigationRef.dispatch(StackActions.push(name, params));
}

export const handleOpenUrl = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
        await Linking.openURL(url);
    } else {
        // TODO: Handle when open url failed
    }
};
