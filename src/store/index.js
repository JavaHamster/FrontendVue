import { createStore } from 'vuex'
import auth from './modules/auth.js'
import createdPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

export default createStore({
  state: {
    lastInteraction: Date.now(),
    isInactive: false
  },
  getters: {
    lastInteraction(state){
      return new Date(state.lastInteraction).toLocaleString()
    }
  },
  mutations: {
    updateInteraction(state) {
      state.lastInteraction = Date.now()
      state.isInactive = false
    },
    setInactivity(state) {
      state.isInactive = true
    }
  },
  actions: {
    checkInactivity({ commit, state }) {
      setInterval(() => {
        if (Date.now() - state.lastInteraction > 5000) {
          commit('setInactivity')
        }
      }, 1000)
    }
  },
  modules: {
    auth
  },
  plugins: [
    createdPersistedState({
      getState: (key) => Cookies.getJSON(key),
      setState: (key, state) => Cookies.set(key, state, {expires: 3, secure: true})
    })
  ]
})
