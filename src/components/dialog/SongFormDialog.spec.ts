import { shallowMount } from '@vue/test-utils'
import { test, expect, describe } from 'vitest'
import vuetify from '../../plugins/vuetify'
import SongFormDialog from './SongFormDialog.vue'

global.ResizeObserver = require('resize-observer-polyfill')

describe('testing the song form dialog component', () => {
  test('rendering the song form dialog component', () => {
    const wrapper = shallowMount(SongFormDialog, {
      global: {
        components: {
          SongFormDialog
        },
        plugins: [vuetify]
      }
    })
    expect(wrapper.find('[data-test="song-form-dialgo"]').exists()).toBe(true)
  })

  test('testing the playlist form dialog UI', () => {
    const wrapper = shallowMount(SongFormDialog, {
      global: {
        components: {
          SongFormDialog
        },
        plugins: [vuetify]
      }
    })
    expect(wrapper.text()).toMatchSnapshot()
  })
})
