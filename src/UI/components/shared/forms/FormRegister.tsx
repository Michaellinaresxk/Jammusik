import React from "react";
import { View, TextInput, ActivityIndicator, Text } from "react-native";
import { PrimaryButton } from "../PrimaryButton";
import { globalColors, globalFormStyles } from "../../../theme/Theme";
import { type Register } from "../../../../types/formTypes";
import { Formik } from "formik";
import { validationRegisterForm } from "./yup/validation_register_yup";

interface FormRegisterProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  onRegister: () => Promise<Register>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>
}

export const FormRegister = ({
  email,
  setEmail,
  userName,
  setUserName,
  password,
  setPassword,
  onRegister,
  isLoading, error, setError

}: FormRegisterProps) => {
  return (
    <View style={globalFormStyles.containerForm}>
      <Formik
        initialValues={{ email: "", userName: "", password: "" }}
        onSubmit={values => onRegister(values)}
        validationSchema={validationRegisterForm}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={globalFormStyles.form}>
            <View>
              <TextInput
                style={globalFormStyles.inputLogin}
                placeholderTextColor="#838282"
                keyboardType="email-address"
                placeholder="Email"
                value={values.email}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={handleChange("email")}
                onFocus={() => setError('')}
              />
              {errors.email && touched.email ? (
                <Text style={{ color: "red" }}>{errors.email}</Text>
              ) : null}
              <TextInput
                style={globalFormStyles.inputLogin}
                placeholderTextColor="#838282"
                placeholder="Username"
                value={values.userName}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={handleChange("userName")}
              />
              {errors.userName && touched.userName ? (
                <Text style={{ color: "red" }}>{errors.userName}</Text>
              ) : null}

              <TextInput
                style={globalFormStyles.inputLogin}
                placeholder="Password"
                autoCorrect={false}
                autoCapitalize="none"
                value={values.password}
                secureTextEntry={true}
                placeholderTextColor="#838282"
                onChangeText={handleChange("password")}
              />

              {errors.password && touched.password ? (
                <Text style={{ color: "red" }}>{errors.password}</Text>
              ) : null}
            </View>
            {error ? <View style={{ marginTop: 10, padding: 10, backgroundColor: globalColors.danger }}>
              <Text style={{ color: globalColors.light, textAlign: 'center' }}>{error}</Text>
            </View> : null}
            <View style={{ marginTop: 20 }}>
              <PrimaryButton
                label={
                  !isLoading ? "SIGN IN" : <ActivityIndicator size={"large"} />
                }
                bgColor={globalColors.primary}
                borderRadius={5}
                colorText={globalColors.secondary}
                btnFontSize={20}
                onPress={handleSubmit}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};
