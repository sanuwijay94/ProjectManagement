const express = require('express');
const router = express.Router({mergeParams: true});
const authentication = require('../authentication');
const task = require('../controllers/taskController');


/// Task ROUTES ///

// POST request for creating Task.
router.post('/create', authentication.onlyAdminAndPM, task.task_create_post);//admin//PM

// DELETE request to delete Task.
router.delete('/:id/delete', authentication.onlyAdminAndPM, task.task_delete_post);//admin/PM

// PATCH request to update Task.
router.patch('/:id/update', authentication.onlyAdminAndPM, task.task_update_post);//admin//PM

// GET request for one Task.
router.get('/:id', authentication.all, task.task_detail);//all

// GET request for list of all Tasks.
router.get('/', authentication.onlyAdmin, task.task_list);//admin/PM

//router.get('/projects/', phase.getProjects)
//router.get('/projects/:projectId/', project.getProject)
//router.get('/projects/:projectId/phases/', phase.getPhases)
//router.get('/projects/:projectId/phases/:phaseId', phase.getPhase)
//router.get('/projects/:projectId/phase/:phaseId/tasks', task.getTasks)
//router.get('/projects/:projectId/phase/:phaseId/tasks/:taskId', task.getTask)

module.exports = router;