import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql/type';

import UserMongo from '../../mongoose/user'
import {userType} from './objectsType/user'

import {studentType} from './objectsType/student'
import StudentMongo from '../../mongoose/student'

import {implementationType} from './objectsType/implementation'
import ImplementationMongo from '../../mongoose/implementation'

/**
 * generate projection object for mongoose
 * @param  {Object} fieldASTs
 * @return {Project}
 */
export function getProjection (fieldASTs) {
  return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
    projections[selection.name.value] = true;
    return projections;
  }, {});
}

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      user: {
        type: new GraphQLList(userType),
        resolve: (root, {}, source, fieldASTs) => {
          var projections = getProjection(fieldASTs);
          var foundItems = new Promise((resolve, reject) => {
              UserMongo.find({type: 'user'}, projections,(err, users) => {
                  err ? reject(err) : resolve(users)
              })
          })

          return foundItems
        }
      },
      student: {
        type: new GraphQLList(studentType),
        resolve: (root, {}, source, fieldASTs) => {
          var projections = getProjection(fieldASTs);
          var foundItems = new Promise((resolve, reject) => {
              StudentMongo.find({type: 'student'}, projections,(err, students) => {
                  err ? reject(err) : resolve(students)
              })
          })

          return foundItems
        }
      },
      implementation: {
        type: new GraphQLList(implementationType),
        resolve: (root, {}, source, fieldASTs) => {
          var projections = getProjection(fieldASTs);
          var foundItems = new Promise((resolve, reject) => {
              ImplementationMongo.find({type: 'implementation'}, projections,(err, implementations) => {
                  err ? reject(err) : resolve(implementations)
              })
          })

          return foundItems
        }
      }
    }
  })
  
});

export default schema;

