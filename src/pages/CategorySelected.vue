<template>
  <v-container
    class="category-wrapper"
    data-test="category-selected-page"
    tag="div"
  >
    <TheGreenBorder />
    <TheHeaderById :headerTitle="headerTitle" />
    <v-container class="songList">
      <v-row>
        <SongCard :songList="songList" :songsCounter="songsCounter" />
      </v-row>
    </v-container>
    <TheFooter />
    <TheToggleMenu2 />
  </v-container>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { categoryServiceKey } from '../services/categoryService';
import { getAuth } from 'firebase/auth';
import TheFooter from '../../components/base/TheFooter.vue';
import TheGreenBorder from '../../components/base/TheGreenBorder.vue';
import TheHeaderById from '@/components/base/TheHeaderById.vue';
import TheToggleMenu2 from '@/components/base/TheToggleMenu2.vue';
import SongCard from '@/components/cards/SongCard.vue';
import type { SongView } from '../views/SongView';

const route = useRoute();
const auth = getAuth();

const headerTitle = route.params.title as string;
const userId = auth.currentUser?.uid as string;

const categoryId = route.params.id as string;
const categoryService = inject(categoryServiceKey)!;
const categorySelected = categoryId;

const songList = ref<SongView[]>([]);
const songsCounter = computed(() => songList.value.length);

if (typeof route.params.id !== 'string') {
  throw new Error('Expected route.params.id to be a string');
}

if (!categoryId) {
  console.error('Failed to retrieve categoryId');
}

const CATEGORY_ALL = 'All';
onMounted(async () => {
  if (categorySelected === CATEGORY_ALL) {
    songList.value = await categoryService.getAllSongsByUserId(userId);
  } else {
    songList.value = await categoryService.getSongListByCategory(
      categoryId,
      userId
    );
  }
});
</script>
<style>
.songList {
  margin-top: 11em;
}
</style>
