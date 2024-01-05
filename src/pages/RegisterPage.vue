<template>
  <v-row class="register-page-wrapper pa-5" data-test="register-page">
    <v-col cols="12">
      <BrandLogo />
      <h2 class="text-field d-flex justify-center font-weight-bold mt-9 mb-9">
        Register
      </h2>
      <RegisterForm @handlerRegisterSubmit="registerUser" />
      <AuthInvitation />
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { inject } from 'vue';
import AuthInvitation from '../components/AuthInvitation.vue';
import BrandLogo from '../components/BrandLogo.vue';
import RegisterForm from '../components/forms/RegisterForm.vue';
import { type Register } from '../types/formTypes';
import { useRouter } from 'vue-router';
import { userServiceKey } from '../services/userService';

const router = useRouter();
const userService = inject(userServiceKey)!;

const registerUser = async (payload: Register) => {
  const { email, password, userName } = payload;
  await userService.registerUser(email, password, userName);
  router.push({ path: '/profile' });
};
</script>
<style lang="scss" scoped>
.register-page-wrapper {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)),
    url(../assets//bg/bg-microphone.jpeg);
  background-size: cover;
  background-position: center;
  position: absolute;
  width: 100%;
  min-height: 100%;
}

.text-field {
  color: #fff;
}
</style>
