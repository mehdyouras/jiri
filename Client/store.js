import Vue from 'vue'
import Vuex from 'vuex'
import { getters } from './store/getters.js'
import { mutations } from './store/mutations.js'
import {actions} from './store/actions.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        currentUserId: '',
        currentUser: {},
        allDetails: {},
        currentAddedEvent: {
            course: '',
            year: '',
            session: '',
            projects:[],
            users: [],
            students: [],
        },
        currentLoadedItems: [],
        projects: [], 
    },
    getters,
    mutations,
    actions,
})