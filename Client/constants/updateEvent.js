import gql from 'graphql-tag'

export const UPDATE_EVENT = gql`mutation updateEvent($id: ID!,$year: String!, $course: String!, $session: String!, $currentUserId: ID!, $users: [ID!], $students: [ID!], $weights: [ID!]) {
                        updateEvent(id: $id,
                                    academicYear: $year, 
                                    courseName: $course, 
                                    examSession: $session,
                                    userId: $currentUserId, 
                                    jurysIds: $users, 
                                    studentsIds: $students,
                                    weightsIds: $weights,
                                ) 
                            {
                            id,
                        }
                    }
                  `;