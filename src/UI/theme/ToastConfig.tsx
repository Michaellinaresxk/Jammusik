// App.jsx
import {JSX} from 'react';
import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
  InfoToast,
} from 'react-native-toast-message';
import {globalColors} from './Theme';

/*
  1. Create the config
*/
export const ToastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: globalColors.primary, height: 100}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 19,
        fontWeight: '400',
      }}
      text2Style={{
        fontSize: 18,
      }}
    />
  ),

  info: (props: any) => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: globalColors.danger, height: 100}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),

  error: (props: any) => (
    <InfoToast
      {...props}
      style={{borderLeftColor: globalColors.info, height: 100}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
};
