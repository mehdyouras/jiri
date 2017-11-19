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

// Select an item from TodoList collection
// ToDo.find({item:"Gethyl"},(err,res)=>{
// 	if (err){console.log("---Gethyl not found in ToDo" + err)}
// 	else console.log("+++Gethyl fetched ==> " + res)
// })	