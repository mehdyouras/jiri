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
import {userType} from './user'

import {studentType} from './student'
import StudentMongo from '../../mongoose/student'

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
      }
    }
  })
  
});

export default schema;

