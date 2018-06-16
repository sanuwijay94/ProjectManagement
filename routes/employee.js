const express = require('express');
const router = express.Router();
const authentication = require('../authentication');
const employee = require('../controllers/employeeController');


/// Employee ROUTES ///

// POST request for creating Employee.
router.post('/create', authentication.onlyAdmin, employee.employee_create_post);//admin

// DELETE request to delete Employee.
router.delete('/:id/delete', authentication.onlyAdmin, employee.employee_delete_post);//admin

// PATCH request to update Employee.
router.patch('/:id/update', authentication.onlyAdmin, employee.employee_update_post);//all

// GET request for one Employee.
router.get('/:id', authentication.onlyAdmin, employee.employee_detail);//admin/PM

// GET request for list of all Employees.
router.get('/', authentication.onlyAdmin, employee.employee_list);//admin/PM


module.exports = router;