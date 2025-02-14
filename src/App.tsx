import { RootSiblingParent } from 'react-native-root-siblings';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import SettingProvider from 'contexts/SettingProvider';
import i18n from 'i18n';
import StackNavigator from 'modules/navigation/views/Navigation';
import { persistor, store } from 'redux/store';

// @ts-ignore
const initI18n = i18n;

const App = () => {
    return (
        <SettingProvider>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <RootSiblingParent>
                        <StackNavigator />
                    </RootSiblingParent>
                </PersistGate>
            </Provider>
        </SettingProvider>
    );
}

export default App;
