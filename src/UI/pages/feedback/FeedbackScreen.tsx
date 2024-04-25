import React from "react";
import { ImageBackground, Text, View, TextInput, Alert } from "react-native";
import { globalColors, globalStyles } from "../../theme/Theme";
import { images } from "../../../assets/img/Images";
import { BrandLogo } from "../../components/shared/BrandLogo";
import { PrimaryButton } from "../../components/shared/PrimaryButton";
export const FeedbackScreen = () => {
  const image = {
    uri: images.loginBackground,
  };

  return (
    <ImageBackground
      source={image}
      style={globalStyles.container}
      resizeMode="cover"
      alt="Imagen de fondo">
      <View style={globalStyles.overlay}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <BrandLogo />

          <View
            style={{
              flex: 2,
              display: "flex",
              flexDirection: "column",
              gap: 20,
              justifyContent: "center",
              alignItems: "center",
              
            }}>
            <Text style={globalStyles.title}>We Value Your Feedback!</Text>
            <Text style={globalColors.primaryAlt}>
              We're always striving to improve and provide the best experience
              possible. Your insigths and suggestions are invaluable to us.
            </Text>
            <Text style={globalColors.primaryAlt}>
              To submit your feedback, simply click on the 'Send feedback'
              button. Whether it's a feature request,a bug report, or general
              feedback, we're excited to hear from you.
            </Text>
            <Text style={globalColors.primaryAlt}>
              Thank you for being a part of our community!"
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
              placeholder="Place your feedback here"
            />
            <PrimaryButton
              label="SEND FEEDBACK"
              bgColor="#18998B"
              borderRadius={5}
              onPress={() => Alert.alert("Sending feedback")}
              btnFontSize={20}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
