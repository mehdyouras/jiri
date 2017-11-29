import mongoose from 'mongoose';

var Schema = mongoose.Schema;

// create a schema
var performanceSchema = new Schema({
    id: String,
    calculated_score: Number,
    manua_score: Number,
    event_id: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    student_id: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
}, {collection:"performances"});

// the schema is useless so far
// we need to create a model using it
var Performance = mongoose.model('Performance', performanceSchema);

export default Performance