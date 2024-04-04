import React from "react";
import { View, Text } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamsList } from "../../routes/StackNavigator";

export const PlaylistSelectedScreen = () => {
  const params =
    useRoute<RouteProp<RootStackParamsList, "CategoryScreen">>().params;

  return (
    <View>
      <Text>
        Playlist Selected: {params.title} - {params.id}{" "}
      </Text>
    </View>
  );
};
