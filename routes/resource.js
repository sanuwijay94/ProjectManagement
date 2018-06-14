var express = require('express');
var router = express.Router();

var resource = require('../controllers/resourceController');


/// Resource ROUTES ///

// POST request for creating Resource.
router.post('/create', resource.resource_create_post);

// DELETE request to delete Resource.
router.delete('/:id/delete', resource.resource_delete_post);

// PATCH request to update Resource.
router.patch('/:id/update', resource.resource_update_post);

// GET request for one Resource.
router.get('/:id', resource.resource_detail);

// GET request for list of all Resources.
router.get('/', resource.resource_list);


module.exports = router;