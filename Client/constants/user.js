import gql from 'graphql-tag'

export const USER = gql`query User($id: ID!) {
    User(id: $id) {
        id,
        email,
        name,
        company,
        isAdmin,
        juryTo {
            id
            courseName
            academicYear
            examSession
            students {
                id
                name
                email
                softDelete
            },
            softDelete
        }
        events {
            id,
            courseName,
            academicYear,
            students {
                id
                name
                email
                softDelete
            },
            jurys{
                id
                name
                email
                company
                softDelete
            },
            examSession,
            weights {
                id
                weight
                project {
                    id
                    name
                }
                softDelete
            }
            softDelete
        }
        scores {
            id
            score
            comment
            event {
                id
            }
            student {
                id
                softDelete
            }
            implementation {
                id 
                project {
                    id 
                    name
                }
            }
            softDelete
        }
    }
}
                `;