import gql from 'graphql-tag'

export const ALL_STUDENTS_USERS_PROJECTS = gql`query allStudentsUsersProjects{
    allStudents(orderBy: name_ASC, filter: {softDelete_not: true}) {
        id,
        email,
        name,
        event {
            id
        },
        implementations {
            id
        },
        performance {
            id
        },
    }
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
    allProjects(orderBy: name_ASC, filter: {softDelete_not: true}) {
        id,
        name,
        description,
        weight {
            id
        }
    }
}`;