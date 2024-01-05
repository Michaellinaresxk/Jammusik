<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <div data-test="slider-category">
    <h5 class="text-body-2 mb-3 title">{{ subTitle }}</h5>
    <v-slide-group selected-class="bg-success">
      <v-slide-group-item v-for="{ id, title } in categories" :key="id">
        <router-link :to="{ name: 'CategorySelected', params: { id, title } }">
          <v-card
            color="secondary"
            variant="tonal"
            class="ma-1 d-flex justify-center align-center card"
            width="120px"
            height="90px"
          >
            <div class="align-center" height="100px">
              <v-card-subtitle
                class="d-flex text-uppercase justify-center text-subtitle-2"
                v-text="title"
              ></v-card-subtitle>
            </div>
          </v-card>
        </router-link>
      </v-slide-group-item>
    </v-slide-group>
  </div>
</template>
<script setup lang="ts">
import { ref, inject, onMounted } from 'vue';
import { categoryServiceKey } from '../services/categoryService';
import type { CategoryView } from '../views/CategoryView';

const subTitle = ref('Categories:');

const categoryService = inject(categoryServiceKey)!;
const categories = ref<CategoryView[]>([]);

onMounted(async () => {
  if (categoryService) {
    // categories.value = await categoryService.getCategories()
  } else {
    console.error('PlaylistService is not provided');
  }
});
</script>
