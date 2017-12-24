import _ from 'lodash'

export const mutations = {

    // Current User logged in

    currentUserId(state, payload) {
        state.currentUserId = payload;
    },
    currentUser(state, payload) {
        state.currentUser = payload;
    },


    // Current Loaded Items

    setAllDetails(state, payload) {
        state.allDetails = payload;
    },

    setAllProjects(state, payload) {
        state.allDetails.allProjects = payload;
    },

    addStudentToEvent(state, payload) {
        state.currentAddedEvent.students.push(payload)
    },

    addUserToEvent(state, payload) {
        state.currentAddedEvent.users.push(payload)
    },

    addProjectToEvent(state, payload) {
        state.currentAddedEvent.projects.push(payload)
    },

    deleteStudentFromEvent(state, payload) {
        _.remove(state.currentAddedEvent.students, (id) => id === payload)
    },

    deleteUserFromEvent(state, payload) {
        _.remove(state.currentAddedEvent.users, (id) => id === payload)
    },

    deleteProjectFromEvent(state, payload) {
        _.remove(state.currentAddedEvent.projects, (id) => id === payload)
    },
}