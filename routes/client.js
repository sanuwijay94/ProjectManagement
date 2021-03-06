const express = require('express');
const router = express.Router();
const authentication = require('../authentication');
const client = require('../controllers/clientController');
const project = require('../controllers/projectController');


/// Client ROUTES ///

// POST request for creating Client.
router.post('/create', authentication.onlyAdmin, client.client_create_post);// admin

// DELETE request to delete Client.
router.delete('/:id/delete', authentication.onlyAdmin, client.client_delete_post);// admin

// PATCH request to update Client.
router.patch('/:id/update', authentication.onlyAdmin, client.client_update_post);// admin

// GET request for one Client.
router.get('/:id', authentication.onlyAdminAndPM, client.client_detail);//admin/PM

// GET request for list of all Clients.
router.get('/', /*authentication.onlyAdminAndPM,*/ client.client_list);//admin/PM

// GET projects of Client
router.get('/:clientId/projects/', authentication.all, project.getClientProjects);//all

// GET project
router.get('/:clientId/projects/:id', authentication.all, project.project_detail);//all

module.exports = router;