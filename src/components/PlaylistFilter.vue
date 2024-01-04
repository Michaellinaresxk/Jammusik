<template>
  <div data-test="playlist-filter">
    <v-row class="d-flex justify-end mb-4">
      <v-slide-group selected-class="bg-success">
        <v-slide-group-item>
          <v-btn
            variant="plain"
            :color="activeMode === 'All' ? 'secondary' : 'primary'"
            :active="activeMode === 'All'"
            class="mt-5"
            @click="filterPlaylists()"
          >
            <p class="text-subtitle-2">All</p>
          </v-btn>
          <v-btn
            v-for="mode in modeTitle"
            variant="plain"
            :key="mode.id"
            class="mt-5"
            @click="filterPlaylists(mode.id)"
            :color="activeMode === mode.id ? 'secondary' : 'primary'"
            :active="activeMode === mode.id"
          >
            <p class="filter-title text-subtitle-2">{{ mode.title }}</p>
          </v-btn>
        </v-slide-group-item>
      </v-slide-group>
    </v-row>
  </div>
</template>
<script setup lang="ts">
import { ref, inject, onMounted } from 'vue';
import { modeServiceKey } from '../services/modeService';
import type { ModeView } from '../views/ModeView';

const emit = defineEmits<{
  (e: 'filter', mode: string): string;
}>();

const modeService = inject(modeServiceKey)!;
const modeTitle = ref<ModeView[]>([]);
const activeMode = ref('All');

onMounted(async () => {
  if (modeService) {
    const fetchedMode = await modeService.getModeTitles();
    modeTitle.value = fetchedMode;
  } else {
    console.error('ModeService is not provided');
  }
});

const filterPlaylists = (mode = 'All') => {
  activeMode.value = mode;
  emit('filter', mode);
};
</script>
