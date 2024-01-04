<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <v-container data-test="category-card">
    <v-row class="d-flex category-card-content">
      <v-col cols="6">
        <v-card
          class="ma-1 d-flex justify-center align-center category-card"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.8)"
          height="100px"
          elevation="5"
          cover
          @click.stop="handlerAllCategory"
        >
          <v-card-subtitle class="text-white text-subtitle-1 font-weight-bold"
            >All
          </v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="6" v-for="category in categories" :key="category.id" md="4">
        <router-link
          :to="{
            name: 'CategorySelected',
            params: { id: category.id, title: category.title },
          }"
        >
          <v-card
            class="ma-1 d-flex justify-center align-center category-card"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.8)"
            height="100px"
            elevation="5"
            cover
          >
            <v-card-subtitle
              class="text-white text-subtitle-1 font-weight-bold"
              v-text="category.title"
            >
            </v-card-subtitle>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
  <image src="../../assets/bg/bg-home.png"></image>
</template>

<script setup lang="ts">
import { auth } from '../../infra/api/firebaseConfig';
import type { CategoryView } from '../../views/CategoryView';
import { useRouter } from 'vue-router';

defineProps<{
  categories: CategoryView[];
}>();

const userId = auth.currentUser?.uid;

const router = useRouter();
const CATEGORY_ALL = 'All';

const handlerAllCategory = () => {
  if (userId) {
    router.push({
      name: 'CategorySelected',
      params: { id: CATEGORY_ALL, title: 'All Categories' },
    });
  } else {
    console.error('No user is logged in');
  }
};
</script>
<style lang="scss" scoped>
.category-card-content {
  display: flex;
  flex-wrap: wrap;
}
.category-card {
  background-color: secondary;
  backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(17, 25, 40, 0.25);
  border-radius: 12px;
  border: 1px solid rgba(27, 153, 139, 0.6);
  padding: 2em;
  filter: drop-shadow(0 30px 10px rgba(0, 0, 0, 0.125));
  min-width: 135px;
  max-width: 200px;
}
</style>
