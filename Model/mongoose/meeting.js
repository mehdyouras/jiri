import mongoose from 'mongoose';

var Schema = mongoose.Schema;

// create a schema
var meetingSchema = new Schema({
    id: String,
    user_id: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    student_id: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    event_id: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    start_time: Date,
    end_time: Date,
    general_evaluation: Float,
}, {collection:"meetings"});

// the schema is useless so far
// we need to create a model using it
var Meeting = mongoose.model('Meeting', meetingSchema);

export default Meeting