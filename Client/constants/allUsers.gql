import gql from 'graphql-tag'

export const ALL_USERS = gql`query allUsers{
    allUsers(orderBy: name_ASC, filter: {softDelete_not: true}) {
        id,
        email,
        name,
        company,
        isAdmin,
        events {
            id
        },
    }
}`;