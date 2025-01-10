import {Platform} from 'react-native';

export const API_BASE_URL = Platform.select({
  ios: 'http://192.168.1.10:3000/api', // or your machine's IP address
  android: 'http://10.0.2.2:3000/api',
  default: 'http://localhost:3000/api',
});
