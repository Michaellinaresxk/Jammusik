<template>
    <v-row class="justify-center">
      <v-chip
      class="ma-2"
      size="x-large"
      variant="text"
      color="secondary"
      text-color="white"
      prepend-icon="mdi-account-circle"
    >
      {{ props.userName }}
    </v-chip>
    </v-row>
</template>
<script setup lang="ts">

const props = defineProps<{
  userName: string;
}>()


</script>