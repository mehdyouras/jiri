import _ from 'lodash'

export const mutations = {

    // Current User logged in

    setBasicDetails(state, payload) {
        let {id, isAdmin} = payload

        state.currentUserId = id;
        state.isAdmin = isAdmin;
    },

    currentUserId(state, payload) {
        state.currentUserId = payload;
    },

    setIsAdmin(state, payload) {
        state.isAdmin = payload;
    },


    // Current added event

        // ADD

    addStudentToEvent(state, payload) {
        state.currentAddedEvent.students.push(payload)
    },

    addUserToEvent(state, payload) {
        state.currentAddedEvent.users.push(payload)
    },

    addProjectToEvent(state, payload) {
        state.currentAddedEvent.weights.push(payload)
    },

    addInfosToEvent(state, payload){
        state.currentAddedEvent.course = payload.course;
        state.currentAddedEvent.year = payload.year;
        state.currentAddedEvent.session = payload.session;
    },

    setEventItem(state, payload) {
        state.currentAddedEvent.students = payload.students
        state.currentAddedEvent.weights = payload.weights
        state.currentAddedEvent.users = payload.users
    },
    
        // DELETE

    deleteStudentFromEvent(state, payload) {
        _.remove(state.currentAddedEvent.students, (id) => id === payload)
    },

    deleteUserFromEvent(state, payload) {
        _.remove(state.currentAddedEvent.users, (id) => id === payload)
    },

    deleteProjectFromEvent(state, payload) {
        _.remove(state.currentAddedEvent.weights, (id) => id === payload)
    },

    ///////////

    isLoggingIn(state) {
        state.isLoggingIn = true;
    },

    isNotLoggingIn(state) {
        state.isLoggingIn = false;
    },

    appIsLoaded(state) {
        state.isAppLoaded = true;
    },

    lastAddedId(state, payload) {
        state.lastAddedId = payload;
    },

    currentAddedImplementations(state, payload) {
        let index = _.findIndex(state.currentAddedImplementations, implementation => {
            return implementation.projectId === payload.projectId
        });
        if(index === -1) {
            state.currentAddedImplementations.push(payload)
        } else {
            state.currentAddedImplementations[index] = payload;
        }
    }
}