const express = require('express');
const router = express.Router({mergeParams: true});
const authentication = require('../authentication');
const project = require('../controllers/projectController');


/// Project ROUTES ///

// POST request for creating Project.
router.post('/create', authentication, project.project_create_post);

// DELETE request to delete Project.
router.delete('/:id/delete', authentication, project.project_delete_post);

// PATCH request to update Project.
router.patch('/:id/update', authentication, project.project_update_post);

// GET request for one Project.
router.get('/:id', authentication, project.project_detail);

// GET request for list of all Projects.
router.get('/', authentication, project.project_list);


module.exports = router;