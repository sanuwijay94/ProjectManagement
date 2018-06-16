var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AdminSchema = new Schema(
    {
        username: {type: String, required: true, index: { unique: true }},
        password: {type: String, required: true}
    }
);

// Virtual for client's URL
AdminSchema
    .virtual('url')
    .get(function () {
        return '/admin/' + this._id;
    });

//Export model
module.exports = mongoose.model('Admin', AdminSchema);