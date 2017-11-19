import { makeExecutableSchema } from 'graphql-tools';
import getProjection from './getProjection'

import UserMongo from '../../mongoose/user'
import StudentMongo from '../../mongoose/student'
import ImplementationMongo from '../../mongoose/implementation'

import {typeDefs} from './typeDefs'
import {resolvers} from './resolvers'
  
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;

