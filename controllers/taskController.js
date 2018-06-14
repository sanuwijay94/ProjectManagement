const Task = require('../models/task');
const { validate } = require('indicative');


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
                    return res.json({
                        message: "Unable to Create Task",
                        error: err
                    });
                }
                return res.json({
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
        if (err) {
            return res.json({
                message: "Unable to Delete Task",
                error: err
            });
        }
        else{
            return res.json({
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
                if (err) {
                    return res.json({
                        message: "Unable to Update Task",
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