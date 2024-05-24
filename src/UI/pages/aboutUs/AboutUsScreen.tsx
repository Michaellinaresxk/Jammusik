import React from "react";
import { RefreshControl, StyleSheet, Text, View } from "react-native";
import { BrandLogo } from "../../components/shared/BrandLogo";
import { globalColors, globalStyles } from "../../theme/Theme";
import { ScrollView } from "react-native";
import { usePullRefresh } from "../../../hooks/usePullRefresing";
import { GoBackButton } from "../../components/shared/GoBackButton";

export const AboutUsScreen = () => {
  const { isRefreshing, refresh, top } = usePullRefresh();
  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            progressViewOffset={top}
            colors={[
              globalColors.primary,
              globalColors.terceary,
              globalColors.primary,
            ]}
            onRefresh={refresh}
          />
        }>
        <GoBackButton />
        <View style={[globalStyles.container, { padding: 24 }]}>
          <View style={styles.containerLogo}>
            <BrandLogo />
          </View>
          <View style={styles.containerTextos}>
            <Text style={styles.textos}>
              We are a useful and well thought out tool for musicians. Offering
              a number of features focused on the organization and management of
              playlists and songs, both for rehearsals and live performances.
            </Text>
          </View>
          <View style={styles.containerTextos}>
            <Text style={styles.title}>Playlist Creation and Management:</Text>
            <Text style={styles.textos}>
              Allows users to create custom playlists and add songs to them.
              These songs are displayed on cards that facilitate the
              visualization and tracking of played and pending songs.
            </Text>
          </View>
          <View style={styles.containerTextos}>
            <Text style={styles.title}>Marking Songs:</Text>
            <Text style={styles.textos}>
              Song cards can be marked as they are played, which helps musicians
              keep clear track of their setlist during a performance or
              rehearsal.
            </Text>
          </View>
          <View style={styles.containerTextos}>
            <Text style={styles.title}> Detailed Information by Song:</Text>
            <Text style={styles.textos}>
              For each selected song, users can add useful information such as
              chords, key, notes, tablature links and lyrics. This is
              particularly useful during rehearsals.
            </Text>
          </View>
          <View style={styles.containerTextos}>
            <Text style={styles.title}>Categorization by Music Genre:</Text>
            <Text style={styles.textos}>
              The application includes a categories section that allows users to
              filter songs by musical genre, making it easy to search for songs
              by musical category or genre.
            </Text>
            <Text style={styles.textos}>
              It is important to note that, in this version, the app does not
              play music; its main focus is the management and organization of
              playlists for musicians.
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  containerLogo: {
    marginVertical: 80,
  },

  containerTextos: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginBottom: 20,
  },
  title: {
    color: globalColors.primaryDark,
    fontWeight: "900",
  },
  textos: {
    color: globalColors.primaryDark,
  },
});
