const express = require('express');
const router = express.Router();
const authentication = require('../authentication');
const resource = require('../controllers/resourceController');


/// Resource ROUTES ///

// POST request for creating Resource.
router.post('/create', authentication.onlyAdmin, resource.resource_create_post);//admin

// DELETE request to delete Resource.
router.delete('/:id/delete', authentication.onlyAdmin, resource.resource_delete_post);//admin

// PATCH request to update Resource.
router.patch('/:id/update', authentication.onlyAdmin, resource.resource_update_post);//admin

// GET request for one Resource.
router.get('/:id', authentication.onlyAdminAndPM, resource.resource_detail);//admin/PM

// GET request for list of all Resources.
router.get('/', /*authentication.onlyAdminAndPM,*/ resource.resource_list);//admin/PM


module.exports = router;