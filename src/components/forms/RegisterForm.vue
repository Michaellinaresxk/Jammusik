<template>
  <q-form
    class="form-group mt-5"
    @submit.prevent="handlerRegisterSubmit"
    ref="registerForm"
    data-test="register-form"
  >
    <q-input
      required
      clearable
      color="secondary"
      :rules="formRegisterValidation.emailRules"
      label="Email"
      class="text-field"
      type="email"
      variant="underlined"
      v-model="formDataRegister.email"
    ></q-input>
    <q-input
      required
      clearable
      color="secondary"
      :rules="formRegisterValidation.userNameRules"
      label="UserName"
      class="text-field"
      type="text"
      variant="underlined"
      v-model="formDataRegister.userName"
    ></q-input>
    <q-input
      required
      clearable
      color="secondary"
      :rules="formRegisterValidation.passwordRules"
      label="Password"
      class="text-field"
      type="password"
      variant="underlined"
      v-model="formDataRegister.password"
    ></q-input>
    <q-btn
      type="submit"
      size="large"
      width="100%"
      :disabled="isSumbitDisabled"
      class="mx-auto mt-5 mb-10"
      color="secondary"
      >Sign up</q-btn
    >
  </q-form>
</template>
<script setup lang="ts">
import { type Register } from '../../types/formTypes';
import type { FormValidationRules } from '../../types/formTypes';
import { ref, reactive, computed } from 'vue';

const emit = defineEmits<{
  (e: 'handlerRegisterSubmit', submitFormInfo: Register): void;
}>();

const registerFormMessages = {
  emailEmpty: 'E-mail is required',
  emailInvalid1: 'E-mail must include an @',
  emailInvalid2: 'No empty spaces allowed',
  passwordEmpty: 'Password is required',
  passwordInvalid1: 'Password must have at least one uppercase character',
  passwordInvalid2: 'Password must have at least one number',
  passwordInvalid3: 'Password with 7+ and 14- characteres',
  userEmpty: 'User name is required',
  userInvalid: 'User name with 4+ and 10- characteres',
};

const formRegisterValidation = reactive<FormValidationRules>({
  emailRules: [
    (value: string) => !!value || registerFormMessages.emailEmpty,
    (value: string) =>
      /.+@.+/.test(value) || registerFormMessages.emailInvalid1,
    (value: string) => {
      if (value.includes(' ')) return registerFormMessages.emailInvalid2;
    },
  ],
  passwordRules: [
    (value: string) => !!value || registerFormMessages.passwordEmpty,
    (value: string) =>
      /(?=.*[A-Z])/.test(value) || registerFormMessages.passwordInvalid1,
    (value: string) =>
      /(?=.*\d)/.test(value) || registerFormMessages.passwordInvalid2,
    (value: string) =>
      /^[A-Za-z]\w{7,14}$/.test(value) || registerFormMessages.passwordInvalid3,
  ],
  userNameRules: [
    (value: string) => !!value || registerFormMessages.userEmpty,
    (value: string) =>
      /^[A-Za-z]\w{4,10}$/.test(value) || registerFormMessages.userInvalid,
  ],
});

const formDataRegister = reactive<Register>({
  email: '',
  userName: '',
  password: '',
});

const registerForm = ref<HTMLFormElement | null>(null);

const isSumbitDisabled = computed(() => {
  return (
    !formDataRegister.email ||
    !formDataRegister.userName ||
    !formDataRegister.password
  );
});

const handlerRegisterSubmit = (): void => {
  emit('handlerRegisterSubmit', formDataRegister);
  registerForm.value?.reset();
};
</script>
<style lang="scss" scoped>
.text-field {
  color: #fff;
}
</style>
