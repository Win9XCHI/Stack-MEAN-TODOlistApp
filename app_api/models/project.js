//File with mongoose schems
var mongoose = require( 'mongoose' );

/* Shemes */
var TaskSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    name: String,
    status: String,
    project_id: Number
});

var ProjectSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    name: {type: String, required: true},
    status: {type: String},
    tasks: [TaskSchema]
});

/* Compilation model */
mongoose.model('Project', ProjectSchema);