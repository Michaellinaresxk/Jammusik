import {Platform} from 'react-native';

const isDevelopment = __DEV__; // React Native's built-in development flag

export const API_BASE_URL = isDevelopment
  ? Platform.select({
      ios: 'http://192.168.1.10:3000/api',
      android: 'http://10.0.2.2:3000/api',
      default: 'http://localhost:3000/api',
    })
  : 'https://jammusik-server.vercel.app/api';
