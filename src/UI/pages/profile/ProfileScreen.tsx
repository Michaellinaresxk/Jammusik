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
  Text,
} from "react-native";
import { useUserService } from "../../../context/UserServiceContext";
import { useUserInfoService } from "../../../context/UserInfoServiceContext";
import { getAuth } from "firebase/auth";
import { ApiUser } from "../../../infra/user/ApiUser";
import { globalColors, globalStyles } from "../../theme/Theme";
import { FormProfile } from "../../components/shared/forms/FormProfile";
import { UserInfo } from "../../../types/formTypes";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamsList } from "../../routes/StackNavigator";
import Icon from "react-native-vector-icons/Ionicons";
import { usePullRefresh } from "../../../hooks/usePullRefresing";
import { UserAvatar } from "../../components/shared/UserAvatar";
import Toast from "react-native-toast-message";
import { images } from "../../../assets/img/Images";

export const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();

  const image = {
    uri: images.loginBackground,
  };

  const userService = useUserService();
  const userInfoService = useUserInfoService();

  const [user, setUser] = useState<ApiUser | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const auth = getAuth();

  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedInstrumentId, setSelectedInstrumentId] = useState("");
  const [triggerUpdate, setTriggerUpdate] = useState(false);

  const fetchUser = useCallback(async () => {
    const user = auth.currentUser;
    if (user) {
      const userData = await userService.getCurrentUser(user.uid);
      setUser(userData);
      setUserId(user.uid);
      const userInfoData = await userInfoService.getCurrentUserInfo(user.uid);
      if (userInfoData) {
        setUserInfo(userInfoData);
        setLocation(userInfoData.location || "");
        setSelectedSkill(userInfoData.skills || "");
        setSelectedInstrumentId(userInfoData.instrument || "");
      }
    } else {
      console.log("No user logged in");
      setUser(null);
    }
  }, [auth.currentUser, userService, userInfoService]);

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

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Updated info successfully!",
    });
  };

  const updateUserInfoProfile = async (userInfo: UserInfo) => {
    const { location, skills, instrument } = userInfo;

    if (location && skills && instrument) {
      // Check to avoid undefined values
      try {
        await userInfoService.setCurrentUserInfo(
          userId,
          location as string,
          skills as string,
          instrument as string,
        );

        console.log(location, skills, instrument);
        showToast();
        setTriggerUpdate(true); // Trigger update after saving info
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    } else {
      console.error("All fields must be filled out.");
    }
  };

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
              <Text>Location: {location}</Text>
              <Text>Skills: {selectedSkill}</Text>
              <Text>Instrument: {selectedInstrumentId}</Text>
              <FormProfile
                email={user?.email || ""}
                setEmail={setEmail}
                name={user?.name || ""}
                setName={setName}
                userId={userId} // Pasa el userId correcto aquí
                setUserId={setUserId}
                location={location}
                setLocation={setLocation}
                selectedSkill={selectedSkill}
                setSelectedSkill={setSelectedSkill}
                selectedInstrumentId={selectedInstrumentId}
                setSelectedInstrumentId={setSelectedInstrumentId}
                onProfile={() =>
                  updateUserInfoProfile({
                    userId,
                    location,
                    skills: selectedSkill,
                    instrument: selectedInstrumentId,
                  })
                }
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
