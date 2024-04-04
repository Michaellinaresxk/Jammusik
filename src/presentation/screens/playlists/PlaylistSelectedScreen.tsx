import React from "react";
import { View, Text } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamsList } from "../../routes/StackNavigator";
import { GlobalHeader } from "../../components/shared/GlobalHeader";

export const PlaylistSelectedScreen = () => {
  const params =
    useRoute<RouteProp<RootStackParamsList, "PlaylistScreen">>().params;

  return (
    <View>
      <GlobalHeader headerTitle={params.title} />
      <Text>Playlist Selected id: - {params.id}</Text>
    </View>
  );
};
