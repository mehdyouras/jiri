import mongoose from 'mongoose';

var Schema = mongoose.Schema;

// create a schema
var eventSchema = new Schema({
    id: String,
    course_name: String,
    academic_year: String,
    exam_session: Number,
    user_id: { type: String, ref: 'User' },
}, {collection:"event"});

// the schema is useless so far
// we need to create a model using it
var Event = mongoose.model('Event', eventSchema);

export default Event