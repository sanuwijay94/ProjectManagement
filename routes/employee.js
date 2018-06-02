var express = require('express');
var router = express.Router();

var employee = require('../controllers/employeeController');


/// Employee ROUTES ///


// GET request for creating a Employee.
router.get('/create', employee.employee_create_get);

// POST request for creating Employee.
router.post('/create', employee.employee_create_post);

// GET request to delete Employee.
router.get('/:id/delete', employee.employee_delete_get);

// POST request to delete Employee.
router.post('/:id/delete', employee.employee_delete_post);

// GET request to update Employee.
router.get('/:id/update', employee.employee_update_get);

// POST request to update Employee.
router.post('/:id/update', employee.employee_update_post);

// GET request for one Employee.
router.get('/:id', employee.employee_detail);

// GET request for list of all Employees.
router.get('/', employee.employee_list);


module.exports = router;