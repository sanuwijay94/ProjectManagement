var express = require('express');
var router = express.Router();

var task = require('../controllers/taskController');


/// Task ROUTES ///

// GET request for creating a Task.
router.get('/create', task.task_create_get);

// POST request for creating Task.
router.post('/create', task.task_create_post);

// GET request to delete Task.
router.get('/:id/delete', task.task_delete_get);

// POST request to delete Task.
router.post('/:id/delete', task.task_delete_post);

// GET request to update Task.
router.get('/:id/update', task.task_update_get);

// POST request to update Task.
router.post('/:id/update', task.task_update_post);

// GET request for one Task.
router.get('/:id', task.task_detail);

// GET request for list of all Tasks.
router.get('/', task.task_list);


module.exports = router;