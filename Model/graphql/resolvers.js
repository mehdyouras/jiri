
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
      meeting: (root, params, ctx, options) => {
        return getAll(MeetingMongo, root, params, ctx, options)
      },
      score: (root, params, ctx, options) => {
        return getAll(ScoreMongo, root, params, ctx, options)
      },
      performance: (root, params, ctx, options) => {
        return getAll(PerformanceMongo, root, params, ctx, options)
      },
      weight: (root, params, ctx, options) => {
        return getAll(WeightMongo, root, params, ctx, options)
      },
      project: (root, params, ctx, options) => {
        return getAll(ProjectMongo, root, params, ctx, options)
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
    },
    Meeting: {
      student_id: (root, params, ctx, options) => {
        return getAll(StudentMongo, root, {id : root.student_id}, ctx, options)
      },
      user_id: (root, params, ctx, options) => {
        return getAll(UserMongo, root, {id : root.user_id}, ctx, options)
      },
      event_id: (root, params, ctx, options) => {
        return getAll(EventMongo, root, {id : root.event_id}, ctx, options)
      }
    },
    Score: {
      meeting_id: (root, params, ctx, options) => {
        return getAll(MeetingMongo, root, {id : root.meeting_id}, ctx, options)
      },
      implementation_id: (root, params, ctx, options) => {
        return getAll(ImplementationMongo, root, {id : root.implementation_id}, ctx, options)
      },
    },
    Performance: {
      event_id: (root, params, ctx, options) => {
        return getAll(EventMongo, root, {id : root.event_id}, ctx, options)
      },
      student_id: (root, params, ctx, options) => {
        return getAll(StudentMongo, root, {id : root.student_id}, ctx, options)
      },
    },
    Weight: {
      project_id: (root, params, ctx, options) => {
        return getAll(ProjectMongo, root, {id : root.project_id}, ctx, options)
      },
      event_id: (root, params, ctx, options) => {
        return getAll(EventMongo, root, {id : root.event_id}, ctx, options)
      },
    },
  }