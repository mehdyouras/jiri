import gql from 'graphql-tag'

export const ADD_STUDENT_TO_EVENT = gql`mutation updateStudent($studentId: ID!, $eventId: ID!) {
                        updateStudent(id: $studentId, eventId: $eventId) {
                            id
                        }
                    }
                  `;