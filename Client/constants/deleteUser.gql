import gql from 'graphql-tag'

export const DELETE_USER = gql`mutation deleteUser($id: ID!){
                                updateUser(id: $id, softDelete: true) {
                                  id
                                }}
                `;