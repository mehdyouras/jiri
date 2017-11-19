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
import getProjection from './getProjection'

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
    id: String
    is_admin: Boolean!
    name: String
    email: String
    password: String
    company: String
  }
  type Student {
    id: String
    name: String
    email: String
    implementations: [Implementation]
  }
  type Query {
    user : [User]
    student: Student
    implementation : Implementation
  }
`;

const resolvers = {
  Query: {
    user: (root, params, ctx, options) => {
      let projection = getProjection(options);
  
      return UserMongo
        .find()
        .select(projection)
        .exec();
    },
    student: (root, params, ctx, options) => {
      let projection = getProjection(options);
  
      return StudentMongo
        .find()
        .select(projection)
        .exec();
    },
    implementation: (root, args, context, fieldASTs) => {
      let projections = getProjection(fieldASTs);
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

const users = [
  { id: 1, is_admin: 1,name: 'Tom', email: 'Coleman', password: 'test',company: 'HEPL' },
];

export default schema;

