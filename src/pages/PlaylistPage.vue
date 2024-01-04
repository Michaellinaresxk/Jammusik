<template>
  <div data-test="playlist-page" class="playlist-wrapper">
    <TheGreenBorder />
    <h1 class="mt-10 font-weight-bold">
      <v-icon size="35px" color="secondary">mdi-playlist-music</v-icon>
      {{ headerTitle }}
    </h1>
    <div class="playlist-content">
      <h5 class="text-body-2 mt-10 font-weight-bold">{{ title }}</h5>
      <PlaylistContent />
    </div>
    <TheFooter />
    <TheToggleMenu2 />
  </div>
</template>

<script lang="ts" setup>
// import TheFooter from '../../components/base/TheFooter.vue';
// import TheGreenBorder from '../../components/base/TheGreenBorder.vue';
// import PlaylistContent from '../../components/PlaylistContent.vue';
import { ref } from 'vue';
// import TheToggleMenu2 from '@/components/base/TheToggleMenu2.vue';

const title = ref('Filter:');
const headerTitle = ref('Playlists');
</script>
<style lang="scss" scoped>
.playlist-wrapper {
  width: 100%;
  overflow: hidden;
}
</style>
