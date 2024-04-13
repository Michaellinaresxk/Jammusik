import { FlatList, StyleSheet, Text, View } from "react-native";
import { CategoryCard } from "../../components/shared/cards/CategoryCard";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { type RootStackParamsList } from "../../routes/StackNavigator";
import { GlobalHeader } from "../../components/shared/GlobalHeader";
import { TheGreenBorder } from "../../components/shared/TheGreenBorder";
import { globalColors } from "../../theme/Theme";
import { PrimaryButton } from "../../components/shared/PrimaryButton";
import { useUserService } from "../../../context/UserServiceContext";
import { useCategoryService } from "../../../context/CategoryServiceContext";
import { useEffect, useState } from "react";
import { CategoryView } from "../../../views/CategoryView";
import { LinkLoginRegister } from "../../components/shared/LinkLoginRegister";

export const HomeScreen = () => {
  const userService = useUserService();
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
  const categoryService = useCategoryService();
  const [categories, setCategories] = useState<CategoryView[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const fetchedCategories = await categoryService.getCategories();
      setCategories(fetchedCategories);
    };

    loadCategories();
  }, [categoryService]);

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
          <LinkLoginRegister
            text="Have an account?"
            link="Profile"
            goTo="ProfileScreen"
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
