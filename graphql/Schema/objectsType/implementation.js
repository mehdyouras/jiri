import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLID
  } from 'graphql/type';

export const implementationType = new GraphQLObjectType({
    name: 'implementation',
    description: 'Implementation',
    fields: () => ({
        id: {
            type: GraphQLID,
        },
        project_id: {
            type: GraphQLID,
            description: 'Project ID',
        },
        student_id: {
            type: GraphQLID,
            description: 'Student ID',
        },
        type: {
            type: GraphQLString,
            description: 'Type',
        },
        url_project: {
            type: GraphQLString,
            description: 'Project URL',
        },
        url_repo: {
            type: GraphQLString,
            description: 'Repo URL',
        },
        event_id: {
            type: GraphQLID,
            description: 'Event ID',
        },
    })
  });