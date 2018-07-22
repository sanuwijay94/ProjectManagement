const Task = require('../models/task');
const { validate } = require('indicative');
const phaseMiddleware = require('../middleware/phase');

// Display list of all Task.
exports.task_list = function(req, res) {
    Task.find({}, '_id description employee phase status', function (err, result) {
        if (err||!result) {
            return res.status(404).json({
                message: "Unable to get all task",
                error: err
            });
        }
        else {
            return res.status(200).json(result);
        }
    }).populate({ path: 'phase', populate: { path: 'project', populate: {path: 'client'} } }).populate('employee');
};


// Display detail page for a specific Task.
exports.task_detail = function(req, res) {
    Task.findById({'_id': req.params.id}, '_id description employee phase status', function (err, result) {
        if (err||!result) {
            return res.status(404).json({
                message: "Unable to get the task",
                error: err
            });
        }
        else {
            return res.status(200).json(result);
        }
    }).populate({ path: 'phase', populate: { path: 'project', populate: {path: 'client'} } }).populate('employee');
};


// Task create on POST.
exports.task_create_post = function(req, res) {
    const data ={
        description: req.body.description,
        employee: req.body.employee,
        phase: req.body.phase,
        status: req.body.status
    };

    const rules = {
        description: 'required',
        employee: 'alpha_numeric',
        phase: 'required|alpha_numeric',
        status: 'required|in:on-going,completed'
    };

    validate(data, rules)
        .then(() => {
            const task = new Task({
                description: req.body.description,
                employee: req.body.employee,
                phase: req.body.phase,
                status: req.body.status
            });
            task.save(function (err) {
                if (err) {
                    return res.status(304).json({
                        message: "Unable to Create Task",
                        error: err
                    });
                }
                return res.status(201).json({
                    message: "Created Successfully",
                    result: task
                });
            });
        })
        .catch((errors) => {
            return res.json(errors);
        });
};


// Task delete on DELETE.
exports.task_delete_post = function(req, res) {
    Task.findByIdAndDelete(req.params.id, function (err, result) {
        if (err||!result) {
            return res.status(304).json({
                message: "Unable to Delete Task",
                error: err
            });
        }
        else{
            return res.status(200).json({
                message: "Deleted Successfully",
                result: result
            });
        }
    });
};


// Task update on PATCH.
exports.task_update_post = function(req, res) {
    const data ={
        description: req.body.description,
        employee: req.body.employee,
        phase: req.body.phase,
        status: req.body.status
    };

    const rules = {
        description: 'required',
        employee: 'alpha_numeric',
        phase: 'required|alpha_numeric',
        status: 'required|in:on-going,completed'
    };

    validate(data, rules)
        .then(() => {
            Task.findByIdAndUpdate(req.params.id, req.body, function (err, result) {
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


//get tasks of phase on GET
exports.getTasks = function(req, res) {
    phaseMiddleware.tasksOfPhase(req.params.phaseId, function(tasks) {
        console.log(tasks);
        Task.find({'_id':{$in: tasks}}, '_id description phase employee status', function (err, result) {
            if (err||!result) {
                return res.status(404).json({
                    message: "Unable to get all tasks",
                    error: err
                });
            }
            return res.status(200).json(result);
        }).populate('phase employee');
    });
};