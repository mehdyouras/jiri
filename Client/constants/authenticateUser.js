import gql from 'graphql-tag'

export const AUTHENTICATE_USER = gql`mutation authenticateUser($email: String!, $password: String!) {
                      authenticateUser(email: $email, password: $password){
                        id
                        token 
                      }
                  }
                `;