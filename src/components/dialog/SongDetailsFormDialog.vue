<template>
  <v-row justify="center" class="input" data-test="songDetails-form-dialg">
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
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-form
                  @submit.prevent="handlerSongSubmit"
                  ref="currentSongDetailsForm"
                >
                  <v-sheet class="d-flex flex-column pa-7" color="#f6f6f6">
                    <v-text-field
                      clearable
                      label="Key:"
                      color="secondary"
                      v-model="songDetailsForm.key"
                      class="text-field"
                      type="text"
                      variant="underlined"
                    ></v-text-field>
                    <v-combobox
                      v-model="songDetailsForm.chordList"
                      color="secondary"
                      chips
                      clearable
                      label="Chord + enter for next chord."
                      multiple
                      variant="underlined"
                    >
                    </v-combobox>
                    <v-textarea
                      label="Notes:"
                      color="secondary"
                      v-model="songDetailsForm.notes"
                      class="text-field"
                      type="text"
                      variant="solo"
                      clearable
                      clear-icon="mdi-close-circle"
                    ></v-textarea>
                    <v-text-field
                      label="Lyric Link:"
                      color="secondary"
                      v-model="songDetailsForm.lyricLink"
                      class="text-field"
                      type="text"
                      variant="underlined"
                    ></v-text-field>
                    <v-text-field
                      label="Tab Link:"
                      color="secondary"
                      v-model="songDetailsForm.tabLink"
                      class="text-field"
                      type="text"
                      variant="underlined"
                    ></v-text-field>
                  </v-sheet>
                  <v-sheets class="d-flex justify-center">
                    <v-btn
                      class="mt-10"
                      type="submit"
                      color="secondary"
                      size="small"
                      width="100%"
                      >Add song info</v-btn
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
import { songUpdateNotification } from '../../utils/toasts';
import AddSongFloatingButton from '../AddSongFloatingButton.vue';
import { reactive } from 'vue';
import { ref } from 'vue';
import type { SongDetails } from '../../types/songTypes';

const dialog = ref(false);

const emit = defineEmits<{
  (e: 'handlerSongSubmit', formDataSong: SongDetails): void;
}>();

const closeDialog = () => {
  dialog.value = false;
};

const songDetailsForm = reactive<SongDetails>({
  key: '',
  chordList: [],
  notes: '',
  lyricLink: '',
  tabLink: '',
  songId: '',
});

const currentSongDetailsForm = ref<HTMLFormElement | null>(null);

const handlerSongSubmit = (): void => {
  if (songDetailsForm) {
    emit('handlerSongSubmit', songDetailsForm);
    dialog.value = false;
  }

  songUpdateNotification();
};
</script>
<style>
.input {
  margin-top: 2em;
}

.float-button {
  position: absolute;
  top: 14%;
  right: 0;
  padding: 2em;
}

.dialog-close {
  position: absolute;
  top: 0;
  margin-top: 36px;
}
</style>
