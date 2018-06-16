const express = require('express');
const router = express.Router();
const authentication = require('../authentication');
const client = require('../controllers/clientController');


/// Client ROUTES ///

// POST request for creating Client.
router.post('/create', authentication, client.client_create_post);

// DELETE request to delete Client.
router.delete('/:id/delete', authentication, client.client_delete_post);

// PATCH request to update Client.
router.patch('/:id/update', authentication, client.client_update_post);

// GET request for one Client.
router.get('/:id', authentication, client.client_detail);

// GET request for list of all Clients.
router.get('/', authentication, client.client_list);


module.exports = router;