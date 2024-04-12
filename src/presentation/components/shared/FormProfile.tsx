import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { globalColors } from "../../theme/Theme";
import { PrimaryButton } from "./PrimaryButton";

type ProfileForm = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  onProfile: () => Promise<void>;
};

export const FormProfile = ({
  email,
  setEmail,
  name,
  setName,
  userId,
  setUserId,
  location,
  setLocation,
  onProfile,
}: ProfileForm) => {
  return (
    <View style={style.containerForm}>
      <Text style={style.labelTitle}>General Information:</Text>

      <View style={style.form}>
        <View>
          <TextInput
            style={style.inputLogin}
            placeholderTextColor="#838282"
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={style.inputLogin}
            placeholderTextColor="#838282"
            keyboardType="email-address"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={style.inputLogin}
            placeholder="userId"
            value={userId}
            placeholderTextColor="#838282"
            onChangeText={setUserId}
          />
          <TextInput
            style={style.inputLogin}
            placeholder="Location"
            value={location}
            placeholderTextColor="#838282"
            onChangeText={setLocation}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <PrimaryButton
            label="Save Changes"
            bgColor={globalColors.primary}
            borderRadius={5}
            colorText={globalColors.secondary}
            btnFontSize={20}
            onPress={onProfile}
          />
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  containerForm: {
    height: "auto",
    color: "white",
  },
  labelTitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    color: globalColors.secondary,
  },

  form: {
    width: "90%",
    padding: 10,
    alignSelf: "center",
    marginTop: 20,
  },

  labelText: {
    fontSize: 24,
  },

  inputLogin: {
    borderWidth: 0.2,
    borderBottomColor: globalColors.terceary,
    color: globalColors.terceary,
    fontSize: 20,
    marginBottom: 30,
    padding: 10,
  },
});
