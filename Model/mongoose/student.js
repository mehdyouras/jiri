import mongoose from 'mongoose';

var Schema = mongoose.Schema;

// create a schema
var studentSchema = new Schema({
    id: String,
    name: String,
    email: String,
    implementations: [{ type: Schema.Types.ObjectId, ref: 'Implementation' }],
}, {collection:"students"});

// the schema is useless so far
// we need to create a model using it
var Student = mongoose.model('Student', studentSchema);

export default Student