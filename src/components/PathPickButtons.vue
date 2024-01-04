<template>
  <v-container data-test="path-pick-buttons">
    <router-link class="mb-9 mt-9 d-flex justify-center" :to="{ path: '/register' }">
      <v-btn color="primary" size="x-large" width="100%">Register</v-btn>
    </router-link>

    <div class="container-auth-buttons mt-10">
      <v-btn class="mb-5" color="sotialFacebook" width="100%" @click="handlerFacebookAuth">Facebook</v-btn>
      <v-btn width="100%" color="sotialGoogle" @click="handlerGoogleAuth">Google</v-btn>
    </div>
  </v-container>
</template>
<script setup lang="ts">

const emit = defineEmits<{
  (e: 'handlerGoogleAuth'): void;
  (e: 'handlerFacebookAuth'): void;
}>();

const handlerFacebookAuth = () => {
  emit('handlerFacebookAuth');
}

const handlerGoogleAuth = () => {
  emit('handlerGoogleAuth');
}

</script>