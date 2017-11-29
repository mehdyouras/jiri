
import getProjection from './helpers/getProjection'
import getAll from './helpers/getAll'

import UserMongo from '../mongoose/user'
import StudentMongo from '../mongoose/student'
import ImplementationMongo from '../mongoose/implementation'
import EventMongo from '../mongoose/event'
import MeetingMongo from '../mongoose/meeting'
import ScoreMongo from '../mongoose/score'
import PerformanceMongo from '../mongoose/performance'
import WeightMongo from '../mongoose/weight'
import ProjectMongo from '../mongoose/project'

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
      event: (root, params, ctx, options) => {
        return getAll(EventMongo, root, params, ctx, options)
      },
    },
    Student: {
      implementations: (root, params, ctx, options) => {
        return getAll(ImplementationMongo, root, {student_id : root.id}, ctx, options)
      }
    },
    Event: {
      user_id: (root, params, ctx, options) => {
        return getAll(UserMongo, root, {id : root.user_id}, ctx, options)
      }
    }
  }