import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql/type';

import { makeExecutableSchema } from 'graphql-tools';

import UserMongo from '../../mongoose/user'
import {userType} from './objectsType/user'

import {studentType} from './objectsType/student'
import StudentMongo from '../../mongoose/student'

import {implementationType} from './objectsType/implementation'
import ImplementationMongo from '../../mongoose/implementation'

const typeDefs = `
  type Implementation {
    id: Int!
    project_id: Int!
    student_id: Int!
    url_project: String
    url_repo: String
    event_id: Int!
  }
  type User {
    id: Int!
    is_admin: Boolean!
    name: String
    email: String
    password: String
    company: String
  }
  type Student {
    id: Int!
    name: String
    email: String
    implementations: [Implementation]
  }
  type Query {
    user : User
    student: Student
    implementation : Implementation
  }
`;

const resolvers = {
  Query: {
    user: (root, args, context, fieldASTs) => {
      var projections = getProjection(fieldASTs);
      let foundItems = new Promise((resolve, reject) => {
        UserMongo.find(args, projections,(err, users) => {
            err ? reject(err) : resolve(users)
        })
        return foundItems;
    })},
    student: (root, args, context, fieldASTs) => {
      var projections = getProjection(fieldASTs);
      let foundItems = new Promise((resolve, reject) => {
        StudentMongo.find(args, projections,(err, students) => {
            err ? reject(err) : resolve(students)
        })
        return foundItems;
    })},
    implementation: (root, args, context, fieldASTs) => {
      var projections = getProjection(fieldASTs);
      let foundItems = new Promise((resolve, reject) => {
        ImplementationMongo.find(args, projections,(err, implementations) => {
            err ? reject(err) : resolve(implementations)
        })
        return foundItems;
    })},
  },
  // Author: {
  //   posts: (author) => filter(posts, { authorId: author.id }),
  // },
  // Post: {
  //   author: (post) => find(authors, { id: post.authorId }),
  // },
}
  
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

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

// var schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: {
//       user: {
//         type: new GraphQLList(userType),
//         resolve: (root, {}, source, fieldASTs) => {
//           var projections = getProjection(fieldASTs);
//           var foundItems = new Promise((resolve, reject) => {
//               UserMongo.find({type: 'user'}, projections,(err, users) => {
//                   err ? reject(err) : resolve(users)
//               })
//           })

//           return foundItems
//         }
//       },
//       student: {
//         type: new GraphQLList(studentType),
//         resolve: (root, {}, source, fieldASTs) => {
//           var projections = getProjection(fieldASTs);
//           var foundItems = new Promise((resolve, reject) => {
//               StudentMongo.find({type: 'student'}, projections,(err, students) => {
//                   err ? reject(err) : resolve(students)
//               })
//           })

//           return foundItems
//         }
//       },
//       implementation: {
//         type: new GraphQLList(implementationType),
//         resolve: (root, {}, source, fieldASTs) => {
//           var projections = getProjection(fieldASTs);
//           var foundItems = new Promise((resolve, reject) => {
//               ImplementationMongo.find({type: 'implementation'}, projections,(err, implementations) => {
//                   err ? reject(err) : resolve(implementations)
//               })
//           })

//           return foundItems
//         }
//       }
//     }
//   })
  
// });

export default schema;

