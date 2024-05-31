import React from "react";
import useAuthStatus from "../../../hooks/useAuthStatus";
import Icon from "react-native-vector-icons/Ionicons";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GoBackButton } from "../../components/shared/GoBackButton";
import { globalColors } from "../../theme/Theme";
import { PrimaryButton } from "../../components/shared/PrimaryButton";
import { userService } from "../../../services/userService";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamsList } from "../../routes/StackNavigator";
import { BrandLogo } from "../../components/shared/BrandLogo";

export const DeleteAccountScreen = () => {
  const { top } = useSafeAreaInsets();
  const { uid } = useAuthStatus();
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();

  const deleteAccount = async () => {
    try {
      const userId = uid;
      await userService.deleteUser(userId);
      navigation.navigate("PathPickScreen");
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  };

  const deleteAccountConfirmation = () =>
    Alert.alert("Are you sure?", "Do you want to remove your account?", [
      {
        text: "UPS! BY MISTAKE",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "YES, DELETE ACCOUNT",
        onPress: () => deleteAccount(),
        style: "destructive",
      },
    ]);
  return (
    <>
      <GoBackButton />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          marginTop: top,
        }}>
        <Text style={styles.subTitle}>Before Delete:</Text>
        <View>
          <Text style={styles.text}>
            By pressing the "Delete Account" button, a confirmation button will
            appear. After you press the confirmation button, the deletion of
            your account will proceed.
          </Text>
          <Text style={styles.text}>
            Please be aware that this action is irreversible and will result in
            the permanent loss of all associated data.
          </Text>
        </View>
        <View style={styles.dangerZoneContent}>
          <View style={styles.dangerIconContent}>
            <Icon
              name="alert-circle-sharp"
              color={globalColors.danger}
              size={25}
            />
            <Text style={styles.dangerZoneText}>Danger zone!</Text>
          </View>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteAccountConfirmation()}>
            <Text style={styles.deleteButtonTitle}>Delete Account</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 100 }}>
          <BrandLogo />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  subTitle: {
    marginBottom: 10,
    marginTop: 50,
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "900",
    color: globalColors.primaryDark,
  },
  text: {
    color: globalColors.primaryDark,
    fontSize: 18,
    lineHeight: 30,
    marginTop: 20,
  },
  dangerZoneContent: {
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 50,
    width: "90%",
    padding: 20,
    alignSelf: "center",
  },
  dangerIconContent: {
    flexDirection: "row",
  },
  dangerZoneText: {
    color: globalColors.danger,
    fontWeight: "400",
    fontSize: 20,
    marginBottom: 20,
    marginLeft: 10,
  },
  deleteButton: {
    alignSelf: "center",
    backgroundColor: globalColors.dangerAlt2,
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 30,
    marginBottom: 30,
  },
  deleteButtonTitle: {
    alignSelf: "center",
    color: globalColors.danger,
    fontSize: 17,
  },
});
