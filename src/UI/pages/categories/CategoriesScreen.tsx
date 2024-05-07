import {
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Modal,
} from "react-native";
import { globalColors, globalStyles } from "../../theme/Theme";
import { images } from "../../../assets/img/Images";
import { CategoryCard } from "../../components/shared/cards/CategoryCard";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { type RootStackParamsList } from "../../routes/StackNavigator";
import { useCategoryService } from "../../../context/CategoryServiceContext";
import { useEffect, useState } from "react";
import { CategoryView } from "../../../views/CategoryView";
import { PrimaryButton } from "../../components/shared/PrimaryButton";
import { FormCreateCategory } from "../../components/shared/forms/FormCreateCategory";
import { getAuth } from "firebase/auth";

const backgroundImage = { uri: images.image3 };

export const CategoriesScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
  const auth = getAuth();
  const categoryService = useCategoryService();
  const [categories, setCategories] = useState<CategoryView[]>([]);
  useEffect(() => {
    const loadCategories = async () => {
      const fetchedCategories = await categoryService.getCategories();
      setCategories(fetchedCategories);
    };

    loadCategories();
  }, [categoryService, auth.currentUser]);

  const [isVisible, setIsVisible] = useState(false);
  const [triggerUpdate, setTriggerUpdate] = useState(false);

  const [title, setTitle] = useState("");
  const closeModal = () => {
    setIsVisible(!isVisible);
  };

  const handleCreateCategory = async () => {
    const user = auth.currentUser;
    const userId = user?.uid as string;
    console.log("creando playlist");
    await categoryService.createCategory(userId, title);
    setTitle("");
    setTriggerUpdate(prev => !prev);
    closeModal();
  };

  return (
    <ImageBackground source={backgroundImage} resizeMode="cover">
      <View style={globalStyles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.container}>
          <ScrollView>
            <View style={{ marginTop: 50, justifyContent: "center" }}>
              <CategoryCard
                title="All"
                onPress={() =>
                  navigation.navigate("CategorySelectedScreen", {
                    id: "All",
                    title: "All",
                  })
                }
              />
              <FlatList
                data={categories}
                keyExtractor={item => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                  <CategoryCard
                    title={item.title}
                    onPress={() =>
                      navigation.navigate("CategorySelectedScreen", {
                        id: item.id,
                        title: item.title,
                        categoryId: item.categoryId,
                      })
                    }
                  />
                )}
              />

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => setIsVisible(true)}
                  style={styles.openModalBtn}>
                  {/* <Icon name="id-card-sharp" color={globalColors.primary} size={23} /> */}
                  <Text style={styles.openModalBtnText}>
                    CREATE A NEW CATEGORY
                  </Text>
                </TouchableOpacity>
              </View>
              <Modal
                visible={isVisible}
                animationType="slide"
                presentationStyle="formSheet">
                <View style={styles.modalBtnContainer}>
                  <Text style={styles.modalFormHeaderTitle}>
                    Add Category Info
                  </Text>
                  <PrimaryButton
                    label="Close"
                    btnFontSize={20}
                    colorText={globalColors.light}
                    onPress={() => closeModal()}
                  />
                </View>
                <FormCreateCategory
                  title={title}
                  setTitle={setTitle}
                  onCreateCategory={handleCreateCategory}
                />
              </Modal>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 100,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    padding: 30,
  },
  modalBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: globalColors.primary,
    paddingLeft: 22,
  },
  modalFormHeaderTitle: {
    fontSize: 20,
    color: globalColors.light,
  },
  openModalBtn: {
    backgroundColor: globalColors.primaryAlt,
    padding: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 5,
  },
  openModalBtnText: {
    color: globalColors.primary,
  },
});
