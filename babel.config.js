module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // Ensure this line is added at the end of the plugin array
  ],
};
