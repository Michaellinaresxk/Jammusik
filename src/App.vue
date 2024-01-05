<template>
  <router-view />
</template>

<script setup lang="ts">
import { provide } from 'vue';
import { userService, userServiceKey } from './services/userService';
import {
  playlistServiceKey,
  playlistService,
} from './services/playlistService';
import { songServiceKey, songService } from './services/songService';
import {
  categoryServiceKey,
  categoryService,
} from './services/categoryService';
import { modeServiceKey, modeService } from './services/modeService';

provide(userServiceKey, userService);
provide(playlistServiceKey, playlistService);
provide(categoryServiceKey, categoryService);
provide(songServiceKey, songService);
provide(modeServiceKey, modeService);
</script>
