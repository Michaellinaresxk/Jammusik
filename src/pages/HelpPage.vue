<template>
  <div class="help-warpper" data-test="help-page">
    <TheGreenBorder />
    <v-row class="d-flex justify-space-between mt-1">
      <v-tabs class="tabs" v-model="tab" align-tabs="center">
        <v-tab :value="helpAboutTexts" slider-color="secondary">About us</v-tab>
        <v-tab :value="text2" slider-color="secondary">Guide</v-tab>
        <v-tab :value="3" slider-color="secondary">FAQS</v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item :value="helpAboutTexts">
          <v-row>
            <v-container tag="div" class="mt-8">
              <BrandLogo />
            </v-container>
            <v-container tag="div" class="text-body-1">
              {{ helpAboutTexts.aboutIntroduction }}
            </v-container>
            <v-container tag="div" class="text-subtitle-1 font-weight-bold">
              {{ helpAboutTexts.aboutPoint1 }}
              <v-container tag="div" class="text-body-1">
                {{ helpAboutTexts.aboutPoint1Content }}
              </v-container>
            </v-container>
            <v-container tag="div" class="text-subtitle-1 font-weight-bold">
              {{ helpAboutTexts.aboutPoint2 }}
              <v-container tag="div" class="text-body-1">
                {{ helpAboutTexts.aboutPoint2Content }}
              </v-container>
            </v-container>
            <v-container tag="div" class="text-subtitle-1 font-weight-bold">
              {{ helpAboutTexts.aboutPoint3 }}
              <v-container tag="div" class="text-body-1">
                {{ helpAboutTexts.aboutPoint3Content }}
              </v-container>
            </v-container>
            <v-container tag="div" class="text-subtitle-1 font-weight-bold">
              {{ helpAboutTexts.aboutPoint4 }}
              <v-container tag="div" class="text-body-1">
                {{ helpAboutTexts.aboutPoint4Content }}
              </v-container>
            </v-container>
            <v-container tag="div" class="text-body-1 mb-14">
              {{ helpAboutTexts.aboutFinal }}
            </v-container>
          </v-row>
        </v-window-item>
      </v-window>
      <v-window v-model="tab" class="mt-10">
        <v-window-item :value="text2">
          {{ text2 }}
          <v-container tag="div" class="mt-10">
            <BrandLogo />
          </v-container>
        </v-window-item>
      </v-window>

      <v-window v-model="tab" class="mt-8">
        <v-window-item :value="3">
          <div>
            <div class="title text-h4 mt-5 font-weight-bold">
              Frequently asked questions
            </div>
            <div class="text-subtitle-2 mb-2 mt-5">
              Need help with something? Here are the most asked questions
            </div>
            <v-expansion-panels variant="accordion" class="mt-5 mb-14">
              <v-expansion-panel
                v-for="faq in helpFAQTexts"
                :key="faq.id"
                elevation-1
              >
                <v-expansion-panel-title color="secondaryColor">
                  {{ faq.question }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  {{ faq.answer }}
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
          <v-container tag="div" class="mt-10">
            <BrandLogo />
          </v-container>
        </v-window-item>
      </v-window>
    </v-row>
    <TheToggleMenu2 class="toggle-menu" />
    <TheFooter />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import TheToggleMenu2 from '@/components/base/TheToggleMenu2.vue';
import TheGreenBorder from '@/components/base/TheGreenBorder.vue';
import TheFooter from '../../components/base/TheFooter.vue';
import { helpAboutTexts } from '../utils/data/helpAboutTexts';
import { helpFAQTexts } from '../utils/data/helpFAQTexts';
import BrandLogo from '@/components/BrandLogo.vue';

const tab = ref(null);
const text2 =
  'aqui te mostramos la guia que necesitas para entender esta aplicación';
</script>
<style lang="scss" scoped>
.toggle-menu {
  z-index: 1;
}
.help-warpper {
  min-height: 100vh;
}
.tabs {
  margin-top: 5em;
}
</style>
