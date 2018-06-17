const Client = require('../models/client');
const Project = require('../models/project');
const Phase = require('../models/phase');
const Task = require('../models/task');
const clientMiddleware = require('../middleware/client');
const projectMiddleware = require('../middleware/project');
const { validate } = require('indicative');


// Display list of all Client.
exports.client_list = function(req, res) {
    Client.find({}, '_id name type phone email username password', function (err, result) {
        if (err) {
            return res.json({
                message: "Unable to get all clients",
                error: err
            });
        }
        else {
            return res.json(result);
        }
    });
};


// Display detail page for a specific Client.
exports.client_detail = function(req, res) {
    Client.findById({'_id': req.params.id}, '_id name type phone email username password', function (err, result) {
        if (err) {
            return res.json({
                message: "Unable to get the client",
                error: err
            });
        }
        else {
            return res.json(result);
        }
    });
};


// Client create on POST.
exports.client_create_post = function(req, res) {
    const data ={
        name: req.body.name,
        type: req.body.type,
        phone: req.body.phone,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    };

    const rules = {
        name: 'required',
        type: 'required|in:Organization,Company,Person',
        phone: 'required',
        email: 'email',
        username: 'required',
        password: 'required|min:4|max:40'
    };

    validate(data, rules)
        .then(() => {
            const client = new Client({
                name: req.body.name,
                type: req.body.type,
                phone: req.body.phone,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            });
            client.save(function (err) {
                if (err) {
                    return res.json({
                        message: "Unable to create Client",
                        error: err
                    });
                }
                return res.json({
                    message: "Created Successfully",
                    client: client
                });
            });
        })
        .catch((errors) => {
            return res.json(errors);
        });
};


// Client delete on DELETE.
exports.client_delete_post = function(req, res) {
    //Delete Client by passed id
    Client.findByIdAndDelete(req.params.id, function (err, result) {
        if (err||!result) {
            return res.json.status(304)({
                message: "Unable to Delete Client",
                error: err
            });
        }
        else{
            //getting all the projects of client by passing client Id
            clientMiddleware.projectsOfClient(req.params.id, function(projects) {
                //delete all the projects of client specified by the passed client Id
                Project.deleteMany({'client': req.params.id}, function (err, result) {
                    if (err) {
                        return res.json({
                            message: "Unable to Delete Project",
                            error: err
                        });
                    }
                    else {
                        //Delete all the phases of each project
                        for (let j = 0; j < projects.length; j++) {
                            projectMiddleware.phasesOfProject(projects[j], function (phases) {
                                Phase.deleteMany({'project': projects[j]}, function (err, result) {
                                    if (err) {
                                        return res.json({
                                            message: "Unable to Delete Phases",
                                            error: err
                                        });
                                    }
                                    else {
                                        //Delete all the task of each phase
                                        for (let i = 0; i < phases.length; i++) {
                                            Task.deleteMany({'phase': phases[i]}, function (err, result) {
                                                if (err) {
                                                    return res.json({
                                                        message: "Unable to Delete Task",
                                                        error: err
                                                    });
                                                }
                                            });
                                        }
                                    }
                                });
                            });
                        }
                    }
                });
                return res.json({
                    message: "Deleted Successfully",
                    result: result
                });
            });
        }
    });
};


// Client update on PATCH.
exports.client_update_post = function(req, res) {
    const data ={
        name: req.body.name,
        type: req.body.type,
        phone: req.body.phone,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    };

    const rules = {
        name: 'required',
        type: 'required|in:Organization,Company,Person',
        phone: 'required',
        email: 'email',
        username: 'required',
        password: 'required|min:4|max:40'
    };

    validate(data, rules)
        .then(() => {
            Client.findByIdAndUpdate(req.params.id, req.body, function (err, result) {
                if (err) {
                    return res.json({
                        message: "Unable to update Client",
                        error: err
                    });
                }
                return res.json({
                    message: "update Successfully",
                    client: result
                });
            });
        })
        .catch((errors) => {
            return res.json(errors);
        });
};