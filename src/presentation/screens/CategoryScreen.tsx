import React from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamsList } from "../routes/StackNavigator";
import { Text, View } from "react-native";

export const CategoryScreen = () => {
  const params =
    useRoute<RouteProp<RootStackParamsList, "CategoryScreen">>().params;
  const navigation = useNavigation();

  return (
    <View>
      <Text> {params.title} </Text>
    </View>
  );
};
