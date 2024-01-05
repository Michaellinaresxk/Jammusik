<template>
  <v-row class="login-page-wrapper pa-5" data-test="login-page">
    <v-col cols="12" class="mt-10 login-page-container">
      <BrandLogo class="mt-5" />
      <h2 class="text-field d-flex justify-center font-weight-bold mt-9">
        "We Value Your Feedback!
      </h2>
      <p class="font-weight-regular mt-9 text-white">
        We're always striving to improve and provide the best experience
        possible. Your insights and suggestions are invaluable to us.
      </p>
      <p class="font-weight-regular mt-7 text-white">
        To submit your feedback, simply click on the 'Send Feedback' button.
        Whether it's a feature request, a bug report, or general feedback, we're
        excited to hear from you.
      </p>
      <p class="font-weight-regular mt-7 text-white">
        Thank you for being a part of our community!"
      </p>
    </v-col>
    <v-col>
      <q-form data-test="login-form">
        <v-textarea
          clearable
          label="Place your feedback here..."
          type="textarea"
          filled
        ></v-textarea>
        <q-btn
          type="submit"
          size="large"
          width="100%"
          class="mx-auto mt-5 mb-10"
          color="secondary"
          >Send Feedback</q-btn
        >
      </q-form>
    </v-col>
  </v-row>
  <TheGreenBorder />
  <TheAppBar />
  <TheToggleMenu2 />
</template>
<script setup lang="ts">
import BrandLogo from '../components/BrandLogo.vue';
// import TheGreenBorder from '../components/base/TheGreenBorder.vue';
// import TheAppBar from '../components/base/TheAppBar.vue';
// import TheToggleMenu2 from '../components/base/TheToggleMenu2.vue';
</script>
<style lang="scss" scoped>
.login-page-wrapper {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)),
    url(../assets/bg/bg-microphone.jpeg);
  background-size: cover;
  background-position: center;
  position: absolute;
  min-width: 100%;
  min-height: 100%;
  top: 0%;
}

.text-field {
  color: #fff;
}
</style>
