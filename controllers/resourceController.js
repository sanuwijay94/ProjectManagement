const Resource = require('../models/resource');
const resourceMiddleware = require('../middleware/resource');
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


// Resource create on POST.
exports.resource_create_post = function(req, res) {
    const data ={
        name: req.body.name,
        type: req.body.type,
        status: req.body.status
    };

    const rules = {
        name: 'required',
        type: 'required',
        status: 'required|in:Available,Not-Available'
    };

    validate(data, rules)
        .then(() => {
            const resource = new Resource({
                name: req.body.name,
                type: req.body.type,
                status: req.body.status
            });
            resource.save(function (err) {
                if (err) {
                    return res.json({
                        message: "Unable to Create Project",
                        error: err
                    });
                }
                return res.json({
                    message: "Created Successfully",
                    result: resource
                });
            });
        })
        .catch((errors) => {
            return res.json(errors);
        });
};


// Resource delete on DELETE.
exports.resource_delete_post = function(req, res) {
    Resource.findByIdAndDelete(req.params.id, function (err, result) {
        if (err) {
            return res.json({
                message: "Unable to Delete Resource",
                error: err
            });
        }
        //getting all the projects of resources
        resourceMiddleware.projectsOfResource(req.params.id, function(projects) {
            if (err) {
                return res.json({
                    message: "Unable to Delete Project",
                    error: err
                });
            }
            // deleting resources from project all the project
            for(let i=0; i<projects.length; i++) {
                resourceMiddleware.deleteResourceFromProject(projects, req.params.id);
            }
            return res.json({
                message: "Deleted Successfully",
            });
        });
    });
};


// Client update on PATCH.
exports.resource_update_post = function(req, res) {
    const data ={
        name: req.body.name,
        type: req.body.type,
        status: req.body.status
    };

    const rules = {
        name: 'required',
        type: 'required|in:equipment,facilities,funding',
        status: 'required|in:Available,Not-Available'
    };

    validate(data, rules)
        .then(() => {
            Resource.findByIdAndUpdate(req.params.id, req.body, function (err, result) {
                if (err) {
                    return res.json({
                        message: "Unable to Update Project",
                        error: err
                    });
                }
                return res.json({
                    message: "Updated Successfully",
                    result: result
                });
            });
        })
        .catch((errors) => {
            return res.json(errors);
        });
};