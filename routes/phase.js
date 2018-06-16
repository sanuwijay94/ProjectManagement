const express = require('express');
const router = express.Router();
const authentication = require('../authentication');
const phase = require('../controllers/phaseController');


/// Phase ROUTES ///

// POST request for creating Phase.
router.post('/create', authentication.onlyAdmin, phase.phase_create_post);//admin/PM

// DELETE request to delete Phase.
router.delete('/:id/delete', authentication.onlyAdmin, phase.phase_delete_post);//admin/PM

// PATCH request to update Phase.
router.patch('/:id/update', authentication.onlyAdmin, phase.phase_update_post);//admin/PM

// GET request for one Phase.
router.get('/:id', authentication.onlyAdmin, phase.phase_detail);//all

// GET request for list of all Phases.
router.get('/', authentication.onlyAdmin, phase.phase_list);//admin/PM


module.exports = router;