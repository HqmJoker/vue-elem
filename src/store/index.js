import { createStore } from 'vuex'
import getters from './getters'
import location from './modules/location.js'
import user from './modules/user.js'

export const store = createStore({
  modules: {
    location,
    user
  },
  getters
})