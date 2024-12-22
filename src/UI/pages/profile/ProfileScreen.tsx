import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  RefreshControl,
  ImageBackground,
} from 'react-native';
import {useUserService} from '../../../context/UserServiceContext';
import {getAuth} from 'firebase/auth';
import {ApiUser} from '../../../infra/user/ApiUser';
import {globalColors, globalStyles} from '../../theme/Theme';
import {FormProfile} from '../../components/shared/forms/FormProfile';
import {usePullRefresh} from '../../../hooks/usePullRefresing';
import {UserAvatar} from '../../components/shared/UserAvatar';
import {images} from '../../../assets/img/Images';

export const ProfileScreen = () => {
  const image = {
    uri: images.loginBackground,
  };

  const userService = useUserService();

  const [user, setUser] = useState<ApiUser | null>(null);
  const auth = getAuth();

  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [triggerUpdate, setTriggerUpdate] = useState(false);

  const fetchUser = useCallback(async () => {
    const user = auth.currentUser;
    if (user) {
      const userData = await userService.getCurrentUser(user.uid);
      setUser(userData);
      setUserId(user.uid);
    } else {
      setUser(null);
    }
  }, [auth.currentUser, userService]);

  useEffect(() => {
    // Load user information when the component mounts
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    // Load user information when triggerUpdate changes
    if (triggerUpdate) {
      fetchUser();
      setTriggerUpdate(false);
    }
  }, [triggerUpdate, fetchUser]);

  const {isRefreshing, refresh, top} = usePullRefresh(fetchUser);

  return (
    <ImageBackground source={image} resizeMode="cover" alt="Imagen de fondo">
      <View style={globalStyles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                progressViewOffset={top}
                colors={[
                  globalColors.primary,
                  globalColors.terceary,
                  globalColors.primary,
                ]}
                onRefresh={refresh}
              />
            }>
            <View>
              <UserAvatar />
              <FormProfile
                email={user?.email || ''}
                setEmail={setEmail}
                name={user?.name || ''}
                setName={setName}
                userId={userId}
                setUserId={setUserId}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
};
