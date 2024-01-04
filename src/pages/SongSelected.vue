<template>
  <TheHeaderById
    :title="songCredentials?.title"
    :artist="songCredentials?.artist"
  />
  <SongDetailsFormDialog
    class="SongDetailsFormDialog"
    :songDetails="songDetails"
    @handlerSongSubmit="setSongDetails"
  />

  <TheGreenBorder />
  <TheToggleMenu2 />
  <v-container class="song_container">
    <v-row justify="space-around">
      <v-col cols="auto">
        <v-dialog
          v-model="isDelete"
          transition="dialog-bottom-transition"
          width="auto"
        >
          <v-card>
            <v-toolbar color="red" title="Are you sure?"></v-toolbar>
            <v-card-text>
              <div class="subtitle-1">Do you want to remove this song?</div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn variant="tonal" color="red" @click="isDelete = false"
                >Ups!, by mistake</v-btn
              >
              <v-btn variant="text" @click="confirmDelete">Yes, Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-space-between align-center mb-10">
      <div class="d-flex align-center mr-5">
        <h5 class="text-body-2 font-weight-bold">{{ categoryTitle }}</h5>
        <v-chip class="ma-2" color="secondary" label text-color="white">
          <v-icon start icon="mdi-music"></v-icon>
          {{ categoryTitleInfo }}
        </v-chip>
      </div>
      <div class="d-flex align-center">
        <h5 class="text-body-2 font-weight-bold">{{ keyTitle }}</h5>
        <v-chip color="secondary ml-3">
          {{ songDetails?.key }}
        </v-chip>
      </div>
    </v-row>
    <v-row>
      <v-alert
        v-if="songDetails?.notes"
        class="mb-15"
        title="Notes:"
        type="info"
        border="start"
        :text="songDetails.notes"
        variant="tonal"
        closable
      ></v-alert>
    </v-row>
    <v-row class="d-flex align-center">
      <h5 class="text-body-2 font-weight-bold mr-3">{{ chordTitle }}</h5>
      <v-chip
        class="mr-2"
        v-for="(chord, index) in songDetails?.chordList"
        :key="index"
        color="secondary"
      >
        {{ chord }}
      </v-chip>
    </v-row>
  </v-container>

  <v-row>
    <v-col class="d-flex align-center mt-10">
      <h5 class="text-body-2 font-weight-bold">{{ lyricTitle }}</h5>
      <h5 class="text-body-2 ml-5 text-white">{{ songDetails?.lyricLink }}</h5>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="d-flex align-center mt-7">
      <h5 class="text-body-2 font-weight-bold mb-2">{{ tabTitle }}</h5>
      <h5 class="text-body-2 ml-5 mb-2 text-white">
        {{ songDetails?.tabLink }}
      </h5>
    </v-col>
  </v-row>
  <v-container class="delete-btn d-flex mt-15 mb-10 justify-center">
    <v-btn color="pink-accent-3" variant="tonal" @click="handlerDelete"
      >Delete song</v-btn
    >
  </v-container>
  <TheFooter />
</template>
<script lang="ts" setup>
import TheHeaderById from '@/components/base/TheHeaderById.vue';
import TheGreenBorder from '@/components/base/TheGreenBorder.vue';
import TheFooter from '@/components/base/TheFooter.vue';
import SongDetailsFormDialog from '@/components/dialog/SongDetailsFormDialog.vue';
import { inject, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { songServiceKey } from '../services/songService';
import { categoryServiceKey } from '../services/categoryService';
import { songDeleteNotification } from '../utils/toasts';
import type { Song } from '../types/songTypes';
import type { SongDetails } from '../types/songTypes';
import TheToggleMenu2 from '@/components/base/TheToggleMenu2.vue';

const route = useRoute();
const router = useRouter();

const songService = inject(songServiceKey)!;
const categoryService = inject(categoryServiceKey)!;
const songCredentials = ref<Song | null>(null);
const songDetails = ref<SongDetails | null>(null);
const categoryTitleInfo = ref();

const songId = route.params.songId as string;
const isDelete = ref<boolean>(false);

const keyTitle = ref('Key:');
const categoryTitle = ref('Category:');
const chordTitle = ref('Chords:');
const lyricTitle = ref('Lyric Link:');
const tabTitle = ref('Tab Link:');

const fetchSong = async (playlistId: string, songId: string) => {
  try {
    songCredentials.value = await songService.getSong(playlistId, songId);
  } catch (error) {
    console.error('Error fetching song:', error);
  }
};

const fetchSongDetails = async (songId: string) => {
  try {
    songDetails.value = await songService.getSongDetails(songId);
    if (!songDetails.value) {
      console.error('No song details available');
    }
  } catch (error) {
    console.error('Error fetching song details:', error);
  }
};

const fetchCategoriesAndSetCategoryTitle = async () => {
  try {
    const allCategories = await categoryService.getCategories();
    const categoryId = songCredentials.value?.categoryId;
    const matchingCategory = allCategories.find(
      (category) => category.id === categoryId
    );
    if (matchingCategory) {
      categoryTitleInfo.value = matchingCategory.title;
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

onMounted(async () => {
  const songId = route.params.songId as string;
  const playlistId = route.params.playlistId as string;

  if (!songService || !playlistId || !songId) {
    console.error('Missing dependencies');
    return;
  }
  await fetchSong(playlistId, songId);
  await fetchSongDetails(songId);
  await fetchCategoriesAndSetCategoryTitle();
});

const setSongDetails = async (songDetails: SongDetails) => {
  const { key, chordList, notes, lyricLink, tabLink } = songDetails;
  try {
    await songService.setSongDetails(
      songId,
      key as string,
      chordList as string[],
      notes as string,
      lyricLink as string,
      tabLink as string
    );
    console.log('Song details updated successfuly');
  } catch (error) {
    console.error('Error updating song details', error);
  }
};

const handlerDelete = () => {
  isDelete.value = true;
};

const confirmDelete = async () => {
  try {
    await songService.deleteSong(songId);
    setTimeout(() => {
      songDeleteNotification();
    }, 1000);
    router.push({ path: '/playlist' });
  } catch (error) {
    console.error('Error deleting song:', error);
  } finally {
    isDelete.value = false;
  }
};
</script>
<style lang="scss" scoped>
.song_container {
  margin-top: 80px;
}
.SongDetailsFormDialog {
  margin-top: 100px;
}
</style>
