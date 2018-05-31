var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TaskSchema = new Schema(
    {
        description: {type: String, required: true},
        employee: {type: Schema.ObjectId, ref: 'Employee', required: true},
        phase: {type: Schema.ObjectId, ref: 'Phase', required: true},
        status: {type: String, enum:['on-going', 'completed'], required: true}
    }
);

// Virtual for URL of the task
TaskSchema
    .virtual('url')
    .get(function () {
        return '/catalog/task/' + this._id;
    });

//Export model
module.exports = mongoose.model('Task', TaskSchema);