import { Text, View, TextInput, ActivityIndicator, Button } from "react-native";
import { PrimaryButton } from "../PrimaryButton";
import { globalColors, globalFormStyles } from "../../../theme/Theme";
import React from "react";
import * as Yup from 'yup'
import { Formik } from 'formik'


const validationSchemaFormLogin = Yup.object().shape({
  email:
    Yup.string()
      .email('The email is not valid')
      .required("The email is required")
  ,

  password:
    Yup.string().required('The password is required')
      .min(4, 'Password have it more than 4 words')


})


interface FormLoginProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onLogin: () => Promise<void>;
  isLoading: boolean
}

export const Formlogin = ({
  email,
  setEmail,
  password,
  setPassword,
  onLogin, isLoading
}: FormLoginProps) => {





  return (
    <View style={globalFormStyles.containerForm}>
      <Text style={globalFormStyles.labelTitle}>Login</Text>




      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => onLogin(values)}
        validationSchema={validationSchemaFormLogin}

      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
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
                onChangeText={handleChange('email')}
              />
              {errors.email && touched.email ?
                (
                  <Text style={{ color: 'red' }}>{errors.email}</Text>
                ) : null}


              <TextInput
                style={globalFormStyles.inputLogin}
                placeholder="Password"
                autoCorrect={false}
                autoCapitalize="none"
                value={values.password}
                secureTextEntry={true}
                placeholderTextColor="#838282"
                onChangeText={handleChange('password')}

              />

              {errors.password && touched.password ?
                (
                  <Text style={{ color: 'red' }}>{errors.password}</Text>
                ) : null}
            </View>
            <View style={{ marginTop: 20 }}>
              <PrimaryButton
                label={!isLoading ? "SIGN IN" : <ActivityIndicator size={'large'} />}
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
