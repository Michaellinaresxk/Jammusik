import {Platform} from 'react-native';

const isDevelopment = __DEV__; // React Native's built-in development flag

export const API_BASE_URL = isDevelopment
  ? Platform.select({
      ios: process.env.IOS,
      android: process.env.ANDROID,
      default: process.env.DEFAULT,
    })
  : process.env.SERVER;
