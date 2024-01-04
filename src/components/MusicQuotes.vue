<template>
  <v-container class="content">
      <v-row justify="center">
      <v-col cols="12" md="8">
        <blockquote class="quotes">"{{ currentQuote }}"</blockquote>
        <!-- <caption class="caption">– Jules Combarieu</caption> -->
        <!-- <v-card-text class="quote"  ref="quoteElement">
          </v-card-text> -->
      </v-col>
      <v-col cols="12" md="8" class="d-flex justify-center">
        <img src="../assets/logo/BrandLogo.svg" alt="Jammusik logo" class="icon-logo"  />
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { ref, onMounted, watch } from 'vue'

export default {
  setup() {
    const quotes = ref([
      'Music is the art of thinking with sounds.',
      'Music is the art of thinking with sounds.',
      'Music is the wine that fills the cup of silence.'
    ])
    const currentQuote = ref<string>(quotes.value[0])
    let index = 0

    const quoteElement = ref<HTMLElement | null>(null)

    const updateQuote = () => {
      index = (index + 1) % quotes.value.length
      currentQuote.value = quotes.value[index]
    }

    let intervalId: number | null = null

    onMounted(() => {
      intervalId = window.setInterval(updateQuote, 4000)
    })

    onMounted(() => {
      setInterval(updateQuote, 4000)
    })

    watch(currentQuote, () => {
      if (quoteElement.value) {
        quoteElement.value.classList.add('quote-fade')
        setTimeout(() => {
          if (quoteElement.value) {
            quoteElement.value.classList.remove('quote-fade')
          }
        }, 1000)
      }
    })

    return {
      currentQuote,
      quoteElement
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-logo {
  width: 3.5em;
}
.quote-fade {
  opacity: 0;
}

.quotes {
  font-size: 1.2em;
  text-align: center;
  font-weight: 300;
}
</style>
