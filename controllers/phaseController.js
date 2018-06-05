var Phase = require('../models/phase');

// Display list of all Phase.
exports.phase_list = function(req, res) {
    Phase.find({}, '_id name start_date end_date project', function (err, result) {
        if (err) {
            return res.json({
                message: "Unable to get all phases",
                error: err
            });
        }
        else {
            return res.json(result);
        }
    }).populate('project');
};

// Display detail page for a specific Phase.
exports.phase_detail = function(req, res) {
    Phase.findById({'_id': req.params.id}, '_id name start_date end_date project', function (err, result) {
        if (err) {
            return res.json({
                message: "Unable to get the phase",
                error: err
            });
        }
        else {
            return res.json(result);
        }
    }).populate('project');
};

// Display Phase create form on GET.
exports.phase_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Phase create GET');
};

// Handle Phase create on POST.
exports.phase_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Phase create POST');
};

// Display Phase delete form on GET.
exports.phase_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Phase delete GET');
};

// Handle Phase delete on POST.
exports.phase_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Phase delete POST');
};

// Display Phase update form on GET.
exports.phase_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Phase update GET');
};

// Handle Phase update on POST.
exports.phase_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Phase update POST');
};