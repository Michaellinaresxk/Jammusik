<template>
  <v-row justify="center" data-test="playlist-form-dialog">
    <v-dialog v-model="dialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn
          class="mt-5"
          v-bind="props"
          prepend-icon="mdi-plus-circle"
          color="secondary"
          variant="tonal"
        >
          Create A New Playlist
        </v-btn>
      </template>
      <v-card>
        <v-toolbar color="secondary" title="Add playlist info"></v-toolbar>
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
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-form @submit.prevent="handleSubmit" ref="playlistForm">
                  <v-sheet class="d-flex flex-column pa-9" color="#f6f6f6">
                    <v-text-field
                      required
                      clearable
                      color="secondary"
                      :rules="formdataPlaylist.titleRules"
                      label="Title"
                      v-model="formdataPlaylist.title"
                      class="text-field"
                      type="text"
                      variant="underlined"
                    ></v-text-field>
                    <v-select
                      v-model="formdataPlaylist.modeId"
                      variant="underlined"
                      class="w-100 mx-auto"
                      required
                      :rules="formdataPlaylist.chooseCategoryRules"
                      label="Mode:"
                      :items="modeTitles"
                      item-text="title"
                      item-value="id"
                    ></v-select>
                    <v-row class="mt-5"> </v-row>
                  </v-sheet>
                  <v-sheets class="d-flex justify-center">
                    <v-btn
                      class="mt-10 mb-15"
                      type="submit"
                      :disabled="isSumbitDisabled"
                      color="secondary"
                      size="small"
                      width="100%"
                      >Create Playlist</v-btn
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
import { ref, inject, onMounted, reactive, computed } from 'vue';
import { modeServiceKey } from '../../services/modeService';
import type { Playlist } from '../../types/songTypes';
import { playlistNotification } from '../../utils/toasts';
import type { ModeView } from '../../views/ModeView';

const emit = defineEmits<{
  (e: 'handleSubmit', formdataPlaylist: any): Playlist;
}>();

const modeService = inject(modeServiceKey)!;
const modeTitles = ref<ModeView[]>([]);
const dialog = ref(false);

onMounted(async () => {
  if (modeService) {
    modeTitles.value = await modeService.getModeTitles();
  } else {
    console.error('PlaylistService is not provided');
  }
});

const closeDialog = () => {
  dialog.value = false;
};

const playlistFormMessages = {
  titlelEmpty: 'The title is required',
  titlelSpace: 'The title cannot start with empty spaces',
  titleInvalid: 'The title is too long',
  modeIdEmpty: 'You must choose a mode',
};

const formdataPlaylist = reactive({
  title: '',
  modeId: '',
  titleRules: [
    (value: string) => !!value || playlistFormMessages.titlelEmpty,
    (value: string) =>
      (value && !value.startsWith(' ')) || playlistFormMessages.titlelSpace,
    (value: string) =>
      (value && value.length < 20) || playlistFormMessages.titleInvalid,
  ],
  chooseCategoryRules: [
    (value: string) => !!value || playlistFormMessages.modeIdEmpty,
  ],
});

const isSumbitDisabled = computed(() => {
  return !formdataPlaylist.title || !formdataPlaylist.modeId;
});

const handleSubmit = () => {
  if (formdataPlaylist.title && formdataPlaylist.modeId) {
    emit('handleSubmit', {
      title: formdataPlaylist.title,
      modeId: formdataPlaylist.modeId,
    });
    formdataPlaylist.title = '';
    formdataPlaylist.modeId = '';
    dialog.value = false;
  } else {
    console.error('Form data is missing');
  }

  playlistNotification();
};
</script>
<style>
.dialog-close {
  position: absolute;
  top: 0;
  margin-top: 36px;
}
</style>
