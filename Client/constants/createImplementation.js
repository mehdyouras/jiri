import gql from 'graphql-tag'

export const CREATE_IMPLEMENTATION = gql`mutation createImplementation($urlRepo: String!, $urlProject: String!, $projectId: ID!, $studentId: ID!) {
                        createImplementation(urlRepo: $urlRepo, urlProject: $urlProject, projectId: $projectId, studentId: $studentId) {
                            id
                            urlRepo
                            urlProject
                            project {
                                id
                                name
                                description
                            }
                            student {
                                id
                                name
                                email
                            }
                        }
                    }
                  `;