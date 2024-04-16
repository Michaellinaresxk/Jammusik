import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamsList } from "../../routes/StackNavigator";
import { View } from "react-native";
import { GlobalHeader } from "../../components/shared/GlobalHeader";
import { TheGreenBorder } from "../../components/shared/TheGreenBorder";

export const CategorySelectedScreen = () => {
  const params =
    useRoute<RouteProp<RootStackParamsList, "CategorySelectedScreen">>().params;

  return (
    <>
      <TheGreenBorder />
      <View>
        <GlobalHeader headerTitle={params.title} />
      </View>
    </>
  );
};
