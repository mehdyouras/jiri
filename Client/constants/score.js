import gql from 'graphql-tag'

export const SCORE = gql`query Score($id: ID!) {
    Score(id: $id) {
        id
        score
        comment
        user {
            id
        }
        implementation {
            id 
            project {
                id 
                name
            }
        }
    }
}
                `;