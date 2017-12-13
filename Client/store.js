import Vue from 'vue'
import Vuex from 'vuex'
import { getters } from './store/getters.js'
import { mutations } from './store/mutations.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        currentUser: '',
    },
    getters,
    mutations,
})