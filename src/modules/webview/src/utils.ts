import { navigate } from 'modules/navigation/src/utils';

export const goToWebView = (title: string, uri: string) => navigate('Webview', { title, uri });
