import React from "react";
import {
  ImageBackground,
  Text,
  View,
  TextInput,
  Alert,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  RefreshControl,
} from "react-native";
import { globalColors, globalStyles } from "../../theme/Theme";
import { images } from "../../../assets/img/Images";
import { BrandLogo } from "../../components/shared/BrandLogo";
import { PrimaryButton } from "../../components/shared/PrimaryButton";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamsList } from "../../routes/StackNavigator";
import { usePullRefresh } from "../../../hooks/usePullRefresing";

export const FeedbackScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();

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
            <Pressable
              style={styles.goBackContent}
              onPress={() => navigation.navigate("HomeScreen")}>
              <Icon
                name="chevron-back-sharp"
                color={globalColors.primary}
                size={25}
              />

              <Text style={styles.goBackLabel}>Back</Text>
            </Pressable>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <BrandLogo />

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
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  goBackContent: {
    fontSize: 15,
    fontWeight: "bold",
    margin: "auto",
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  goBackLabel: {
    fontSize: 20,
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
