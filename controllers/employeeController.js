const Employee = require('../models/employee');
const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1:27017/projectManagement';
const { validate } = require('indicative');


// Display list of all Employee.
exports.employee_list = function(req, res) {
    Employee.find({}, '_id status first_name last_name date_of_birth phone email type username password', function (err, result) {
        if (err) {
            return res.json({
                message: "Unable to get all employees",
                error: err
            });
        }
        else {
            return res.json(result);
        }
    });
};


// Display detail page for a specific Employee.
exports.employee_detail = function(req, res) {
    Employee.findById({'_id': req.params.id}, '_id status first_name last_name date_of_birth phone email type username password', function (err, result) {
        if (err) {
            return res.json({
                message: "Unable to get the employee",
                error: err
            });
        }
        else {
            return res.json(result);
        }
    });
};


// Display Employee create form on GET.
exports.employee_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Employee create POST');
};

// Handle Employee create on POST.
exports.employee_create_post = function(req, res) {
    mongoose.connect(mongoDB);
    mongoose.Promise = global.Promise;
    mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

    const data ={
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date_of_birth: req.body.date_of_birth,
        phone: req.body.phone,
        email: req.body.email,
        type: req.body.type,
        status: req.body.status,
        username: req.body.username,
        password: req.body.password
    };

    const rules = {
        first_name: 'required',
        last_name: 'required',
        date_of_birth: 'date',
        phone: 'required',
        email: 'email',
        type: 'required',
        status: 'required',
        username: 'required',
        password: 'required|min:4|max:40'
    };

    validate(data, rules)
        .then(() => {
            const employee = new Employee(
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                date_of_birth: req.body.date_of_birth,
                phone: req.body.phone,
                email: req.body.email,
                type: req.body.type,
                status: req.body.status,
                username: req.body.username,
                password: req.body.password
            });
            employee.save(function (err) {
                if (err) {
                    return res.json({err});
                }
                return res.json(employee);
            });
        })
        .catch((errors) => {
            return res.json({errors});
        });

    mongoose.connection.close();
};


// Display Employee delete form on GET.
exports.employee_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Employee delete GET');
};


// Handle Project delete on POST.
exports.employee_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Employee delete POST');
};


// Display Employee update form on GET.
exports.employee_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Employee update GET');
};


// Handle Employee update on POST.
exports.employee_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Employee update POST');
};