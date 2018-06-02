var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ClientSchema = new Schema(
    {
        name: {type: String, required: true},
        type: {type: String, enum:['Organization', 'Company', 'Person'], required: true},
        phone: {type: String, required: true},
        email: {type: String},
        username: {type: String, required: true, index: { unique: true }},
        password: {type: String, required: true}
    }
);

// Virtual for client's URL
ClientSchema
    .virtual('url')
    .get(function () {
        return '/catalog/client/' + this._id;
    });

//Export model
module.exports = mongoose.model('Client', ClientSchema);