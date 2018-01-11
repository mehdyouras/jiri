import gql from 'graphql-tag'

export const DELETE_EVENT = gql`mutation deleteEvent($id: ID!){
                                updateEvent(id: $id, softDelete: true) {
                                  id
                                }}
                `;