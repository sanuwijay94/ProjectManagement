const express = require('express');
const router = express.Router();
const authentication = require('../authentication');
const employee = require('../controllers/employeeController');


/// Employee ROUTES ///

// POST request for creating Employee.
router.post('/create', authentication, employee.employee_create_post);

// DELETE request to delete Employee.
router.delete('/:id/delete', authentication, employee.employee_delete_post);

// PATCH request to update Employee.
router.patch('/:id/update', authentication, employee.employee_update_post);

// GET request for one Employee.
router.get('/:id', authentication, employee.employee_detail);

// GET request for list of all Employees.
router.get('/', authentication, employee.employee_list);


module.exports = router;