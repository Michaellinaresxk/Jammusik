import React from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { PrimaryButton } from "./PrimaryButton";
import { globalColors } from "../../theme/Theme";
import { useNavigation } from "@react-navigation/native";

export const Formlogin = () => {
  const navigation = useNavigation();
  return (
    <View style={style.containerForm}>
      <Text style={style.labelTitle}>Login</Text>

      <View style={style.form}>
        <View>
          <Text style={style.labelText}>User name</Text>
          <TextInput style={style.inputLogin} />
          <Text style={style.labelText}>Password</Text>

          <TextInput style={style.inputLogin} />
        </View>
        <View style={{ marginTop: 50 }}>
          <PrimaryButton
            label="SIGN IN"
            bgColor={globalColors.primary}
            borderRadius={35}
            colorText="#0000"
            onPress={() => Alert.alert("Registrado correctamente")}
          />
        </View>

        <View style={style.containerLink}>
          <Text>Not a member yet? </Text>
          <Pressable onPress={() => navigation.navigate("RegisterScreen")}>
            <Text style={style.link}>REGISTER</Text>
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
  link: {
    fontWeight: "bold",
    color: globalColors.primary,
  },
  containerLink: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
});
