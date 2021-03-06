import gql from 'graphql-tag'

export const CREATE_PROJECT = gql`mutation createProject($name: String!, $description: String!, $weight: Float!) {
                        createProject(name: $name, description: $description, weight: {weight: $weight}) {
                            id
                            name
                            description
                            weight {
                                weight
                            }
                        }
                    }
                  `;