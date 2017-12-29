export const getters = {
    currentUserId(state){
        return state.currentUserId
    },
    isAdmin(state) {
        return state.isAdmin;
    },
    getItemsAddedToEvent(state) {
        return [state.currentAddedEvent.students, state.currentAddedEvent.users, state.currentAddedEvent.weights]
    },
    getCurrentAddedEvent(state) {
        return state.currentAddedEvent
    },
    isLoggingIn(state) {
        return state.isLoggingIn
    },
    isAppLoaded(state) {
        return state.isAppLoaded;
    },
    lastAddedId(state) {
        return state.lastAddedId
    },
    currentAddedImplementations(state) {
        return state.currentAddedImplementations
    }
}