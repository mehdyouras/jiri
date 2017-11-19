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

  import {getProjection} from '../Schema'

  import {implementationType} from './implementation'
  import ImplementationMongo from '../../../mongoose/implementation'

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
      },
      implementations: {
        type: new GraphQLList(implementationType),
        description: 'The student\'s implementations',
        resolve: (root, args, context, fieldASTs) => {
        var projections = getProjection(fieldASTs);
        let foundItems = new Promise((resolve, reject) => {
          ImplementationMongo.find({project_id: root.id}, projections,(err, implementations) => {
              err ? reject(err) : resolve(implementations)
          })
          return foundItems;
      })}
      }
    })
  });