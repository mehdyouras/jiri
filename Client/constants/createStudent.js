import gql from 'graphql-tag'

export const CREATE_STUDENT = gql`mutation createStudent($email: String!, $name: String!) {
                        createStudent(email: $email, name: $name) {
                            id
                            email
                            name
                            performance {
                                id
                            }
                            implementations {
                                id
                            }
                        }
                    }
                  `;