import { createStore } from 'vuex'
import getters from './getters'
import location from './modules/location.js'

export const store = createStore({
  modules: {
    location
  },
  getters
})