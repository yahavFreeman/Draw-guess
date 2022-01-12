import Vue from 'vue'
import Vuex from 'vuex'
import {wordStore} from './word-store.js'
import {userStore} from './user-store.js'
import {canvasStore} from './canvas-store.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    wordStore,
    userStore,
    canvasStore
  }
})
