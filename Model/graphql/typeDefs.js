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
  id: String
  name: String
}
type Event {
  id: String
  course_name: String
  academic_year: String
  exam_session: Int
  user_id: String
}
type Query {
  user : [User]
  user(id : String) : [User]
  student: [Student]
  implementation : [Implementation]
  implementations(student_id : String) : [Implementation]
}
`;