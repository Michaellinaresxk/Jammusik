import {Platform} from 'react-native';

const isDevelopment = __DEV__;

// URLs de desarrollo específicas para cada plataforma
const DEV_URLS = {
  ios: process.env.IOS,
  android: process.env.ANDROID,
  default: process.env.DEFAULT,
};

// URL de producción
const PROD_URL = process.env.SERVER;

export const API_BASE_URL = isDevelopment
  ? Platform.select({
      ios: DEV_URLS.ios,
      android: DEV_URLS.android,
      default: DEV_URLS.default,
    })
  : PROD_URL;

// Log para debugging
console.log('Current API_BASE_URL:', API_BASE_URL);
console.log('Platform:', Platform.OS);
console.log('isDevelopment:', isDevelopment);
