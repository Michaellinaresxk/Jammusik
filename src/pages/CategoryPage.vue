<template>
  <v-container data-test="category-page" tag="div">
    <TheGreenBorder />
    <TheToggleMenu2 />
    <v-container class="d-flex flex-column items-center category__wrapper">
      <p
        class="d-flex justify-center align-center mt-10 mb-10 text-h6 text-white"
      >
        Categories
      </p>
      <CategoryCard v-if="categories" :categories="categories" />
    </v-container>
    <TheFooter />
  </v-container>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import CategoryCard from '../components/cards/CategoryCard.vue';
import { onMounted, ref } from 'vue';
import { categoryServiceKey } from '../services/categoryService';
import type { CategoryView } from '../views/CategoryView';

const categoryService = inject(categoryServiceKey)!;
const categories = ref<CategoryView[]>();

onMounted(async () => {
  if (categoryService) {
    categories.value = await categoryService.getCategories();
  } else {
    console.error('categoryService is not provided');
  }
});
</script>

<style lang="scss" scoped>
.category__wrapper {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url(../../assets/bg/bg-category.png);
  background-size: cover;
  background-position: center;
  position: absolute;
  width: 100vw;
  overflow: hidden;
  top: 0;
  left: 0;
  height: 100%;
}
</style>
