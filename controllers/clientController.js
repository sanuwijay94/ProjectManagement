var Client = require('../models/client');

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

// Display list of all Client.
exports.client_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Client list');
};

// Display detail page for a specific Client.
exports.client_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Client detail: ' + req.params.id);
};

// Display Client create form on GET.
exports.client_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Client create GET');
};

// Handle Client create on POST.
exports.client_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Client create POST');
};

// Display Client delete form on GET.
exports.client_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Client delete GET');
};

// Handle Client delete on POST.
exports.client_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Client delete POST');
};

// Display Client update form on GET.
exports.client_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Client update GET');
};

// Handle Client update on POST.
exports.client_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Client update POST');
};