import { View, ImageBackground, StyleSheet, FlatList } from "react-native";
import { globalStyles } from "../../theme/Theme";
import { images } from "../../../assets/img/Images";
import { CategoryCard } from "../../components/shared/cards/CategoryCard";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { type RootStackParamsList } from "../../routes/StackNavigator";
import { useCategoryService } from "../../../context/CategoryServiceContext";
import { useEffect, useState } from "react";
import { CategoryView } from "../../../views/CategoryView";
import { HamburgerMenu } from "../../components/shared/HamburgerMenu";
const backgroundImage = { uri: images.image3 };

export const CategoriesScreen = () => {
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

  return (
    <>
      <HamburgerMenu />
      <ImageBackground source={backgroundImage} resizeMode="cover">
        <View style={globalStyles.overlay}>
          <View style={{ marginTop: 50 }}>
            <FlatList
              data={categories}
              keyExtractor={item => item.id}
              numColumns={2}
              renderItem={({ item }) => (
                <View style={styles.categoryCardContainer}>
                  <CategoryCard
                    title={item.title}
                    onPress={() =>
                      navigation.navigate("CategorySelectedScreen", {
                        id: item.id,
                        title: item.title,
                      })
                    }
                  />
                </View>
              )}
            />
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryCardContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
});
