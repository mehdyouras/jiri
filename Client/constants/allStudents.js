import gql from 'graphql-tag'

export const ALL_STUDENTS = gql`query allStudents{
    allStudents(orderBy: name_ASC, filter: {softDelete_not: true}) {
        id,
        email,
        name,
        event {
            id
            softDelete
        },
        implementations {
            id
            scores {
                id
                user {
                    id
                }
            }
        },
        performance {
            id
        },
    }
}`;