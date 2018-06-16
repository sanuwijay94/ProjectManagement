const express = require('express');
const router = express.Router();
const authentication = require('../authentication');
const resource = require('../controllers/resourceController');


/// Resource ROUTES ///

// POST request for creating Resource.
router.post('/create', authentication, resource.resource_create_post);

// DELETE request to delete Resource.
router.delete('/:id/delete', authentication, resource.resource_delete_post);

// PATCH request to update Resource.
router.patch('/:id/update', authentication, resource.resource_update_post);

// GET request for one Resource.
router.get('/:id', authentication, resource.resource_detail);

// GET request for list of all Resources.
router.get('/', authentication, resource.resource_list);


module.exports = router;