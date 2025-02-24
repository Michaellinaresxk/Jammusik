import {Platform} from 'react-native';

const isDevelopment = __DEV__;

const DEV_URLS = {
  ios: process.env.IOS,
  android: process.env.ANDROID,
  default: process.env.DEFAULT,
};

const PROD_URL = process.env.SERVER;

export const API_BASE_URL = isDevelopment
  ? Platform.select({
      ios: DEV_URLS.ios,
      android: DEV_URLS.android,
      default: DEV_URLS.default,
    })
  : PROD_URL;
