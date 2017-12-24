import {USER} from '../constants/user.gql'
import {ALL_STUDENTS_USERS_PROJECTS} from '../constants/allStudentsUsersProjects.gql'
import {CREATE_PROJECT} from '../constants/createProject.gql'
import {ALL_PROJECTS} from '../constants/allProjects.gql'
import {apolloClient} from '../apollo'

export const actions = {
    setCurrentUser({state, commit, mutations}) {
        let id = state.currentUserId;
        apolloClient.query(
            {
                query: USER,
                variables: {
                  id
                }
            }
        ).then(data => {
          commit('currentUser', data.data.User)
        }).catch(e => {
          console.log(e)
        })
    },

    setAllDetails({state, commit, mutations}) {
        apolloClient.query({
            query: ALL_STUDENTS_USERS_PROJECTS,
            }).then((data) => {
                    commit('setAllDetails', data.data)
                    console.log(data.data.allProjects)
                }
            )
    },

    setAllProjects({state,commit}) {
        apolloClient.query({
            query: ALL_PROJECTS,
            }).then((data) => {
                    commit('setAllProjects', data.data)
                    console.log(data.data)
                }
            )
    },
}