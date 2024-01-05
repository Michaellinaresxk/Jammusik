<template>
  <div data-test="playlist-content">
    <PlaylistFilter @filter="handleFilter" />
    <PlaylistCard
      class="mt-7"
      :playlists="filteredPlaylists"
      @handlerDelete="handlerDelete"
    />
    <v-row class="mb-10">
      <v-col>
        <PlaylistFormDialog @handleSubmit="createPlaylist" />
      </v-col>
    </v-row>
  </div>
</template>
<script setup lang="ts">
import { inject, onMounted, ref, watch } from 'vue';
import PlaylistCard from '../components/cards/PlaylistCard.vue';
import type { Playlist } from '../types/songTypes';
import PlaylistFilter from './PlaylistFilter.vue';
import { getAuth } from 'firebase/auth';
import { auth } from '../infra/api/firebaseConfig';
import { playlistServiceKey } from '../services/playlistService';
import PlaylistFormDialog from './dialog/PlaylistFormDialog.vue';
import { useRouter } from 'vue-router';
import { usePlaylistCardFilter } from '../stores/playlistCardFilter';

const router = useRouter();
const playlistService = inject(playlistServiceKey)!;
const playlists = ref<Playlist[]>([]);
const modeAll = 'All';

const playlistCardFilterStore = usePlaylistCardFilter();

onMounted(async () => {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;
  if (userId) {
    playlists.value = await playlistService.getPlaylists(userId);
    filteredPlaylists.value = [...playlists.value];
  } else {
    console.error('No user is logged in');
  }
});

watch(playlists, (newPlaylists) => {
  filteredPlaylists.value = [...newPlaylists];
});

const filteredPlaylists = ref<Playlist[]>([...playlists.value]);

const handleFilter = (modeId: string) => {
  playlistCardFilterStore.setFilter(modeId);

  if (modeId === modeAll) {
    filteredPlaylists.value = [...playlists.value];
  } else {
    filteredPlaylists.value = playlists.value.filter(
      (playlist) => playlist.modeId === modeId
    );
  }
};

const handlerDelete = async (playlistId: string) => {
  const userId = auth.currentUser?.uid;
  if (!playlistId || !userId) {
    console.error('playlistId or userId is undefined');
    return;
  }
  try {
    await playlistService.deletePlaylist(playlistId);
    playlists.value = await playlistService.getPlaylists(userId);
  } catch (error) {
    console.error('Error deleting playlist:', error);
  }
};

const createPlaylist = async (payload: { title: string; modeId: string }) => {
  const { title, modeId } = payload;
  const newPlaylist = await playlistService.createPlaylist(title, modeId);
  if (newPlaylist) {
    playlists.value = [newPlaylist, ...playlists.value];
    router.push({ path: '/playlist' });
  } else {
    console.error('Error al crear el playlist');
  }
};
</script>
