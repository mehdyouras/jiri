import gql from 'graphql-tag'

export const EVENT = gql`query Event($id: ID!) {
    Event(id: $id) {
        id,
        courseName,
        academicYear,
        students {
            id
            name
            email
            performance {
                id
                manualScore
                calculatedScore
            }
            globalComments {
                id
            }
            implementations {
                id
                scores {
                    id
                    score
                    comment
                    user {
                        id
                        name
                    }
                    event {
                        id
                    }
                }
                project {
                    id
                    name
                    weight {
                        id
                        weight
                        event {
                            id
                        }
                    }
                }
            }
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
        }
    }
}
                `;