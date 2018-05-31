var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EmployeeSchema = new Schema(
    {
        first_name: {type: String, required: true},
        last_name: {type: String, required: true},
        date_of_birth: {type: Date},
        type: {type: String, enum: ['Dev', 'QA', 'BA', 'PM'], required: true},
        status: {type: String, enum: ['Available', 'Not-Available'], default: 'Available', required: true},
        username: {type: String, required: true, index: { unique: true }},
        password: {type: String, required: true}
    }
);

// Virtual for employee's full name
EmployeeSchema
    .virtual('name')
    .get(function () {
        return this.first_name + ' ' + this.last_name;
    });

// Virtual for employee's age
EmployeeSchema
    .virtual('age')
    .get(function ()
    {
        var ageDifMs = Date.now() - this.date_of_birth.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    });

// Virtual for employee's URL
EmployeeSchema
    .virtual('url')
    .get(function () {
        return '/catalog/employee/' + this._id;
    });

//Export model
module.exports = mongoose.model('Employee', EmployeeSchema);