import gql from 'graphql-tag'

export const DELETE_PROJECT = gql`mutation deleteProject($id: ID!){
                                updateProject(id: $id, softDelete: true) {
                                  id
                                }}
                `;