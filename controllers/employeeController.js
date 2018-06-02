var Employee = require('../models/employee');

// Display list of all Employee.
exports.employee_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Employee list');
};

// Display detail page for a specific Employee.
exports.employee_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Employee detail: ' + req.params.id);
};

// Display Employee create form on GET.
exports.employee_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Employee create GET');
};

// Handle Employee create on POST.
exports.employee_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Employee create POST');
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