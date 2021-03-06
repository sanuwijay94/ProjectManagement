const express = require('express');
const router = express.Router();
const authentication = require('../authentication');
const employee = require('../controllers/employeeController');
const project = require('../controllers/projectController');

/// Employee ROUTES ///

// POST request for creating Employee.
router.post('/create', authentication.onlyAdmin, employee.employee_create_post);//admin

// DELETE request to delete Employee.
router.delete('/:id/delete', authentication.onlyAdmin, employee.employee_delete_post);//admin

// PATCH request to update Employee.
router.patch('/:id/update', authentication.onlyAdmin, employee.employee_update_post);//admin

// GET request for one Employee.
router.get('/:id', authentication.onlyAdminAndPM, employee.employee_detail);//admin/PM

// GET request for list of all Employees.
router.get('/', authentication.onlyAdminAndPM, employee.employee_list);//admin/PM

// GET projects of Employee
router.get('/:empId/projects/', /*authentication.all,*/ project.getEmployeeProjects);//all

// GET project
router.get('/:empId/projects/:id', authentication.all, project.project_detail);//all

module.exports = router;