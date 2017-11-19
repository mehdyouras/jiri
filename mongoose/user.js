import mongoose from 'mongoose';

var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    id: String,
    is_admin : Boolean,
    name: String,
    email: String,
    password: String,
    company: String,
}, {collection:"users"});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

export default User

// Select an item from TodoList collection
// ToDo.find({item:"Gethyl"},(err,res)=>{
// 	if (err){console.log("---Gethyl not found in ToDo" + err)}
// 	else console.log("+++Gethyl fetched ==> " + res)
// })	