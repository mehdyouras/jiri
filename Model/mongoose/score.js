import mongoose from 'mongoose';

var Schema = mongoose.Schema;

// create a schema
var scoreSchema = new Schema({
    id: String,
    meeting_id: [{ type: Schema.Types.ObjectId, ref: 'Meeting' }],
    implementation_id: [{ type: Schema.Types.ObjectId, ref: 'Implementation' }],
    score: Float,
    comment: String,
}, {collection:"scores"});

// the schema is useless so far
// we need to create a model using it
var Score = mongoose.model('Score', scoreSchema);

export default Score