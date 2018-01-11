import gql from 'graphql-tag'

export const CREATE_EVENT = gql`mutation createEvent($year: String!, $course: String!, $session: String!, $currentUserId: ID!, $users: [ID!], $students: [ID!], $weights: [ID!]) {
                        createEvent(academicYear: $year, 
                                    courseName: $course, 
                                    examSession: $session,
                                    userId: $currentUserId, 
                                    jurysIds: $users, 
                                    studentsIds: $students,
                                    weightsIds: $weights,
                                    performancesIds: [],
                                    meetingsIds: [], 
                                ) 
                            {
                            id,
                            courseName,
                            academicYear,
                            students {
                                id
                                name
                                email
                            },
                            jurys{
                                id
                                name
                                email
                                company
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