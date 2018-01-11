import gql from 'graphql-tag'

export const UPDATE_PROJECT = gql`mutation updateProject($id: ID!, $name: String!, $description: String!, $weightId: ID!, $weight: Float!) {
                        updateProject(id: $id, description: $description, name: $name) {
                            id
                        }
                        updateWeight(id: $weightId, weight: $weight) {
                            id
                        }
                    }
                  `;