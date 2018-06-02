var express = require('express');
var router = express.Router();

var phase = require('../controllers/phaseController');


/// Phase ROUTES ///


// GET request for creating a Phase.
router.get('/create', phase.phase_create_get);

// POST request for creating Phase.
router.post('/create', phase.phase_create_post);

// GET request to delete Phase.
router.get('/:id/delete', phase.phase_delete_get);

// POST request to delete Phase.
router.post('/:id/delete', phase.phase_delete_post);

// GET request to update Phase.
router.get('/:id/update', phase.phase_update_get);

// POST request to update Phase.
router.post('/:id/update', phase.phase_update_post);

// GET request for one Phase.
router.get('/:id', phase.phase_detail);

// GET request for list of all Phases.
router.get('/', phase.phase_list);


module.exports = router;