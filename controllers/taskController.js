var Task = require('../models/task');

// Display list of all Task.
exports.task_list = function(req, res) {
    Task.find({}, '_id description employee phase status', function (err, result) {
        if (err) {
            return res.json({
                message: "Unable to get all task",
                error: err
            });
        }
        else {
            return res.json(result);
        }
    }).populate('employee phase');
};

// Display detail page for a specific Task.
exports.task_detail = function(req, res) {
    Task.findById({'_id': req.params.id}, '_id description employee phase status', function (err, result) {
        if (err) {
            return res.json({
                message: "Unable to get the task",
                error: err
            });
        }
        else {
            return res.json(result);
        }
    }).populate('employee phase');
};

// Display Task create form on GET.
exports.task_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Task create GET');
};

// Handle Task create on POST.
exports.task_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Task create POST');
};

// Display Task delete form on GET.
exports.task_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Task delete GET');
};

// Handle Task delete on POST.
exports.task_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Task delete POST');
};

// Display Task update form on GET.
exports.task_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Task update GET');
};

// Handle Task update on POST.
exports.task_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Task update POST');
};