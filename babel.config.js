module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./src'],
        alias: {
          src: './src',
        },
        extensions: ['.ts', '.tsx', '.js', 'jsx', '.ios.js', '.android.js'],
      },
    ],
  ],
};
