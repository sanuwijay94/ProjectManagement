var express = require('express');
var router = express.Router();

var client = require('../controllers/clientController');


/// Client ROUTES ///


// GET request for creating a Client.
router.get('/create', client.client_create_get);

// POST request for creating Client.
router.post('/create', client.client_create_post);

// GET request to delete Client.
router.get('/:id/delete', client.client_delete_get);

// POST request to delete Client.
router.post('/:id/delete', client.client_delete_post);

// GET request to update Client.
router.get('/:id/update', client.client_update_get);

// POST request to update Client.
router.post('/:id/update', client.client_update_post);

// GET request for one Client.
router.get('/:id', client.client_detail);

// GET request for list of all Clients.
router.get('/', client.client_list);


module.exports = router;