export const mutations = {

    // Current User logged in

    currentUserId(state, payload) {
        state.currentUserId = payload;
    },
    currentUser(state, payload) {
        state.currentUser = payload;
    },


    // Current Loaded Items

    setCurrentLoadedItems(state, payload) {
        state.currentLoadedItems = payload;
    },

    pushInCurrentLoadedItems(state, payload) {
        Object.isExtensible(state.currentLoadedItems);
        state.currentLoadedItems.push(payload);
    },

    setAllDetails(state, payload) {
        state.allDetails = payload;
    },

    setAllProjects(state, payload) {
        state.allDetails.allProjects = payload;
    }
}