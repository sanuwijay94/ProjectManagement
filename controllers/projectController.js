const Project = require('../models/project');
const Phase = require('../models/phase');
const Task = require('../models/task');
const Employee = require('../models/employee');
const Resource = require('../models/resource');
const projectMiddleware = require('../middleware/project');
const employeeMiddleware = require('../middleware/employee');
const clientMiddleware = require('../middleware/client');
const { validate } = require('indicative');


// Display list of all Projects.
exports.project_list = function(req, res) {
    Project.find({}, '_id client employees resources name type start_date deadline budget percentage_complete', function (err, result) {
        if (err||!result) {
            return res.status(404).json({
                message: "Unable to get all projects",
                error: err
            });
        }
        else {
            return res.json(result);
        }
    }).populate('client employees resources');
};


// Display detail page for a specific Projects.
exports.project_detail = function(req, res) {
    Project.findById({'_id': req.params.id}, '_id client employees resources name type start_date deadline budget percentage_complete', function (err, result) {
        if (err||!result) {
            return res.status(404).json({
                message: "Unable to get the project",
                error: err
            });
        }
        else {
            return res.json(result);
        }
    }).populate('client employees resources');
};


// Project create on POST.
exports.project_create_post = function(req, res) {
    const data ={
        name: req.body.name,
        start_date: req.body.start_date,
        deadline: req.body.deadline,
        budget: req.body.budget,
        percentage_complete: req.body.percentage_complete,
        client: req.body.client,
        employees: req.body.employees,
        resources: req.body.resources
    };

    const rules = {
        name: 'required',
        start_date: 'required|date',
        deadline: 'required|date',
        budget: 'number',
        percentage_complete: 'required|number',
        client: 'required|alpha_numeric',
        employees: 'array',
        resources: 'array'
    };

    validate(data, rules)
        .then(() => {
            let project = new Project ({
                name: req.body.name,
                start_date: req.body.start_date,
                deadline: req.body.deadline,
                budget: req.body.budget,
                percentage_complete: req.body.percentage_complete,
                client: req.body.client,
                employees: req.body.employees,
                resources: req.body.resources
            });
            project.save(function (err) {
                if (err) {
                    return res.json({err});
                }
                //Changing employees status to 'Not-Available' when added to a project
                for(let i=0;i<req.body.employees.length;i++) {
                    Employee.findByIdAndUpdate(req.body.employees[i], {$set: {status: 'Not-Available'}}, function (err, result) {
                        if (err||!result) {
                            return res.status(304).json({
                                message: "Unable to update Employee status",
                                error: err
                            });
                        }
                    });
                }
                //Changing resources status to 'Not-Available' when added to a project
                for(let r=0;r<req.body.resources.length;r++) {
                    Resource.findByIdAndUpdate(req.body.resources[r], {$set: {status: 'Not-Available'}}, function (err, result) {
                        if (err||!result) {
                            return res.status(304).json({
                                message: "Unable to update Resource status",
                                error: err
                            });
                        }
                    });
                }
                return res.status(200).json({
                    message: "Created Successfully",
                    result: req.body
                });
            });
        })
        .catch((errors) => {
            return res.json(errors);
        });
};


// Project delete on DELETE.
exports.project_delete_post = function(req, res) {
    Project.findByIdAndDelete(req.params.id, function (err, result) {
        if (err||!result) {
            return res.status(304).json({
                message: "Unable to Delete Project",
                error: err
            });
        }
        else{
            //getting all the phases of project
            projectMiddleware.phasesOfProject(req.params.id, function(phases) {
                //delete all the phases of project specified by the passed project Id
                Phase.deleteMany({'project': req.params.id}, function (err, result) {
                    if (err||!result) {
                        return res.status(304).json({
                            message: "Unable to Delete Phase",
                            error: err
                        });
                    }
                    else {
                        //delete the tasks of each phase
                        for(let i=0; i<phases.length; i++) {
                            Task.deleteMany({'phase': phases[i]}, function (err, result) {
                                if (err||!result) {
                                    return res.status(304).json({
                                        message: "Unable to Delete Task",
                                        error: err
                                    });
                                }
                            });
                        }
                    }
                });
                return res.status(200).json({
                    message: "Deleted Successfully",
                    result: result
                })
            });
        }
    });
};


// Project update on PATCH.
exports.project_update_post = function(req, res) {
    const data ={
        name: req.body.name,
        start_date: req.body.start_date,
        deadline: req.body.deadline,
        budget: req.body.budget,
        percentage_complete: req.body.percentage_complete,
        client: req.body.client,
        employees: req.body.employees,
        resources: req.body.resources
    };

    const rules = {
        name: 'required',
        start_date: 'required|date',
        deadline: 'required|date',
        budget: 'number',
        percentage_complete: 'required|number',
        client: 'required|alpha_numeric',
        employees: 'array',
        resources: 'array'
    };

    validate(data, rules)
        .then(() => {
            Project.findByIdAndUpdate(req.params.id, req.body, function (err, result) {
                if (err||!result) {
                    return res.status(304).json({
                        message: "Unable to update Project",
                        error: err
                    });
                }
                //Changing employees status to 'Not-Available' when added to a project
                for(let i=0;i<req.body.employees.length;i++) {
                    Employee.findByIdAndUpdate(req.body.employees[i], {$set: {status: 'Not-Available'}}, function (err, result) {
                        if (err||!result) {
                            return res.status(304).json({
                                message: "Unable to update Employee status",
                                error: err
                            });
                        }
                    });
                }
                //Changing resources status to 'Not-Available' when added to a project
                for(let r=0;r<req.body.resources.length;r++) {
                    Resource.findByIdAndUpdate(req.body.resources[r], {$set: {status: 'Not-Available'}}, function (err, result) {
                        if (err||!result) {
                            return res.status(304).json({
                                message: "Unable to update Resource status",
                                error: err
                            });
                        }
                    });
                }
                return res.status(200).json({
                    message: "Successfully Updated",
                    result: result
                });
            });
        })
        .catch((errors) => {
            return res.json(errors);
        });
};


// get projects of employee on GET
exports.getEmployeeProjects = function(req, res) {
    employeeMiddleware.projectsOfEmployee(req.params.empId, function(projects) {
        Project.find({'_id': {$in: projects}}, '_id client employees resources name type start_date deadline budget percentage_complete', function (err, result) {
            if (err||!result) {
                return res.status(404).json({
                    message: "Unable to get projects",
                    error: err
                });
            }
            return res.json(result);
        }).populate('client employees resources');
    });
};


// get projects of client on GET
exports.getClientProjects = function(req, res) {
    clientMiddleware.projectsOfClient(req.params.clientId, function(projects) {
        Project.find({'_id': {$in: projects}}, '_id client employees resources name type start_date deadline budget percentage_complete', function (err, result) {
            if (err||!result) {
                return res.status(404).json({
                    message: "Unable to get projects",
                    error: err
                });
            }
            return res.json(result);
        }).populate('client employees resources');
    });
};
