import gql from 'graphql-tag'

export const CREATE_SCORE = gql`mutation createScore($implementationId: ID!, $studentId: ID!, $userId: ID!, $comment: String!, $score: Float!, $eventId: ID!) {
                        createScore(userId: $userId, studentId: $studentId, implementationId: $implementationId, comment: $comment, score: $score, eventId: $eventId) {
                            id
                            score
                            comment
                        }
                    }
                  `;