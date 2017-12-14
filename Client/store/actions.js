import {USER} from '../constants/user.gql'
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
    }
}