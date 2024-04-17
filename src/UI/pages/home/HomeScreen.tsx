import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CategoryCard } from "../../components/shared/cards/CategoryCard";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { type RootStackParamsList } from "../../routes/StackNavigator";
import { GlobalHeader } from "../../components/shared/GlobalHeader";
import { TheGreenBorder } from "../../components/shared/TheGreenBorder";
import { globalColors } from "../../theme/Theme";
import { PrimaryButton } from "../../components/shared/PrimaryButton";
import { useUserService } from "../../../context/UserServiceContext";
import { useCategoryService } from "../../../context/CategoryServiceContext";
import { MouseEvent, useEffect, useState } from "react";
import { CategoryView } from "../../../views/CategoryView";
import { LinkLoginRegister } from "../../components/shared/LinkLoginRegister";
import { usePlaylistService } from "../../../context/PlaylistServiceContext";
import { auth } from "../../../infra/api/firebaseConfig";
import { PlaylistView } from "../../../views/PlaylistView";
import { PlaylistCard } from "../../components/shared/cards/PlaylistCard";

export const HomeScreen = () => {
  const userService = useUserService();
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
  const categoryService = useCategoryService();
  const playlistService = usePlaylistService();
  const [categories, setCategories] = useState<CategoryView[]>([]);
  const [playlists, setPlaylists] = useState<PlaylistView[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const fetchedCategories = await categoryService.getCategories();
      setCategories(fetchedCategories);
    };

    loadCategories();
  }, [categoryService]);

  useEffect(() => {
    const loadPlaylists = async () => {
      const user = auth.currentUser;
      const userId = user?.uid as string;
      try {
        const fetchedPlaylists = await playlistService.getPlaylists(userId);
        setPlaylists(fetchedPlaylists);
      } catch (error) {
        console.error("Failed to fetch playlists:", error);
      }
    };

    loadPlaylists();
  }, [playlistService]);

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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView>
          <View>
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
              <LinkLoginRegister
                text="Already have an account?"
                link="Playlists"
                goTo="PlaylistScreen"
              />
              <LinkLoginRegister
                text="Already have an account?"
                link="Categories"
                goTo="CategoriesScreen"
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
              <View style={styles.playlistContainer}>
                <Text style={styles.subTitle}>Playlists:</Text>
                <FlatList
                  data={playlists}
                  keyExtractor={item => item.id}
                  numColumns={2}
                  renderItem={({ item, index }) => (
                    <PlaylistCard
                      title={item.title}
                      color={
                        index % 2 === 0
                          ? globalColors.primary
                          : globalColors.secondary
                      }
                      onPress={() =>
                        navigation.navigate("PlaylistSelectedScreen", {
                          id: item.id,
                          title: item.title,
                        })
                      }
                      onShare={function (
                        event: MouseEvent<HTMLButtonElement, MouseEvent>,
                      ): void {
                        throw new Error("Function not implemented.");
                      }}
                      onDelete={function (playlistId: string): void {
                        throw new Error("Function not implemented.");
                      }}
                    />
                  )}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};
const styles = StyleSheet.create({
  text: {
    color: "red",
    fontSize: 30,
  },
  subTitle: {
    marginBottom: 5,
    fontSize: 18,
    color: globalColors.terceary,
  },
  categoryCardContainer: {
    padding: 30,
  },
  playlistContainer: {
    marginTop: 50,
  },
});
