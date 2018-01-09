import gql from 'graphql-tag'

export const ALL_GLOBAL_COMMENTS = gql`query allGlobalComments{
    allGlobalComments(filter: {softDelete_not: true}) {
        id,
        globalComment
        user {
            id
        }
        student {
            id
        }
    }
}`;