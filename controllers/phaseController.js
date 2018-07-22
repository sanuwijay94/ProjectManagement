const Phase = require('../models/phase');
const Task = require('../models/task');
const { validate } = require('indicative');
const projectMiddleware = require('../middleware/project');

// Display list of all Phase.
exports.phase_list = function(req, res) {
    Phase.find({}, '_id name start_date end_date project', function (err, result) {
        if (err||!result) {
            return res.status(404).json({
                message: "Unable to get all phases",
                error: err
            });
        }
        else {
            return res.status(200).json(result);
        }
    }).populate('project');
};


// Display detail page for a specific Phase.
exports.phase_detail = function(req, res) {
    Phase.findById({'_id': req.params.id}, '_id name start_date end_date project', function (err, result) {
        if (err||!result) {
            return res.status(404).json({
                message: "Unable to get the phase",
                error: err
            });
        }
        else {
            return res.status(200).json(result);
        }
    }).populate('project');
};


// Phase create on POST.
exports.phase_create_post = function(req, res) {
    const data ={
        name: req.body.name,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        project: req.body.project
    };

    const rules = {
        name: 'required',
        start_date: 'required|date',
        end_date: 'date',
        project: 'required|alpha_numeric'
    };

    validate(data, rules)
        .then(() => {
            const phase = new Phase({
                name: req.body.name,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                project: req.body.project
            });
            phase.save(function (err) {
                if (err) {
                    return res.status(304).json({
                        message: "Unable to Create Task",
                        error: err
                    });
                }
                return res.status(201).json({
                    message: "Created Successfully",
                    result: phase
                });
            });
        })
        .catch((errors) => {
            return res.json(errors);
        });
};


// Phase delete on DELETE.
exports.phase_delete_post = function(req, res) {
    Phase.findByIdAndDelete(req.params.id, function (err, result) {
        if (err||!result) {
            return res.status(304).json({
                message: "Unable to Delete Phase",
                error: err
            });
        }
        else{
            // delete tasks of the phase specified by the passed phase Id
            Task.deleteMany({'phase': req.params.id}, function (err, result) {
                if (err||!result) {
                    return res.status(304).json({
                        message: "Unable to Delete Task",
                        error: err
                    });
                }
            });
            return res.status(200).json({
                message: "Deleted Successfully",
                result: result
            });
        }
    });
};


// Phase update on PATCH.
exports.phase_update_post = function(req, res) {
    const data ={
        name: req.body.name,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        project: req.body.project
    };

    const rules = {
        name: 'required',
        start_date: 'required|date',
        end_date: 'date',
        project: 'required|alpha_numeric'
    };

    validate(data, rules)
        .then(() => {
            Phase.findByIdAndUpdate(req.params.id, req.body, function (err, result) {
                if (err||!result) {
                    return res.status(304).json({
                        message: "Unable to Update Task",
                        error: err
                    });
                }
                return res.status(200).json({
                    message: "Updated Successfully",
                    result: result
                });
            });
        })
        .catch((errors) => {
            return res.json(errors);
        });
};


// get phases of project on GET
exports.getPhases = function(req, res) {
    projectMiddleware.phasesOfProject(req.params.projectId, function(phases) {
        Phase.find({'_id': {$in: phases}}, '_id name type start_date end_date project', function (err, result) {
            if (err||!result) {
                return res.status(404).json({
                    message: "Unable to get all phases",
                    error: err
                });
            }
            return res.status(200).json(result);
        }).populate('project');
    });
};