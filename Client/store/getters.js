export const getters = {
    currentUserId(state){
        return state.currentUserId
    },
    currentUser(state) {
        return state.currentUser
    },
    getAllDetails(state) {
        return state.allDetails;
    },
    getItemsAddedToEvent(state) {
        return [state.currentAddedEvent.students, state.currentAddedEvent.users, state.currentAddedEvent.projects]
    }
}