var Resource = require('../models/resource');

// Display list of all Resource.
exports.resource_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Resource list');
};

// Display detail page for a specific Resource.
exports.resource_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Resource detail: ' + req.params.id);
};

// Display Resource create form on GET.
exports.resource_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Resource create GET');
};

// Handle Resource create on POST.
exports.resource_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Resource create POST');
};

// Display Resource delete form on GET.
exports.resource_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Resource delete GET');
};

// Handle Resource delete on POST.
exports.resource_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Resource delete POST');
};

// Display Client update form on GET.
exports.resource_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Resource update GET');
};

// Handle Client update on POST.
exports.resource_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Resource update POST');
};