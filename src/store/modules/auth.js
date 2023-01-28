const state = {
    isLoggedIn: false
  }
  
  const getters = {
    isLoggedIn: state => state.isLoggedIn
  }
  
  const mutations = {
    SET_LOGGED_IN(state, value) {
      state.isLoggedIn = value
    }
  }
  
  const actions = {
    login({ commit }) {
      commit('SET_LOGGED_IN', true)
    },
    logout({ commit }) {
      commit('SET_LOGGED_IN', false)
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
  }
  