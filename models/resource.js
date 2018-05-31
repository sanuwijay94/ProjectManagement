var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ResourceSchema = new Schema(
    {
        name: {type: String, required: true},
        type: {type: String, enum:['equipment', 'facilities', 'funding'], required: true},
        status: {type: String, enum: ['Available', 'Not-Available'], default: 'Available', required: true}
    }
);

// Virtual for URL of the resource
ResourceSchema
    .virtual('url')
    .get(function () {
        return '/catalog/resource/' + this._id;
    });

//Export model
module.exports = mongoose.model('Resource', ResourceSchema);