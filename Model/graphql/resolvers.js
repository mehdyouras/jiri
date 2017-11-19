import getProjection from './helpers/getProjection'
import getAll from './helpers/getAll'

import UserMongo from '../mongoose/user'
import StudentMongo from '../mongoose/student'
import ImplementationMongo from '../mongoose/implementation'

export const resolvers = {
    Query: {
      user: (root, params, ctx, options) => {
        return getAll(UserMongo, root, params, ctx, options)
      },
      student: (root, params, ctx, options) => {
        return getAll(StudentMongo, root, params, ctx, options)
      },
      implementation: (root, params, ctx, options) => {
        return getAll(ImplementationMongo, root, params, ctx, options)
      },
    },
    Student: {
      implementations: (root, params, ctx, options) => {
        return getAll(ImplementationMongo, root, {student_id : root.id}, ctx, options)
      }
    }
  }