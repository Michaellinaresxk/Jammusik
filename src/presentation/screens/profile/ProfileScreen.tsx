import React from "react";
import { Text, View } from "react-native";
import { useUserService } from "../../../context/UserServiceContext";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { ApiUser } from "../../../infra/user/ApiUser";
export const ProfileScreen = () => {
  const userService = useUserService();
  const [user, setUser] = useState<ApiUser | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (user) {
        const userData = await userService.getCurrentUser(user.uid);
        setUser(userData);
      } else {
        console.log("No user logged in");
        setUser(null); // Ensure state is set to null if no user is found
      }
    };

    fetchUser();
  }, [auth.currentUser, userService]);

  return (
    <View>
      <Text>{user ? `Logged in as ${user.name}` : "Not logged in"}</Text>
    </View>
  );
};
