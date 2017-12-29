import gql from 'graphql-tag'

export const UPDATE_USER = gql`mutation updateUser($id: ID!, $email: String!,  $company: String!, $isAdmin: Boolean!) {
                        updateUser(id: $id, email: $email, company: $company, isAdmin: $isAdmin) {
                            id
                        }
                    }
                  `;

export const UPDATE_USER_PASSWORD = gql`mutation updateUser($id: ID!, $password: String!) {
                        updateUser(id: $id, password: $password) {
                            id
                        }
                    }
                  `;