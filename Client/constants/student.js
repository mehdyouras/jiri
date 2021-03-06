import gql from 'graphql-tag'

export const STUDENT = gql`query Student($id: ID!) {
    Student(id: $id) {
        id,
        email,
        name,
        event {
            id
            softDelete
            weights{
                id
                project {
                    id
                    name
                }
            }
        }
        implementations {
            id
            project {
                id
                name
                description
                weight {
                    id
                    event {
                        id
                    }
                }
            }
            scores {
                id
                score
                comment
                user {
                    id
                }
            }
            urlProject
            urlRepo
        }
        performance {
            id
        }
        softDelete
    }
}
                `;