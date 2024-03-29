import { View, ImageBackground, StyleSheet, FlatList } from "react-native";
import { globalStyles } from "../theme/Theme";
import { images } from "../../assets/img/Images";
import { CategoryCard } from "../components/shared/CategoryCard";

const backgroundImage = { uri: images.image3 };
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
    title: "Musica Latina",
  },
];

export const CategoriesScreen = () => {
  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={styles.image}>
      <View style={globalStyles.overlay}>
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <View style={styles.categoryCardContainer}>
              <CategoryCard title={item.title} />
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryCardContainer: {
    justifyContent: "center",
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  image: {
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
