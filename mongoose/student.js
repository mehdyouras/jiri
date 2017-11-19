import mongoose from 'mongoose';

var Schema = mongoose.Schema;

// create a schema
var studentSchema = new Schema({
    id: Number,
    name: String,
    email: String,
    implementations: [{ type: Schema.Types.ObjectId, ref: 'Implementation' }],
}, {collection:"students"});

// the schema is useless so far
// we need to create a model using it
var Student = mongoose.model('Student', studentSchema);

export default Student

// Select an item from TodoList collection
// ToDo.find({item:"Gethyl"},(err,res)=>{
// 	if (err){console.log("---Gethyl not found in ToDo" + err)}
// 	else console.log("+++Gethyl fetched ==> " + res)
// })	