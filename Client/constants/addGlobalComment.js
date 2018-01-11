import gql from 'graphql-tag'

export const ADD_GLOBAL_COMMENT = gql`mutation addGlobalComment($id: ID!, $userId: ID!, $studentId: ID!, $globalComment: String!) {
                        updateOrCreateGlobalComment(
                            update: {id: $id, userId: $userId, studentId: $studentId, globalComment: $globalComment},
                            create: {userId: $userId, studentId: $studentId, globalComment: $globalComment}) {
                            id
                        }
                    }
                  `;