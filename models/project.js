var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProjectSchema = new Schema(
    {
        name: {type: String, required: true},
        type: {type: String},
        start_date: {type: Date, required: true},
        deadline: {type: Date, required: true},
        budget: {type: Number},
        percentage_complete: {type: Number},
        client: {type: Schema.ObjectId, ref: 'Client', required: true},
        employees: [{type: Schema.ObjectId, ref: 'Employee', required: true}],
        resources: [{type: Schema.ObjectId, ref: 'Resource'}]
    }
);

// Virtual for duration of the project
ProjectSchema
    .virtual('duration')
    .get(function ()
    {
        var date1 = this.start_date;
        var date2 = this.deadline;
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return diffDays;
    });

// Virtual for URL of project
ProjectSchema
    .virtual('url')
    .get(function () {
        return '/catalog/project/' + this._id;
    });

//Export model
module.exports = mongoose.model('Project', ProjectSchema);