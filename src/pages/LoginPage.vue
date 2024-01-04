<template>
  <v-row class="login-page-wrapper pa-5" data-test="login-page">
    <v-col cols="12" class="mt-10 login-page-container">
      <BrandLogo class="mt-5" />
      <h2 class="text-field d-flex justify-center font-weight-bold mt-9 mb-9">
        Login
      </h2>
      <LoginForm @handlerLoginSubmit="loginUser" />
      <AuthInvitation />
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import BrandLogo from '../../components/BrandLogo.vue';
import LoginForm from '../../components/forms/LoginForm.vue';
import AuthInvitation from '../../components/AuthInvitation.vue';
import { type Login } from '../types/formTypes';
import { inject } from 'vue';
import { userServiceKey } from '../services/userService';

const userService = inject(userServiceKey)!;
const router = useRouter();

const loginUser = async (submitFormInfo: Login): Promise<void> => {
  try {
    const user = await userService.loginUser(
      submitFormInfo.email,
      submitFormInfo.password
    );
    console.log('User signed in:', user);
    router.push({ path: '/homepage' });
  } catch (error) {
    console.log(error);
  }
};
</script>
<style lang="scss" scoped>
.login-page-wrapper {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)),
    url(../../assets//bg/bg-microphone.jpeg);
  background-size: cover;
  background-position: center;
  position: absolute;
  min-width: 100%;
  height: 100%;
  overflow: hidden;
  top: 0%;
  left: 2.5%;
}

.text-field {
  color: #fff;
}
</style>
