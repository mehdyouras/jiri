export const typeDefs = `
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
type Project {
  id: String!
  name: String
  description: String
}
type Event {
  id: String!
  course_name: String
  academic_year: String
  exam_session: Int
  user_id: [User]
}
type Meeting {
  id: String!
  user_id: [User]
  student_id: [Student]
  event_id: [Event]
  start_time: Timestamp
  end_time: Timestamp
  general_evaluation: Float
}
type Score {
  id: String!
  meeting_id: [Meeting]
  implementation_id: [Implementation]
  score: Float
  comment: String
}
type Performance {
  id: String!
  calculated_score: Float
  manual_score: Float
  event_id: [Event]
  student_id: [Student]
}
type Weight {
  id: String!
  weight: Float
  project_id: [Project]
  event_id: [Event]
}
type Query {
  user : [User]
  user(id : String) : [User]
  student: [Student]
  implementation : [Implementation]
  event: [Event]
}
`;