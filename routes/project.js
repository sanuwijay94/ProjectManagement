const express = require('express');
const router = express.Router({mergeParams: true});
const authentication = require('../authentication');
const project = require('../controllers/projectController');


/// Project ROUTES ///

// POST request for creating Project.
router.post('/create', authentication.onlyAdmin, project.project_create_post);//admin

// DELETE request to delete Project.
router.delete('/:id/delete', authentication.onlyAdmin, project.project_delete_post);//admin

// PATCH request to update Project.
router.patch('/:id/update', authentication.onlyAdmin, project.project_update_post);//admin/PM

// GET request for one Project.
router.get('/:id', authentication.onlyAdmin, project.project_detail);//all

// GET request for list of all Projects.
router.get('/', authentication.onlyAdmin, project.project_list);//admin


module.exports = router;