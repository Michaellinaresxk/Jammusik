<template>
  <v-row class="login-page-wrapper" data-test="path-pick-page">
    <v-col cols="12" class="mt-15">
      <BrandLogo class="mt-5 mb-12" />
      <v-container class="d-flex flex-column">
        <PathPickButtons
          @handlerFacebookAuth="authWithFacebook"
          @handlerGoogleAuth="authWithGoogle"
        />
      </v-container>
      <!-- <AuthInvitation class="ml-4" /> -->
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
// import AuthInvitation from '@/components/AuthInvitation.vue';
import BrandLogo from '../components/BrandLogo.vue';
import PathPickButtons from '../components/PathPickButtons.vue';
// import { userServiceKey } from '@/services/userService';
// import { inject } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
// const userService = inject(userServiceKey)!;

const authWithGoogle = async () => {
  try {
    // const user = await userService.authUserGoogle();
    router.push({ path: '/profile' });
  } catch (err) {
    console.error('Error during Google authentication:', err);
  }
};

const authWithFacebook = async () => {
  try {
    // await userService.authUserFacebook();
    router.push({ path: '/profile' });
  } catch (err) {
    console.error('Error during Google authentication:', err);
  }
};
</script>
<style lang="scss" scoped>
.login-page-wrapper {
  background-image: linear-gradient(rgba(86, 181, 167, 0.5), rgba(0, 0, 0, 0.9)),
    url(../assets/bg/banner-bg.png);
  background-size: cover;
  background-position: center;
  position: absolute;
  min-width: 100%;
  height: 100%;
  min-height: 100%;
  top: 0;
}
</style>
