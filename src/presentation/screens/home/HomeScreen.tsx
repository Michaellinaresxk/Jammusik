import { FlatList, StyleSheet, Text, View } from "react-native";
import { CategoryCard } from "../../components/shared/cards/CategoryCard";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { type RootStackParamsList } from "../../routes/StackNavigator";
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
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.subTitle}>Categories:</Text>
        </View>
        <FlatList
          data={categories}
          keyExtractor={item => item.id}
          horizontal={true}
          renderItem={({ item }) => (
            <CategoryCard
              title={item.title}
              onPress={() =>
                navigation.navigate("CategoryScreen", {
                  id: item.id,
                  title: item.title,
                })
              }
            />
          )}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    marginTop: 30,
  },
  subTitle: {
    marginBottom: 5,
  },
});
