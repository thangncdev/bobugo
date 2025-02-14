/**
 * @format
 */

import messaging from '@react-native-firebase/messaging';
import { AppRegistry, LogBox, Text, TextInput, TouchableOpacity } from 'react-native';

import { name as appName } from './app.json';
import App from './src/App';

Text.defaultProps = {};
Text.defaultProps.maxFontSizeMultiplier = 1.0;
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
TouchableOpacity.defaultProps = TouchableOpacity.defaultProps || {};
TouchableOpacity.defaultProps.activeOpacity = 0.7;
TouchableOpacity.defaultProps.hitSlop = { top: 4, left: 4, right: 4, bottom: 4 };

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

messaging().setBackgroundMessageHandler(async remoteMessage => { });

AppRegistry.registerComponent(appName, () => App);
