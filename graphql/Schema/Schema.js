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
    id: String!
    project_id: String
    student_id: String
    url_project: String
    url_repo: String
    event_id: Int!
  }
  type User {
    id: String!
    is_admin: Boolean!
    name: String
    email: String
    password: String
    company: String
  }
  type Student {
    id: String!
    name: String
    email: String
    implementations: [Implementation]
  }
  type Query {
    user : [User]
    user(id : String) : [User]
    student: [Student]
    implementation : [Implementation]
  }
`;

const resolvers = {
  Query: {
    user: (root, params, ctx, options) => {
      let projection = getProjection(options);
  
      let items = UserMongo
        .find(params)
        .select(projection)
        .exec();

      return items;
    },
    student: (root, params, ctx, options) => {
      let projection = getProjection(options);
  
      return StudentMongo
        .find(params)
        .select(projection)
        .exec();
    },
    implementation: (root, params, ctx, options) => {
      let projection = getProjection(options);
  
      return ImplementationMongo
        .find(params)
        .select(projection)
        .exec();
    },
  },
  Student: {
    implementations: (root, params, ctx, options) => {
      let projection = getProjection(options);
      
          return ImplementationMongo
            .find({student_id : root.id})
            .select(projection)
            .exec();
    }
  }
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

