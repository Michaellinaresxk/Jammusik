<template>
  <v-container data-test="song-card">
    <h5 class="text-body-2 mb-3 font-weight-bold d-flex align-center justify-center">
      {{ title }}
      <v-chip class="ma-2" color="secondary" label text-color="white">
        <v-icon start icon="mdi-music"></v-icon>
        {{ songsCounter }}
      </v-chip>
    </h5>
    <v-card max-width="300" class="card mx-auto">
      <v-row dense>
        <v-col cols="12" v-for="(song, index) in songList" :key="song.id">
          <v-card
            :class="{ card_body: song.isEditing }"
            :disabled="song.isEditing === true"
            :color="index % 2 === 0 ? '#1b998b' : 'primaryAlt'"
            class="d-flex justify-space-between align-center"
            height="75"
          >
            <div style="flex: 1; max-width: 80%">
              <v-card-title
                @click.stop="goToSongDetails(song.id)"
                color="#fff"
                :class="{ card_title: song.isEditing }"
                style="margin-bottom: -10px"
              >
                {{ song.title }}
              </v-card-title>
              <v-card-subtitle color="white">- {{ song.artist }}</v-card-subtitle>
            </div>
            <v-slide-x-reverse-transition mode="out-in">
              <v-icon :key="`icon-${song.isEditing}`" :color="song.isEditing ? 'white' : 'white'"
                :icon="song.isEditing ? 'mdi-check-outline' : 'mdi-circle-edit-outline'"
                @click.stop="songs.toggleSongEditingStatus(song)">
              </v-icon>
            </v-slide-x-reverse-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-container class="d-flex justify-center">
      <v-btn v-if="showBtn && songList.length > 0" class="mt-10 mb-10" color="red" variant="tonal" @click.stop="songs.resetAllSongs(songList)">Reset Ready
        Songs</v-btn>
    </v-container>
  </v-container>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { SongCard } from '../../types/songTypes'
import { songIsDone } from '@/stores/songIsDoneStore'

const props = defineProps<{ songList: SongCard[]; songsCounter: number }>()

const songs = songIsDone()

const title = ref('Num tracks:')
const route = useRoute()
const router = useRouter()

const goToSongDetails = (songId: string) => {
  const playlistId = route.params.id
  router.push({ name: 'SongSelected', params: { playlistId, songId } })
}

const showBtn = ref(false)
watchEffect(() => {
  showBtn.value = props.songList.length > 0;
});
</script>
<style scoped lang="scss">
.card {
  background: transparent;
}
.card_body {
  opacity: 0.4;
  cursor: not-allowed;
}

.card_title {
  text-decoration-line: line-through;
}
</style>
