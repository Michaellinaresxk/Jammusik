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
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { ApiUser } from "../../../infra/user/ApiUser";
import { globalColors } from "../../theme/Theme";
import { FormProfile } from "../../components/shared/forms/FormProfile";
import { UserAvatar } from "../../components/shared/UserAvatar";

export const ProfileScreen = () => {
  const userService = useUserService();
  const [user, setUser] = useState<ApiUser | null>(null);
  const auth = getAuth();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [location, setLocation] = useState("");

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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView>
        <View>
          <UserAvatar userName={user?.name} />
          <FormProfile
            email={user?.email}
            setEmail={setEmail}
            name={user?.name}
            setName={setName}
            userId={user?.id}
            setUserId={setUserId}
            location={location}
            setLocation={setLocation}
            onProfile={() => console.log("user created")}
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
