import React, { useCallback, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import { GlobalHeader } from "../../components/shared/GlobalHeader";
import { FloatingActionButton } from "../../components/shared/FloatingActionButton";
import { type RootStackParamsList } from "../../routes/StackNavigator";
import { RouteProp, useRoute } from "@react-navigation/native";
import { TheGreenBorder } from "../../components/shared/TheGreenBorder";
import { Text } from "react-native";
import { PrimaryIcon } from "../../components/shared/PrimaryIcon";
import { globalColors } from "../../theme/Theme";
import { usePullRefresh } from "../../../hooks/usePullRefresing";
import { PrimaryButton } from "../../components/shared/PrimaryButton";
import { FormSongDetails } from "../../components/shared/forms/FormSongDetails";
import Toast from "react-native-toast-message";
import { auth } from "../../../infra/api/firebaseConfig";
import { useSongDetailsService } from "../../../context/SongDetailsServiceContext";
import { SongDetailsView } from "../../../views/SongDetailsView";

export const SongSelectedScreen = () => {
  const params =
    useRoute<RouteProp<RootStackParamsList, "PlaylistSelectedScreen">>().params;
  const [isVisible, setIsVisible] = useState(false);
  const [songDetails, setSongDetails] = useState<SongDetailsView[]>();
  const [songKey, setSongKey] = useState("");
  const [chordList, setChordList] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [lyricLink, setLyricLink] = useState("");
  const [tabLink, setTabLink] = useState("");
  const [triggerUpdate, setTriggerUpdate] = useState(false);

  const userId = auth.currentUser ? auth.currentUser.uid : null;
  const songId = params.songId;
  const SongDetailsService = useSongDetailsService();

  const closeModal = () => {
    setIsVisible(false);
  };

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Updated song Info successfully!",
    });
  };

  const onCreateSongDetails = async () => {
    try {
      const songDetails = await SongDetailsService.setSongDetails(
        userId,
        songId,
        songKey,
        chordList,
        notes,
        lyricLink,
        tabLink,
      );
      console.log(songDetails);
      showToast();
      closeModal();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to create the song. Please try again.");
    }
  };

  

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView
          refreshControl={
            <RefreshControl
              // refreshing={isRefreshing}
              // progressViewOffset={top}
              colors={[
                globalColors.primary,
                globalColors.terceary,
                globalColors.primary,
              ]}
              // onRefresh={refresh}
            />
          }>
          <TheGreenBorder />
          <View>
            <GlobalHeader headerTitle={params.title} artist={params.artist} />
            <FloatingActionButton onPress={() => setIsVisible(true)} />
          </View>
          <View style={styles.layout}>
            <View style={styles.container}>
              <Text style={styles.title}>Category:</Text>
              <View style={styles.titleContent}>
                <PrimaryIcon
                  name="musical-notes-sharp"
                  size={22}
                  color={globalColors.primary}
                />
                <Text style={styles.category}> Balad</Text>
              </View>
            </View>
            <View style={styles.container}>
              <Text style={styles.title}>Key:</Text>
              <View style={styles.titleContent}>
                <Text style={styles.category}>F#</Text>
              </View>
            </View>
          </View>

          <View style={styles.chordLayout}>
            <Text style={styles.title}>Chords:</Text>
            <View style={styles.chordConntent}>
              <Text style={styles.chord}>Fa</Text>
              <Text style={styles.chord}>Fa</Text>
              <Text style={styles.chord}>Fa</Text>
            </View>
          </View>

          <View style={styles.notesContent}>
            <Text style={styles.title}>Notes:</Text>
            <Text style={{ ...styles.category, marginTop: 10 }}>
              Stop after the first
              chorusadfaasdfa;lsdkfjas;dlfkajs;dlfkaj;aldskfjasl
            </Text>
          </View>
          <View style={styles.linksContent}>
            <View style={{ ...styles.container, marginBottom: 30 }}>
              <Text style={styles.title}>Lyric link:</Text>
              <Text style={styles.links}>Acordes.com</Text>
            </View>
            <View style={styles.container}>
              <Text style={styles.title}>Tab link: </Text>
              <Text style={styles.links}>Acordes.com</Text>
            </View>
          </View>
          <Modal
            visible={isVisible}
            animationType="slide"
            presentationStyle="formSheet">
            <View style={styles.modalBtnContainer}>
              <Text style={styles.modalFormHeaderTitle}>Add Song Details</Text>
              <PrimaryButton
                label="Close"
                btnFontSize={20}
                colorText={globalColors.light}
                onPress={() => closeModal()}
              />
            </View>
            <FormSongDetails
              songKey={songKey}
              setSongKey={setSongKey}
              chordList={chordList}
              setChordList={setChordList}
              notes={notes}
              setNotes={setNotes}
              lyricLink={lyricLink}
              setLyricLink={setLyricLink}
              tabLink={tabLink}
              setTabLink={setTabLink}
              onCreateSongDetails={onCreateSongDetails}
            />
          </Modal>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  layout: {
    padding: 30,
    marginTop: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: "bold",
    color: globalColors.primaryDark,
  },
  titleContent: {
    flexDirection: "row",
    gap: 5,
    backgroundColor: globalColors.primaryAlt,
    padding: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  chordLayout: {
    padding: 30,
    width: "100%",
    marginBottom: 15,
  },
  chordConntent: {
    flexDirection: "row",
    gap: 20,
    marginTop: 15,
  },
  chord: {
    color: globalColors.primary,
    backgroundColor: globalColors.primaryAlt,
    fontSize: 18,
    padding: 10,
  },
  category: {
    color: globalColors.primary,
    fontSize: 18,
  },
  notesContent: {
    backgroundColor: globalColors.primaryAlt,
    marginLeft: 40,
    borderRadius: 10,
    padding: 30,
    width: "80%",
  },
  notesText: {
    color: globalColors.primary,
  },
  linksContent: {
    marginTop: 30,
    marginBottom: 30,
    padding: 30,
  },
  links: {
    color: globalColors.primary,
  },
  openModalBtn: {
    backgroundColor: globalColors.primaryAlt,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  openModalBtnText: {
    color: globalColors.primary,
    fontSize: 30,
    fontWeight: "300",
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
});
