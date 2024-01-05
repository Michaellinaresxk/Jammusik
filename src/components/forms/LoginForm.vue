<template>
  <q-form @submit.prevent="handlerLoginSubmit" data-test="login-form">
    <q-input
      clearable
      color="secondary"
      :rules="formLoginRules.emailRules"
      label="Email"
      class="text-field"
      type="email"
      v-model="formdataLogin.email"
    ></q-input>
    <q-input
      clearable
      color="secondary"
      :rules="formLoginRules.passwordRules"
      label="Password"
      class="text-field"
      type="password"
      variant="underlined"
      v-model="formdataLogin.password"
    ></q-input>
    <q-btn
      type="submit"
      size="large"
      :disabled="isSumbitDisabled"
      class="mx-auto mt-5 mb-10"
      color="secondary"
      >Sign in</q-btn
    >
  </q-form>
</template>
<script setup lang="ts">
import { reactive, computed } from 'vue';
import { type Login } from '../../types/formTypes';
import type { FormValidationRules } from '../../types/formTypes';

const emit = defineEmits<{
  (e: 'handlerLoginSubmit', submitFormInfo: Login): void;
}>();

const loginFormMessages = {
  emailEmpty: 'E-mail is required',
  emailInvalid1: 'E-mail must include an @',
  emailInvalid2: 'No empty spaces allowed',
  passwordEmpty: 'Password is required',
  passwordInvalid1: 'Password must have at least one uppercase character',
  passwordInvalid2: 'Password must have at least one number',
  passwordInvalid3: 'Password with 7+ and 14- characteres',
};

const formLoginRules = reactive<FormValidationRules>({
  emailRules: [
    (value: string) => !!value || loginFormMessages.emailEmpty,
    (value: string) => /.+@.+/.test(value) || loginFormMessages.emailInvalid1,
    (value: string) => {
      if (value.includes(' ')) return loginFormMessages.emailInvalid2;
    },
  ],
  passwordRules: [
    (value: string) => !!value || loginFormMessages.passwordEmpty,
    (value: string) =>
      /(?=.*[A-Z])/.test(value) || loginFormMessages.passwordInvalid1,
    (value: string) =>
      /(?=.*\d)/.test(value) || loginFormMessages.passwordInvalid2,
    (value: string) =>
      /^[A-Za-z]\w{7,14}$/.test(value) || loginFormMessages.passwordInvalid3,
  ],
});
const formdataLogin = reactive<Login>({
  email: '',
  password: '',
});

const isSumbitDisabled = computed(() => {
  return !formdataLogin.email || !formdataLogin.password;
});

const handlerLoginSubmit = (): void => {
  emit('handlerLoginSubmit', formdataLogin);
  formdataLogin.email = '';
  formdataLogin.password = '';
};
</script>
<style lang="scss" scoped>
.q-input {
  color: #fff;
}
</style>
