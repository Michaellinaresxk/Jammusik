import { shallowMount } from '@vue/test-utils'
import { test, expect, describe } from 'vitest'
import vuetify from '../../plugins/vuetify'
import PlaylistFormDialog from './PlaylistFormDialog.vue'

global.ResizeObserver = require('resize-observer-polyfill')

describe('testing the playlist form dialog component', () => {
  test('rendering the playlist form dialog component', () => {
    const wrapper = shallowMount(PlaylistFormDialog, {
      global: {
        components: {
          PlaylistFormDialog
        },
        plugins: [vuetify]
      }
    })
    expect(wrapper.find('[data-test="playlist-form-dialog"]').exists()).toBe(true)
  })

  test('testing the playlist form dialog UI', () => {
    const wrapper = shallowMount(PlaylistFormDialog, {
      global: {
        components: {
          PlaylistFormDialog
        },
        plugins: [vuetify]
      }
    })
    expect(wrapper.text()).toMatchSnapshot()
  })
})
