import gql from 'graphql-tag'

export const STUDENTS_MET = gql`query StudentsMet($id: ID!) {
    allStudents(filter: {scores_some: {user: {id: $id}}, softDelete_not: true}) {
        id,
        email,
        name,
        implementations {
            id
            scores {
                id
                score
                comment
                user {
                    id
                }
            }
        }
    }
}
                `;