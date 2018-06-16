const express = require('express');
const router = express.Router({mergeParams: true});
const authentication = require('../authentication');
const task = require('../controllers/taskController');


/// Task ROUTES ///

// POST request for creating Task.
router.post('/create', authentication.onlyAdmin, task.task_create_post);//admin//PM

// DELETE request to delete Task.
router.delete('/:id/delete', authentication.onlyAdmin, task.task_delete_post);//admin/PM

// PATCH request to update Task.
router.patch('/:id/update', authentication.onlyAdmin, task.task_update_post);//admin//PM

// GET request for one Task.
router.get('/:id', authentication.onlyAdmin, task.task_detail);//all without client

// GET request for list of all Tasks.
router.get('/', authentication.onlyAdmin, task.task_list);//admin/PM

//router.get('/projects/:projectId/sprint', sprint.getSprints)
//router.get('/projects/:projectId/sprint/:sprintId', sprint.getSprint)

module.exports = router;