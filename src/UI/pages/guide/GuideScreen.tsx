import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GoBackButton } from "../../components/shared/GoBackButton";
import { globalColors } from "../../theme/Theme";

export const GuideScreen = () => {
  const { top } = useSafeAreaInsets();

  return (
    <>
      <GoBackButton />
      <View style={{ marginTop: top }}>
        <Text style={styles.subTitle}>User Guide:</Text>
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
