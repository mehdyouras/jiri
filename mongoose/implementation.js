import mongoose from 'mongoose';

var Schema = mongoose.Schema;

// create a schema
var implementationSchema = new Schema({
    id: String,
    project_id: { type: String, ref: 'Project' },
    student_id: { type: String, ref: 'Student' },
    url_project: String,
    url_repo: String,
    event_id: String,
}, {collection:"implementations"});

// the schema is useless so far
// we need to create a model using it
var Implementation = mongoose.model('Implementation', implementationSchema);

export default Implementation