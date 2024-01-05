<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <v-row data-test="playlist-card">
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
              <div class="subtitle-1">Do you want to remove this playlist?</div>
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
    <v-col v-for="(playlist, index) in playlists" :key="playlist.id">
      <v-card
        :color="index % 2 === 0 ? '#1b998b' : 'primaryAlt'"
        class="playlist-card"
        height="160px"
        @click.stop="goToPlaylistSelected(playlist.id, playlist.title)"
      >
        <v-card-title class="d-flex justify-center playlist-title">{{
          playlist.title
        }}</v-card-title>
        <div class="icons-content">
          <v-btn
            size="small"
            color="white"
            variant="text"
            icon="mdi-share-variant"
            @click.stop="snackbar = true"
          ></v-btn>
          <v-snackbar v-model="snackbar" :timeout="timeout" color="warning">
            {{ text }}
          </v-snackbar>
          <v-btn
            size="small"
            variant="text"
            icon="mdi-delete"
            color="white"
            @click.stop="handlerDelete(playlist.id)"
          ></v-btn>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Playlist } from '../../types/songTypes';
// import { playlistDeleteNotification } from '@/utils/toasts';
import { useRouter } from 'vue-router';

defineProps<{
  playlists: Playlist[];
}>();

const emit = defineEmits<{
  (event: 'handlerDelete', playlistId: string): void;
}>();

const router = useRouter();

const isDelete = ref<boolean>(false);

const playlistId = ref<string>('');

const confirmDelete = () => {
  emit('handlerDelete', playlistId.value);
  isDelete.value = false;
  // playlistDeleteNotification();
};

const handlerDelete = (id: string) => {
  playlistId.value = id;
  isDelete.value = true;
};

const snackbar = ref(false);
const text = 'SHARE functionality coming soon!';
const timeout = 2000;

const goToPlaylistSelected = (id: string, title: string) => {
  router.push({ name: 'PlaylistSelected', params: { id, title } });
};
</script>
<style lang="scss" scoped>
.playlist-card {
  min-width: 135px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.playlist-title {
  text-align: center;
  font-weight: 300;
  font-size: 1.2em;
}

.icons-content {
  text-align: end;
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
