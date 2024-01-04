<template>
  <TheGreenBorder />
  <TheToggleMenu2 />
  <v-row class="mt-5">
    <div class="d-flex flex-column w-100 mt-10 justify-center align-center">
      <UseAvatar :userName="userName" />
    </div>
    <v-container class="mt-10">
      <p class="text-subtitle-2 font-weight-bold">General Information:</p>
    </v-container>
    <ProfileForm
      :currentUser="currentUser"
      :userId="userId"
      @handlerSubmit="updateUserProfile"
      :userInfo="userInfo"
    />
    <TheFooter />
  </v-row>
</template>

<script setup lang="ts">
import ProfileForm from '../components/forms/ProfileForm.vue';
import UseAvatar from '../components/UserAvatar.vue';
import { getAuth } from 'firebase/auth';
import { inject, onMounted, ref } from 'vue';
import { userServiceKey } from '../services/userService'; // Asegúrate de importar el servicio desde la ubicación correcta
import type { UserInfo } from '../types/formTypes';

const userService = inject(userServiceKey)!;
const currentUser = ref();
const auth = getAuth();
const userId = auth.currentUser?.uid as string;
const userInfo = ref();
const userName = ref<string>('');

onMounted(async () => {
  if (userId) {
    currentUser.value = await userService.getCurrentUser(userId);
    userName.value = currentUser.value?.name;
    userInfo.value = await userService.getCurrentUserInfo(userId);
  }
});

const updateUserProfile = async (userInfo: UserInfo) => {
  const { name, email, location, skills, instrument } = userInfo;

  try {
    await userService.setCurrentUserInfo(
      userId,
      name,
      email,
      location as string,
      skills as string,
      instrument as string
    );
    console.log('Profile updated successfuly');
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};
</script>
<style scoped lang="scss">
.title {
  color: red;
}
</style>
