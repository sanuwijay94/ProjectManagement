var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PhaseSchema = new Schema(
    {
        name: {type: String, required: true},
        start_date: {type: Date, required: true},
        end_date: {type: Date},
        project: {type: Schema.ObjectId, ref: 'Project', required: true}
    }
);

// Virtual for duration of the phase
PhaseSchema
    .virtual('duration')
    .get(function ()
    {
        var date1 = this.start_date;
        var date2 = this.end_date;
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return diffDays;
    });

// Virtual for URL of phase
PhaseSchema
    .virtual('url')
    .get(function () {
        return '/catalog/phase/' + this._id;
    });

//Export model
module.exports = mongoose.model('Phase', PhaseSchema);