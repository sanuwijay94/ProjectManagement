var express = require('express');
var router = express.Router();

var phase = require('../controllers/phaseController');


/// Phase ROUTES ///

// POST request for creating Phase.
router.post('/create', phase.phase_create_post);

// DELETE request to delete Phase.
router.delete('/:id/delete', phase.phase_delete_post);

// PATCH request to update Phase.
router.patch('/:id/update', phase.phase_update_post);

// GET request for one Phase.
router.get('/:id', phase.phase_detail);

// GET request for list of all Phases.
router.get('/', phase.phase_list);


module.exports = router;