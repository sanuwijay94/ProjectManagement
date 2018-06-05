var Project = require('../models/project');

// Display list of all Projects.
exports.project_list = function(req, res) {
    Project.find({}, '_id clients employees resources name type start_date deadline budget percentage_complete', function (err, result) {
        if (err) {
            return res.json({
                message: "Unable to get all projects",
                error: err
            });
        }
        else {
            return res.json(result);
        }
    }).populate('clients employees resources');
};

// Display detail page for a specific Projects.
exports.project_detail = function(req, res) {
    Project.findById({'_id': req.params.id}, '_id clients employees resources name type start_date deadline budget percentage_complete', function (err, result) {
        if (err) {
            return res.json({
                message: "Unable to get the project",
                error: err
            });
        }
        else {
            return res.json(result);
        }
    }).populate('clients employees resources');
};

// Display Project create form on GET.
exports.project_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Project create GET');
};

// Handle Project create on POST.
exports.project_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Project create POST');
};

// Display Project delete form on GET.
exports.project_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Project delete GET');
};

// Handle Project delete on POST.
exports.project_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Project delete POST');
};

// Display Project update form on GET.
exports.project_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Project update GET');
};

// Handle Project update on POST.
exports.project_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Project update POST');
};