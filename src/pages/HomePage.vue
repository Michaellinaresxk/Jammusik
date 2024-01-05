<template>
  <q-page class="row items-center justify-evenly">
    <div class="home-wrapper" data-test="home-page">
      <TheHeaderById :headerTitle="headerTitle" />
      <TheGreenBorder />
      <div class="margin-top">
        <SliderCategory />
        <MusicQuotes class="mt-15 mb-15" />
        <h5 class="text-body-2 mt-10">{{ subTitle }}</h5>
        <PlaylistContent />
      </div>
      <TheToggleMenu2 />
      <TheFooter />
    </div>
  </q-page>
</template>

<script setup lang="ts"></script>

<script setup lang="ts">
import SliderCategory from '../components/SliderCategory.vue';
import TheHeaderById from '../components/base/TheHeaderById.vue';
import PlaylistContent from '@/components/PlaylistContent.vue';
import { ref } from 'vue';
import MusicQuotes from '@/components/MusicQuotes.vue';

const subTitle = ref('Playlists:');
const headerTitle = ref('Home');
</script>
<style lang="scss" scoped>
.margin-top {
  margin-top: 11em;
}

.quotes {
  font-size: 1.2em;
  font-weight: 300;
  font-style: italic;
}
.caption {
  font-weight: 300;
}
.home-wrapper {
  width: 100%;
  overflow: hidden;
}
</style>
