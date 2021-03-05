import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import github from './modules/github'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    github,
  }
})
