import { View, ImageBackground, StyleSheet, FlatList } from "react-native";
import { globalStyles } from "../theme/Theme";
import { images } from "../../assets/img/Images";
import { CategoryCard } from "../components/shared/CategoryCard";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { type RootStackParamsList } from "../routes/StackNavigator";

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
    title: "Latin",
  },
  {
    id: "58694a0f-3da1-471f-bd96-1fsfdsfdsfsd2",
    title: "Balads",
  },
];

export const CategoriesScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
  return (
    <ImageBackground source={backgroundImage} resizeMode="cover">
      <View style={globalStyles.overlay}>
        <View style={{ marginTop: 50 }}>
          <FlatList
            data={categories}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.categoryCardContainer}>
                <CategoryCard
                  title={item.title}
                  onPress={() =>
                    navigation.navigate("CategoryScreen", {
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryCardContainer: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
});
