<template>
  <v-row justify="center" class="input" data-test="song-form-dialgo">
    <v-dialog v-model="dialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <AddSongFloatingButton v-bind="props" />
      </template>
      <v-card>
        <v-toolbar color="secondary" title="Add song info"></v-toolbar>
        <div class="d-flex justify-end pa-2">
          <v-btn
            icon
            class="dialog-close"
            color="grey-lighten-3"
            elevation="3"
            @click="closeDialog"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <ToolBarHeader />
        <v-card-text class="form-body">
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-form @submit.prevent="handlerSongSubmit" ref="playlistForm">
                  <v-sheet class="d-flex flex-column pa-7" color="#f6f6f6">
                    <v-text-field
                      required
                      clearable
                      :rules="formSongRules.titleRules"
                      label="Title"
                      color="secondary"
                      v-model="formDataSong.title"
                      class="text-field"
                      type="text"
                      variant="underlined"
                    ></v-text-field>
                    <v-text-field
                      :rules="formSongRules.artistRules"
                      label="Artist / Band"
                      color="secondary"
                      v-model="formDataSong.artist"
                      class="text-field"
                      type="text"
                      variant="underlined"
                      required
                    ></v-text-field>
                    <v-select
                      variant="underlined"
                      :readonly="isSelectReadOnly"
                      class="w-100 mx-auto"
                      required
                      :rules="formSongRules.categoryRules"
                      label="Choose a category"
                      v-model="formDataSong.categoryId"
                      :items="categories"
                      item-text="title"
                      item-value="id"
                      color="secondary"
                    ></v-select>
                  </v-sheet>
                  <v-sheets class="d-flex justify-center">
                    <v-btn
                      class="mt-10"
                      type="submit"
                      :disabled="isSumbitDisabled"
                      color="secondary"
                      size="small"
                      width="100%"
                      >Add song</v-btn
                    >
                  </v-sheets>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script setup lang="ts">
import { songNotification } from '../../utils/toasts';
import AddSongFloatingButton from '../AddSongFloatingButton.vue';
import type { Song } from '../../types/songTypes';
import type { FormValidationRules } from '../../types/formTypes';
import { reactive, computed, watch } from 'vue';
import { ref, inject, onMounted } from 'vue';
import { categoryServiceKey } from '../../services/categoryService';
import type { CategoryView } from '../../views/CategoryView';
import { useRoute } from 'vue-router';

const dialog = ref(false);

const route = useRoute();

const emit = defineEmits<{
  (e: 'handlerSongSubmit', formDataSong: Song): void;
}>();

const categoryService = inject(categoryServiceKey)!;
const categories = ref<CategoryView[]>([]);

onMounted(async () => {
  if (categoryService) {
    categories.value = await categoryService.getCategories();
  } else {
    console.error('PlaylistService is not provided');
  }
});

const closeDialog = () => {
  dialog.value = false;
};

const songFormMessages = {
  titlelEmpty: 'The title is required',
  titlelSpace: 'The title cannot start with empty spaces',
  titleInvalid: 'The title is too long',
  artistEmpty: 'You must choose and artist or a band to relate the song with',
  categoryEmpty: 'You must choose a category',
};

const formSongRules = reactive<FormValidationRules>({
  titleRules: [
    (value: string) => !!value || songFormMessages.titlelEmpty,
    (value: string) =>
      (value && !value.startsWith(' ')) || songFormMessages.titlelSpace,
    (value: string) =>
      (value && value.length < 20) || songFormMessages.titleInvalid,
  ],
  artistRules: [(value: string) => !!value || songFormMessages.artistEmpty],
  categoryRules: [(value: string) => !!value || songFormMessages.categoryEmpty],
});

const formDataSong = reactive<Song>({
  id: '',
  playlistId: '',
  title: '',
  artist: '',
  categoryId: '',
});

const isSumbitDisabled = computed(() => {
  return (
    !formDataSong.title || !formDataSong.artist || !formDataSong.categoryId
  );
});

const handlerSongSubmit = (event: any) => {
  event.preventDefault();
  if (formDataSong) {
    emit('handlerSongSubmit', formDataSong);
    formDataSong.artist = '';
    formDataSong.title = '';
    formDataSong.categoryId = '';
    dialog.value = false;
  }
  songNotification();
};

const isSelectReadOnly = computed(() => {
  return route.name === 'CategorySelected' && route.params.id !== 'All';
});

function setInitialCategory() {
  if (route.name === 'CategorySelected' && route.params.id !== 'All') {
    formDataSong.categoryId = route.params.id as string;
  }
}

onMounted(setInitialCategory);
watch(() => route.params, setInitialCategory);
</script>
<style scoped lang="scss">
.input {
  margin-top: 12em;
  z-index: 1;
}
.dialog-close {
  position: absolute;
  top: 0;
  margin-top: 36px;
}
</style>
