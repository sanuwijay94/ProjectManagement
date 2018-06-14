var express = require('express');
var router = express.Router();

var client = require('../controllers/clientController');


/// Client ROUTES ///

// POST request for creating Client.
router.post('/create', client.client_create_post);

// DELETE request to delete Client.
router.delete('/:id/delete', client.client_delete_post);

// PATCH request to update Client.
router.patch('/:id/update', client.client_update_post);

// GET request for one Client.
router.get('/:id', client.client_detail);

// GET request for list of all Clients.
router.get('/', client.client_list);


module.exports = router;