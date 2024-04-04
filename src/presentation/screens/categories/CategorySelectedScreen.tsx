import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamsList } from "../../routes/StackNavigator";
import { Text, View } from "react-native";
import { GlobalHeader } from "../../components/shared/GlobalHeader";

export const CategorySelectedScreen = () => {
  const params =
    useRoute<RouteProp<RootStackParamsList, "CategorySelectedScreen">>().params;

  return (
    <View>
      <GlobalHeader headerTitle={params.title} />
      <Text>
        {" "}
        {params.title} - {params.id}{" "}
      </Text>
    </View>
  );
};
