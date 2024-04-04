import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamsList } from "../../routes/StackNavigator";
import { Text, View } from "react-native";

export const CategoryScreen = () => {
  const params =
    useRoute<RouteProp<RootStackParamsList, "CategoryScreen">>().params;

  return (
    <View>
      <Text>
        {" "}
        {params.title} - {params.id}{" "}
      </Text>
    </View>
  );
};
