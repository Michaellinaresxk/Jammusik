import { FlatList, StyleSheet, Text, View } from "react-native";
import { CategoryCard } from "../../components/shared/cards/CategoryCard";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { type RootStackParamsList } from "../../routes/StackNavigator";
import { GlobalHeader } from "../../components/shared/GlobalHeader";
import { TheGreenBorder } from "../../components/shared/TheGreenBorder";
import { globalColors } from "../../theme/Theme";
import { PrimaryButton } from "../../components/shared/PrimaryButton";
import { useUserService } from "../../../context/UserServiceContext";

const categories = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Rock",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Jazz",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Latin",
  },
  {
    id: "58694a0f-3da1-471f-bd96-1fsfdsfdsfsd2",
    title: "Balads",
  },
];
export const HomeScreen = () => {
  const userService = useUserService();
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();

  const logoutUser = async () => {
    try {
      console.log("logout");
      await userService.logout();
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <GlobalHeader headerTitle="Home" />
        <TheGreenBorder />
        <View style={styles.categoryCardContainer}>
          <PrimaryButton
            label="Logout"
            bgColor={globalColors.danger}
            onPress={() => logoutUser()}
          />
          <Text style={styles.subTitle}>Categories:</Text>
          <FlatList
            data={categories}
            keyExtractor={item => item.id}
            horizontal={true}
            renderItem={({ item }) => (
              <CategoryCard
                title={item.title}
                onPress={() =>
                  navigation.navigate("CategorySelectedScreen", {
                    id: item.id,
                    title: item.title,
                  })
                }
              />
            )}
          />
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: "red",
    fontSize: 30,
  },
  subTitle: {
    marginBottom: 5,
  },
  categoryCardContainer: {
    padding: 30,
  },
});
