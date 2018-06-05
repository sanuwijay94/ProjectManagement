const Resource = require('../models/resource');
const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1:27017/projectManagement';
const { validate } = require('indicative');


// Display list of all Resource.
exports.resource_list = function(req, res) {
    Resource.find({}, '_id status name type', function (err, result) {
        if (err) {
            return res.json({
                message: "Unable to get all resources",
                error: err
            });
        }
        else {
            return res.json(result);
        }
    });
};


// Display detail page for a specific Resource.
exports.resource_detail = function(req, res) {
    Resource.findById({'_id': req.params.id}, '_id status name type', function (err, result) {
        if (err) {
            return res.json({
                message: "Unable to get the resource",
                error: err
            });
        }
        else {
            return res.json(result);
        }
    });
};


// Display Resource create form on GET.
exports.resource_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Resource create GET');
};


// Handle Resource create on POST.
exports.resource_create_post = function(req, res) {
    mongoose.connect(mongoDB);
    mongoose.Promise = global.Promise;
    mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

    const data ={
        name: req.body.name,
        type: req.body.type,
        status: req.body.status
    };

    const rules = {
        name: 'required',
        type: 'required',
        status: 'required'
    };

    validate(data, rules)
        .then(() => {
            const resource = new Resource(
                {
                    name: req.body.name,
                    type: req.body.type,
                    status: req.body.status
                });
            resource.save(function (err) {
                if (err) {
                    return res.json({err});
                }
                return res.json(resource);
            });
        })
        .catch((errors) => {
            return res.json({errors});
        });

    mongoose.connection.close();
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