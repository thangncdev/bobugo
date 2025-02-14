module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/assets/fonts'],
  dependencies: {
    ...(true ? { 'react-native-flipper': { platforms: { ios: null } } } : {}),
  },
};
