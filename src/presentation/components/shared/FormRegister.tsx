import React from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import { PrimaryButton } from "./PrimaryButton";
import { globalColors } from "../../theme/Theme";
import { useNavigation } from "@react-navigation/native";

export const FormRegister = () => {
  const navigation = useNavigation();
  return (
    <View style={style.containerForm}>
      <Text style={style.labelTitle}>Register</Text>

      <View style={style.form}>
        <View>
          <Text style={style.labelText}>User name</Text>
          <TextInput style={style.inputLogin} />
          <Text style={style.labelText}>Password</Text>

          <TextInput style={style.inputLogin} />
        </View>
        <View style={{ marginTop: 50 }}>
          <PrimaryButton
            label="REGISTER"
            bgColor={globalColors.primary}
            onPress={() => Alert.alert("Registrado correctamente")}
            borderRadius={35}
            colorText="#0000"
          />
        </View>

        <View style={style.containerLink}>
          <Text> Already have an account? </Text>
          <Pressable onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={style.link}>Login</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  containerForm: {
    flex: 1,
    height: "auto",
    color: "white",
  },
  labelTitle: {
    fontSize: 44,
    textAlign: "center",
    marginBottom: 20,
    color: globalColors.light,
  },

  form: {
    width: "80%",
    padding: 10,
    alignSelf: "center",
  },

  labelText: {
    fontSize: 24,
    color: globalColors.light,
  },
  inputLogin: {
    borderWidth: 1,
    borderBottomColor: "white",
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
  },

  containerLink: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  link: {
    fontWeight: "bold",
    color: globalColors.primary,
  },
});
