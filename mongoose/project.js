import mongoose from 'mongoose';

var Schema = mongoose.Schema;

// create a schema
var projectSchema = new Schema({
    id: String,
    name: String
}, {collection:"projects"});

// the schema is useless so far
// we need to create a model using it
var Project = mongoose.model('Project', projectSchema);

export default Project