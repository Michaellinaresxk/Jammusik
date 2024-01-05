<template>
  <div data-test="path-pick-buttons">
    <router-link
      class="mb-9 mt-9 d-flex justify-center"
      :to="{ path: '/register' }"
    >
      <q-btn color="primary" size="x-large" width="100%">Register</q-btn>
    </router-link>

    <div class="container-auth-buttons mt-10">
      <q-btn class="mb-5" color="blue" width="100%" @click="handlerFacebookAuth"
        >Facebook</q-btn
      >
      <q-btn width="100%" color="warning" @click="handlerGoogleAuth"
        >Google</q-btn
      >
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'handlerGoogleAuth'): void;
  (e: 'handlerFacebookAuth'): void;
}>();

const handlerFacebookAuth = () => {
  emit('handlerFacebookAuth');
};

const handlerGoogleAuth = () => {
  emit('handlerGoogleAuth');
};
</script>
