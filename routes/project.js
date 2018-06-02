var express = require('express');
var router = express.Router();

var project = require('../controllers/projectController');


/// Project ROUTES ///


// GET request for creating a Project.
router.get('/create', project.project_create_get);

// POST request for creating Project.
router.post('/create', project.project_create_post);

// GET request to delete Project.
router.get('/:id/delete', project.project_delete_get);

// POST request to delete Project.
router.post('/:id/delete', project.project_delete_post);

// GET request to update Project.
router.get('/:id/update', project.project_update_get);

// POST request to update Project.
router.post('/:id/update', project.project_update_post);

// GET request for one Project.
router.get('/:id', project.project_detail);

// GET request for list of all Projects.
router.get('/', project.project_list);


module.exports = router;