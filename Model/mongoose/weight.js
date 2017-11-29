import mongoose from 'mongoose';

var Schema = mongoose.Schema;

// create a schema
var weightSchema = new Schema({
    id: String,
    weight: Number,
    project_id: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    event_id: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
}, {collection:"weights"});

// the schema is useless so far
// we need to create a model using it
var Weight = mongoose.model('Weight', weightSchema);

export default Weight