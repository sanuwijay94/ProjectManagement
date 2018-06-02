var express = require('express');
var router = express.Router();

var resource = require('../controllers/resourceController');


/// Resource ROUTES ///

// GET request for creating a Resource.
router.get('/create', resource.resource_create_get);

// POST request for creating Resource.
router.post('/create', resource.resource_create_post);

// GET request to delete Resource.
router.get('/:id/delete', resource.resource_delete_get);

// POST request to delete Resource.
router.post('/:id/delete', resource.resource_delete_post);

// GET request to update Resource.
router.get('/:id/update', resource.resource_update_get);

// POST request to update Resource.
router.post('/:id/update', resource.resource_update_post);

// GET request for one Resource.
router.get('/:id', resource.resource_detail);

// GET request for list of all Resources.
router.get('/', resource.resource_list);


module.exports = router;