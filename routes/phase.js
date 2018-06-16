const express = require('express');
const router = express.Router();
const authentication = require('../authentication');
const phase = require('../controllers/phaseController');


/// Phase ROUTES ///

// POST request for creating Phase.
router.post('/create', authentication, phase.phase_create_post);

// DELETE request to delete Phase.
router.delete('/:id/delete', authentication, phase.phase_delete_post);

// PATCH request to update Phase.
router.patch('/:id/update', authentication, phase.phase_update_post);

// GET request for one Phase.
router.get('/:id', authentication, phase.phase_detail);

// GET request for list of all Phases.
router.get('/', authentication, phase.phase_list);


module.exports = router;