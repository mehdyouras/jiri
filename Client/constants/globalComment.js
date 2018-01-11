import gql from 'graphql-tag'

export const GLOBAL_COMMENT = gql`query allGlobalComments($studentId: ID!, $userId: ID!){
    allGlobalComments(filter: {student: {id: $studentId}, user: {id: $userId}, softDelete_not: true}, ) {
        id,
        globalComment
    }
}`;