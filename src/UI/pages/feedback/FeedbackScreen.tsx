import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  RefreshControl,
} from "react-native";
import { globalColors, globalStyles } from "../../theme/Theme";
import { images } from "../../../assets/img/Images";
import { BrandLogo } from "../../components/shared/BrandLogo";
import { PrimaryButton } from "../../components/shared/PrimaryButton";
import { usePullRefresh } from "../../../hooks/usePullRefresing";
import { GoBackButton } from "../../components/shared/GoBackButton";
import { useEmailResend } from "../../../hooks/useEmailResend";

export const FeedbackScreen = () => {
  const [text, setText] = useState<string>("");
  const { sendEmail } = useEmailResend();

  const image = {
    uri: images.loginBackground,
  };

  const { isRefreshing, refresh, top } = usePullRefresh();

  return (
    <ImageBackground
      source={image}
      style={globalStyles.container}
      resizeMode="cover"
      alt="Imagen de fondo">
      <View style={globalStyles.overlay}>
        <GoBackButton />
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
              <View style={styles.logoContainer}>
                <BrandLogo />
              </View>

              <View style={styles.container}>
                <Text style={styles.subTitle}>We Value Your Feedback!</Text>
                <Text style={styles.text}>
                  We're always striving to improve and provide the best
                  experience possible. Your insigths and suggestions are
                  invaluable to us.
                </Text>

                <TextInput
                  multiline={true}
                  style={{
                    height: 150,
                    width: "100%",
                    padding: 20,
                    marginTop: 10,
                    textAlignVertical: "top",
                    backgroundColor: "white",
                    color: "black",
                  }}
                  placeholderTextColor="black"
                  placeholder="Place your feedback here..."
                  onChangeText={setText}
                  value={text}
                />
                <PrimaryButton
                  label="SEND FEEDBACK"
                  bgColor="#18998B"
                  borderRadius={5}
                  onPress={() => sendEmail(text, setText)}
                  btnFontSize={20}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  logoContainer: {
    marginTop: 100,
  },
  goBackContent: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  goBackLabel: {
    fontSize: 15,
    color: globalColors.terceary,
  },
  text: {
    color: globalColors.light,
    fontSize: 18,
    lineHeight: 30,
    fontWeight: "300",
  },
  subTitle: {
    fontSize: 25,
    color: globalColors.light,
  },
  container: {
    marginTop: 50,
    flexDirection: "column",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
