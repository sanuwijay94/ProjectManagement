const Employee = require('../models/employee');
const employeeMiddleware = require('../middleware/employee');
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


// Employee create on POST.
exports.employee_create_post = function(req, res) {
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
        type: 'required|in:Dev,QA,BA,PM',
        status: 'required|in:Available,Not-Available',
        username: 'required',
        password: 'required|min:4|max:40'
    };

    validate(data, rules)
        .then(() => {
            const employee = new Employee({
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
                    return res.status(304).json({
                        message: "Unable to Create Client",
                        error: err
                    });
                }
                return res.status(200).json({
                    message: "Created Successfully",
                    result: req.body
                });
            });
        })
        .catch((errors) => {
            return res.json(errors);
        });
};


// Project delete on DELETE.
exports.employee_delete_post = function(req, res) {
    Employee.findByIdAndDelete(req.params.id, function (err, result) {
        if (err||!result) {
            return res.status(304).json({
                message: "Unable to Delete Employee",
                error: err
            });
        }
        //getting all the projects of employee with the passed employee Id
        employeeMiddleware.projectsOfEmployee(req.params.id, function(projects) {
            if (err||!result) {
                return res.status(304).json({
                    message: "Unable to Delete Project",
                    error: err
                });
            }
            //delete the employee Id from all the project
            for(let i=0; i<projects.length; i++) {
                employeeMiddleware.deleteEmployeeFromProject(projects[i], req.params.id);
            }
            return res.status(200).json({
                message: "Deleted Successfully",
            });
        });
    });
};


// Employee update on PATCH.
exports.employee_update_post = function(req, res) {
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
        type: 'required|in:Dev,QA,BA,PM',
        status: 'required|in:Available,Not-Available',
        username: 'required',
        password: 'required|min:4|max:40'
    };

    validate(data, rules)
        .then(() => {
            Employee.findByIdAndUpdate(req.params.id, req.body, function (err, result) {
                if (err||!result) {
                    return res.status(304).json({
                        message: "Unable to update Client",
                        error: err
                    });
                }
                return res.status(200).json({
                    message: "Updated Successfully",
                    result: result
                });
            });
        })
        .catch((errors) => {
            return res.json(errors);
        });
};

