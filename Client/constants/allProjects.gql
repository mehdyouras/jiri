import gql from 'graphql-tag'

export const ALL_PROJECTS = gql`query allProjects{
    allProjects(orderBy: name_ASC, filter: {softDelete_not: true}) {
        id,
        name,
        description,
        weight {
            id
            weight
        }
        implementations {
            id
            urlRepo
            urlProject
            student {
                id
            }
            project {
                id
            }
        }
    }
}`;