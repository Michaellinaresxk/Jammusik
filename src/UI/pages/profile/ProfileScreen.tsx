import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Pressable,
  RefreshControl,
  ImageBackground,
} from "react-native";
import { useUserService } from "../../../context/UserServiceContext";
import { getAuth } from "firebase/auth";
import { ApiUser } from "../../../infra/user/ApiUser";
import { globalColors, globalStyles } from "../../theme/Theme";
import { FormProfile } from "../../components/shared/forms/FormProfile";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamsList } from "../../routes/StackNavigator";
import Icon from "react-native-vector-icons/Ionicons";
import { usePullRefresh } from "../../../hooks/usePullRefresing";
import { UserAvatar } from "../../components/shared/UserAvatar";
import { images } from "../../../assets/img/Images";

export const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();

  const image = {
    uri: images.loginBackground,
  };

  const userService = useUserService();

  const [user, setUser] = useState<ApiUser | null>(null);
  const auth = getAuth();

  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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

  const { isRefreshing, refresh, top } = usePullRefresh(fetchUser);

  return (
    <ImageBackground source={image} resizeMode="cover" alt="Imagen de fondo">
      <View style={globalStyles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}>
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
              <Pressable
                style={styles.goBackContent}
                onPress={() => navigation.goBack()}>
                <Icon
                  name="arrow-back-sharp"
                  color={globalColors.primary}
                  size={30}
                />
              </Pressable>
              <UserAvatar />
              <FormProfile
                email={user?.email || ""}
                setEmail={setEmail}
                name={user?.name || ""}
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

const styles = StyleSheet.create({
  userIconContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 30,
    marginBottom: 30,
  },
  userName: {
    color: globalColors.terceary,
    fontSize: 20,
  },
  brandLogo: {
    position: "absolute",
    bottom: 0,
  },
  goBackContent: {
    marginLeft: 20,
    marginTop: 70,
    flexDirection: "row",
    alignItems: "center",
  },
  goBackLabel: {
    fontSize: 15,
    color: globalColors.terceary,
  },
});
