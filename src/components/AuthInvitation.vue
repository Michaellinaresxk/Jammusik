
<template>
  <v-container class="login__not-member d-flex" data-test="auth-invitation">
    <p class="login__p text-subtitle-1">Already have an account?</p>
    <router-link class="login-register__link" :to="{ path: linkPath }"> {{ linkText }} </router-link>
  </v-container>
</template>
<script setup lang="ts">
import { useLoginLink } from '../composables/useAuthLink';
const { linkText, linkPath } = useLoginLink();
</script>

<style lang="scss" scoped>
.login__p {
  color: #fff;
}

.login-register__link {
  margin-left: .5em;
  margin-top: .2em;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;
  color: #56b5a6;
}
</style>