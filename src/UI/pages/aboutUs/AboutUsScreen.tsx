import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BrandLogo } from "../../components/shared/BrandLogo";
import { globalColors, globalStyles } from "../../theme/Theme";
import { ScrollView } from "react-native";

export const AboutUsScreen = () => {
  return (
    <View style={[globalStyles.container, { padding: 24 }]}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.containerLogo}>
          <BrandLogo />
        </View>
        <View style={[styles.containerTextos, { marginBottom: 20 }]}>

          <Text style={styles.textos}>We are a useful and well thought out tool for musicians. Offering a number of features focused on the organization and management of playlists and songs, both for rehearsals and live performances.</Text>
        </View>
        <View style={styles.containerTextos}>
          <Text style={styles.title}>1. Playlist Creation and Management:</Text>
          <Text style={styles.textos}>

            Allows users to create custom playlists and add songs to them. These songs are displayed on cards that facilitate the visualization and tracking of played and pending songs.</Text>
        </View>
        <View style={styles.containerTextos}>
          <Text style={styles.title}>2. Marking Songs:</Text>
          <Text style={styles.textos}>
            Song cards can be marked as they are played, which helps musicians keep clear track of their setlist during a performance or rehearsal.</Text>
        </View>
        <View style={styles.containerTextos}>
          <Text style={styles.title}> 3. Detailed Information by Song:</Text>
          <Text style={styles.textos}>
            For each selected song, users can add useful information such as chords, key, notes, tablature links and lyrics. This is particularly useful during rehearsals.</Text>
        </View>
        <View style={styles.containerTextos}>
          <Text style={styles.title}> 5. Categorization by Music Genre:</Text>
          <Text style={styles.textos}>
            The application includes a categories section that allows users to filter songs by musical genre, making it easy to search for songs by musical category or genre.

          </Text>
          <Text style={styles.textos}>
            It is important to note that, in this version, the app does not play music; its main focus is the management and organization of playlists for musicians.
          </Text>
        </View>

      </ScrollView>
    </View>
  );
};



const styles = StyleSheet.create({

  containerLogo: {
    marginVertical: 34
  },

  containerTextos: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    marginBottom: 10
  },
  title: {
    color: globalColors.primaryDark,
    fontWeight: '900'

  },
  textos: {
    color: globalColors.primaryDark
  }
})
