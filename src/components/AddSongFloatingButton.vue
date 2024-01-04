<template>
  <v-row class="float-button" data-test="add-song-button">
    <v-col cols="auto">
      <v-btn @click="showForm" icon="mdi-plus" elevation="3" color="secondary" size="large">
      </v-btn>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">

const emit = defineEmits<{
  (e: 'showForm', showForm: any): void
}>()

const showForm = (): void => {
  emit('showForm', showForm);
}

</script>
<style>
.float-button {
  position: absolute;
  top: 14%;
  right: 0;
  padding: 2em;
  z-index: 1;
}
</style>