var express = require('express');
var router = express.Router({mergeParams: true});

var task = require('../controllers/taskController');


/// Task ROUTES ///

// POST request for creating Task.
router.post('/create', task.task_create_post);

// DELETE request to delete Task.
router.delete('/:id/delete', task.task_delete_post);

// PATCH request to update Task.
router.patch('/:id/update', task.task_update_post);

// GET request for one Task.
router.get('/:id', task.task_detail);

// GET request for list of all Tasks.
router.get('/', task.task_list);

//router.get('/projects/:projectId/sprint', sprint.getSprints)
//router.get('/projects/:projectId/sprint/:sprintId', sprint.getSprint)

module.exports = router;