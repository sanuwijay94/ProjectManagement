var express = require('express');
var router = express.Router({mergeParams: true});

var project = require('../controllers/projectController');


/// Project ROUTES ///

// POST request for creating Project.
router.post('/create', project.project_create_post);

// DELETE request to delete Project.
router.delete('/:id/delete', project.project_delete_post);

// PATCH request to update Project.
router.patch('/:id/update', project.project_update_post);

// GET request for one Project.
router.get('/:id', project.project_detail);

// GET request for list of all Projects.
router.get('/', project.project_list);


module.exports = router;