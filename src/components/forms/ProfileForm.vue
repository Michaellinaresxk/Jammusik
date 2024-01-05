<template>
  <v-container>
    <v-dialog
      v-model="isDelete"
      transition="dialog-bottom-transition"
      width="auto"
    >
      <v-card>
        <v-toolbar color="red" title="Are you sure?"></v-toolbar>
        <v-card-text>
          <div class="subtitle-1">Do you want to remove this profile?</div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="tonal" color="red" @click="isDelete = false"
            >Ups!, by mistake</v-btn
          >
          <v-btn variant="text" @click="confirmDelete">Yes, Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <q-form
      class="d-flex flex-column justify-center align-center mx-auto"
      @submit.prevent="handlerSubmit"
      ref="settingsForm"
    >
      <v-sheet class="form d-flex flex-column p-10 mb-10" width="100%">
        <q-input
          type="text"
          variant="underlined"
          required
          v-model="formDataSettings.name"
          label="Name"
        ></q-input>
        <q-input
          type="email"
          variant="underlined"
          required
          v-model="formDataSettings.email"
          class="mt-1"
          label="E-mail address"
        ></q-input>
        <q-input
          type="text"
          variant="underlined"
          required
          v-model="userId"
          class="mt-1"
          label="User Id"
          append-inner-icon="mdi-content-copy"
          @click:append-inner="copyToClipboard(userId)"
        ></q-input>
        <q-input
          type="text"
          variant="underlined"
          required
          v-model="formDataSettings.location"
          class="mt-1"
          label="Location"
        ></q-input>
        <q-radio-group
          inline
          type="radio"
          class="mt-3 mx-auto"
          label="Skills"
          color="secondary"
          v-model="formDataSettings.skills"
        >
          <q-radio inline label="Musician" value="Musician"></q-radio>
          <q-radio inline label="Dj" value="Dj"></q-radio>
          <q-radio inline label="Producer" value="Producer"></q-radio>
        </q-radio-group>
        <q-select
          variant="underlined"
          class="w-100 mx-auto"
          required
          label="Instrument"
          :items="instruments"
          v-model="formDataSettings.instrument"
        ></q-select>
        <v-sheets class="d-flex d-flex justify-space-between">
          <q-btn
            class="mt-10"
            color="red"
            size="small"
            variant="tonal"
            @click="handlerUserDelete"
            type="button"
            >Delete account</q-btn
          >
          <q-btn class="mt-10" color="secondary" size="small" type="submit"
            >SaveChanges</q-btn
          >
        </v-sheets>
      </v-sheet>
    </q-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import type { UserInfo } from '../../types/formTypes';
import { profileNotification } from '../../utils/toasts';
import { copyToClipboard } from '../../utils/copyToClipBoard';
import type { User } from '../../types/formTypes';

const emit = defineEmits<{
  (e: 'handlerSubmit', submitFormInfo: UserInfo): void;
}>();

const props = defineProps<{
  currentUser: User;
  userId: string;
  userInfo: UserInfo;
}>();

const isDelete = ref<boolean>(false);
const userId = props.userId;

watch(
  [() => props.userInfo, () => props.currentUser],
  ([newUserInfo, newCurrentUser]) => {
    if (newUserInfo) {
      Object.assign(formDataSettings, newUserInfo);
    }
    if (newCurrentUser) {
      formDataSettings.name = newCurrentUser.name;
      formDataSettings.email = newCurrentUser.email;
    }
  },
  { immediate: true }
);

const instruments = ref([
  'Keyboard',
  'Guitar',
  'Drums',
  'Bass',
  'Singer',
  'DJ Controller',
]);

const formDataSettings = reactive<UserInfo>({
  name: '',
  userId: '',
  email: '',
  location: '',
  skills: '',
  instrument: '',
});

const settingsForm = ref<HTMLFormElement | null>(null);

const confirmDelete = () => {
  console.log('User deleted');
};
const handlerUserDelete = () => {
  isDelete.value = true;
};

const handlerSubmit = (): void => {
  emit('handlerSubmit', formDataSettings);
  profileNotification();
};
</script>
