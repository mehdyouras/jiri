import gql from 'graphql-tag'

export const UPDATE_SCORE = gql`mutation updateScore($id: ID!, $comment: String!, $score: Float!) {
                        updateScore(id: $id, comment: $comment, score: $score) {
                            score
                            comment
                        }
                    }
                  `;