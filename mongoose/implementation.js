import mongoose from 'mongoose';

var Schema = mongoose.Schema;

// create a schema
var implementationSchema = new Schema({
    id: Number,
    project_id: { type: Number, ref: 'Project' },
    student_id: { type: Number, ref: 'Student' },
    url_project: String,
    url_repo: String,
    event_id: Number,
}, {collection:"implementations"});

// the schema is useless so far
// we need to create a model using it
var Implementation = mongoose.model('Implementation', implementationSchema);

export default Implementation

// Select an item from TodoList collection
// ToDo.find({item:"Gethyl"},(err,res)=>{
// 	if (err){console.log("---Gethyl not found in ToDo" + err)}
// 	else console.log("+++Gethyl fetched ==> " + res)
// })	