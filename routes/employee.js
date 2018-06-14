var express = require('express');
var router = express.Router();

var employee = require('../controllers/employeeController');


/// Employee ROUTES ///

// POST request for creating Employee.
router.post('/create', employee.employee_create_post);

// DELETE request to delete Employee.
router.delete('/:id/delete', employee.employee_delete_post);

// PATCH request to update Employee.
router.patch('/:id/update', employee.employee_update_post);

// GET request for one Employee.
router.get('/:id', employee.employee_detail);

// GET request for list of all Employees.
router.get('/', employee.employee_list);


module.exports = router;