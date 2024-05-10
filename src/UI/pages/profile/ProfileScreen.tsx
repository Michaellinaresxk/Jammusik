import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useUserService } from "../../../context/UserServiceContext";
import { useUserInfoService } from "../../../context/UserInfoServiceContext";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { ApiUser } from "../../../infra/user/ApiUser";
import { globalColors } from "../../theme/Theme";
import { PrimaryIcon } from "../../components/shared/PrimaryIcon";
import { FormProfile } from "../../components/shared/forms/FormProfile";
import { UserInfo } from "../../../types/formTypes";

export const ProfileScreen = () => {
  const userService = useUserService();
  const userInfoService = useUserInfoService();

  const [user, setUser] = useState<ApiUser | null>(null);
  const auth = getAuth();

  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedInstrumentId, setSelectedInstrumentId] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (user) {
        const userData = await userService.getCurrentUser(user.uid);
        setUser(userData);
      } else {
        console.log("No user logged in");
        setUser(null);
      }
    };

    fetchUser();
  }, [auth.currentUser, userService]);

  useEffect(() => {
    console.log("Selected Instrument ID:", selectedInstrumentId);
  }, [selectedInstrumentId]);

  const updateUserInfoProfile = async (userInfo: UserInfo) => {
    const { location, skills, instrument } = userInfo;

    try {
      await userInfoService.setCurrentUserInfo(
        userId,
        location as string,
        skills as string,
        instrument as string,
      );

      console.log(location, skills);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView>
        <View>
          <View style={styles.userIconContent}>
            <PrimaryIcon
              name="person-circle-outline"
              color={globalColors.primary}
            />
            <Text style={styles.userName}> {user?.name}</Text>
          </View>
          <FormProfile
            email={user?.email}
            setEmail={setEmail}
            name={user?.name}
            setName={setName}
            userId={user?.id}
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
  );
};

const styles = StyleSheet.create({
  userIconContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 50,
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
});
