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
  ActivityIndicator,
  Animated,
} from "react-native";
import { globalColors, globalStyles } from "../../theme/Theme";
import { images } from "../../../assets/img/Images";
import { BrandLogo } from "../../components/shared/BrandLogo";
import { PrimaryButton } from "../../components/shared/PrimaryButton";
import { usePullRefresh } from "../../../hooks/usePullRefresing";
import { GoBackButton } from "../../components/shared/GoBackButton";
import { useEmailResend } from "../../../hooks/useEmailResend";
import useAnimationKeyboard from "../../../hooks/useAnimationKeyboard";
import { KeyboardGestureArea } from "react-native-keyboard-controller";

export const FeedbackScreen = () => {
  const [text, setText] = useState<string>("");
  const { sendEmail, isLoading } = useEmailResend();
  const { height, scale } = useAnimationKeyboard()



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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={
          globalStyles.overlay

        }>
          <KeyboardGestureArea interpolator="ios" >
            <ScrollView showsVerticalScrollIndicator={false} horizontal={false}
            >
              <Animated.View
                style={{
                  flex: 1,
                  transform: [{ translateY: height }, { scale }],
                }}>


                <GoBackButton />




                <ScrollView showsVerticalScrollIndicator={false} horizontal={false}
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


                  <View style={styles.logoContainer}>
                    <BrandLogo />
                  </View>


                  <View
                    style={
                      styles.container


                    }>

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
                      label={
                        isLoading
                          ? <ActivityIndicator size='small' color={globalColors.primaryDark} />
                          : "SEND FEEDBACK"}
                      bgColor="#18998B"
                      borderRadius={5}
                      onPress={() => sendEmail(text, setText)}
                      btnFontSize={20}
                    />
                  </View>



                </ScrollView>


              </Animated.View>
            </ScrollView>
          </KeyboardGestureArea>
        </View>
      </KeyboardAvoidingView>

    </ImageBackground >

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
  },
  subTitle: {
    fontSize: 25,
    color: globalColors.light,
  },
  container: {
    flex: 1,
    marginTop: 50,
    flexDirection: "column",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
