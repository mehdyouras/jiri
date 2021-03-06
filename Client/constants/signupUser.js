import gql from 'graphql-tag'

export const SIGNUP_USER = gql`mutation signupUser($email: String!, $password: String!, $name: String!, $company: String!, $isAdmin: Boolean!) {
                        signupUser(email: $email, password: $password, name: $name, company: $company, isAdmin: $isAdmin) {
                            id
                            email
                            name
                            company
                            isAdmin
                            token
                        }
                    }
                  `;