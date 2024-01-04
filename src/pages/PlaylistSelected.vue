<template>
  <div class="playlist-selected" data-test="playlist-selected">
    <TheHeaderById :title="headerTitle" />
    <TheGreenBorder />
    <SongFormDialog @handlerSongSubmit="createSong" />
    <SongCard :songList="songList" :songsCounter="songsCounter" />
    <TheFooter />
    <TheToggleMenu2 />
  </div>
</template>

<script lang="ts" setup>
import { inject, onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { songServiceKey } from '../services/songService';
import TheToggleMenu2 from '../../components/base/TheToggleMenu2.vue';
import TheHeaderById from '../../components/base/TheHeaderById.vue';
import SongCard from '../../components/cards/SongCard.vue';
import TheFooter from '../../components/base/TheFooter.vue';
import TheGreenBorder from '../../components/base/TheGreenBorder.vue';
import SongFormDialog from '@/components/dialog/SongFormDialog.vue';
import type { Song } from '../types/songTypes';
import type { SongView } from '../views/SongView';

const songService = inject(songServiceKey)!;

const route = useRoute();
const playlistId = route.params.id as string;
const headerTitle = route.params.title as string;

if (typeof route.params.id !== 'string') {
  throw new Error('Expected route.params.id to be a string');
}

if (!playlistId) {
  console.error('Failed to retrieve playlistId');
}

const songList = ref<SongView[]>([]);
const songsCounter = computed(() => songList.value.length);

onMounted(async () => {
  if (songService) {
    songList.value = await songService.getSongs(playlistId);
  } else {
    console.error('PlaylistService is not provided');
  }
});

const createSong = async ({ id, title, artist, categoryId }: Song) => {
  const newSong = await songService.createSong(
    playlistId,
    id,
    title,
    artist,
    categoryId
  );
  if (newSong) {
    songList.value = [newSong, ...songList.value];
  }
};
</script>
