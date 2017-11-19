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

export const studentType = new GraphQLObjectType({
    name: 'student',
    description: 'Student',
    fields: () => ({
        id: {
            type: GraphQLID,
            description: 'ID',
        },
        type: {
            type: GraphQLString,
            description: 'Type',
        },
      name: {
        type: GraphQLString,
        description: 'The name of the student',
      },
      email: {
        type: GraphQLString,
        description: 'The email of the student',
      }
    })
  });