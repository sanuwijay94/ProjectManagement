const express = require('express');
const router = express.Router({mergeParams: true});
const authentication = require('../authentication');
const project = require('../controllers/projectController');
const phase = require('../controllers/phaseController');
const task = require('../controllers/taskController');


/// Project ROUTES ///

// POST request for creating Project.
router.post('/create', authentication.onlyAdmin, project.project_create_post);//admin

// DELETE request to delete Project.
router.delete('/:id/delete', authentication.onlyAdmin, project.project_delete_post);//admin

// PATCH request to update Project.
router.patch('/:id/update', authentication.onlyAdminAndPM, project.project_update_post);//admin/PM

// GET request for one Project.
router.get('/:id', authentication.all, project.project_detail);//all

// GET request for list of all Projects.
router.get('/',/* authentication.onlyAdmin,*/ project.project_list);//admin

// GET Phases of a Project
router.get('/:projectId/phases/', /*authentication.all,*/ phase.getPhases);//all

// GET Phase
router.get('/:projectId/phases/:id', authentication.all, phase.phase_detail);//all

// GET Tasks of Phase
router.get('/:projectId/phases/:phaseId/tasks', /*authentication.all,*/ task.getTasks);//all

//GET Task
router.get('/:projectId/phases/:phaseId/tasks/:id', authentication.all, task.task_detail);//all


module.exports = router;