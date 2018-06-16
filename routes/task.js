const express = require('express');
const router = express.Router({mergeParams: true});
const authentication = require('../authentication');
const task = require('../controllers/taskController');


/// Task ROUTES ///

// POST request for creating Task.
router.post('/create', authentication, task.task_create_post);

// DELETE request to delete Task.
router.delete('/:id/delete', authentication, task.task_delete_post);

// PATCH request to update Task.
router.patch('/:id/update', authentication, task.task_update_post);

// GET request for one Task.
router.get('/:id', authentication, task.task_detail);

// GET request for list of all Tasks.
router.get('/', authentication, task.task_list);

//router.get('/projects/:projectId/sprint', sprint.getSprints)
//router.get('/projects/:projectId/sprint/:sprintId', sprint.getSprint)

module.exports = router;