import Vue from 'vue'
import Vuex from 'vuex'
import { getters } from './store/getters.js'
import { mutations } from './store/mutations.js'
import {actions} from './store/actions.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        isAppLoaded: false,
        currentUserId: '',
        isAdmin: false,
        currentAddedEvent: {
            course: '',
            year: '',
            session: '',
            weights:[],
            users: [],
            students: [],
        },
        isLoggingIn: false,
    },
    getters,
    mutations,
    actions,
})