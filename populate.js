#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async');
var Project = require('./models/project');
var Employee = require('./models/employee');
var Resource = require('./models/resource');
var Client = require('./models/client');
var Phase = require('./models/phase');
var Task = require('./models/task');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var projects = [];
var employees = [];
var resources = [];
var clients = [];
var phases = [];
var tasks = [];

function projectCreate(cb) {
    var project = new Project ({
        name:'Project Management',
        type:'IT',
        start_date:'2017-06-06',
        deadline:'2018-02-06',
        budget:45000,
        percentage_complete:40.5,
        clients: clients[0],
        employees: employees[0],
        resources: resources[0]
    });

    project.save( function (err)
    {
        if (err) {
            cb('project', null);
            return;
        }
        console.log('New Project: ' + project);
        projects.push(project)
        cb(null, project)
    })
}

function employeeCreate(cb) {
    var employee = new Employee(
        {
            first_name: 'sanura',
            last_name: 'wijayarathne',
            date_of_birth: '',
            phone: '0771234563',
            email: 'sanura@gmail.com',
            type: 'Dev',
            status: 'Available',
            username: 'sanuwijay94',
            password: '123'
        });

    employee.save(function (err) {
        if (err) {
            cb('employee', null);
            return;
        }
        console.log('New Employee: ' + employee);
        employees.push(employee);
        cb(null, employee);
    }   );
}

function resourceCreate(cb) {
    var resource = new Resource(
        {
            name: 'server',
            type: 'facilities',
            status: 'Available'
        });
    resource.save(function (err) {
        if (err) {
            cb('resource', null);
            return
        }
        console.log('New Resource ' + resource);
        resources.push(resource);
        cb(null, resource);
    }  );
}


function clientCreate(cb) {
    var client = new Client(
        {
            name: 'WHO',
            type: 'Organization',
            phone: '0729375832',
            email: 'who@gmail.com',
            username: 'WHO2018',
            password: 'who123'
        });
    client.save(function (err) {
        if (err) {
            cb('client', null);
            return
        }
        console.log('New Client: ' + client);
        clients.push(client);
        cb(null, client);
    }  );
}


function phaseCreate(cb) {
    var phase = new Phase(
        {
            name: 'Requirement gathering',
            start_date: '2017-06-06',
            end_date: '',
            project: projects[0]
        });
    phase.save(function (err) {
        if (err) {
            cb('phase', null);
            return
        }
        console.log('New Phase ' + phase);
        phases.push(phase);
        cb(null, phase)
    }  );
}


function taskCreate(cb) {
    var task = new Task(
        {
            description: 'Create Models ',
            employee: employees[0],
            phase: phases[0],
            status: 'on-going'
        });
    task.save(function (err) {
        if (err) {
            cb('task', null);
            return
        }
        console.log('New Task ' + task);
        tasks.push(task);
        cb(null, task)
    }  );
}


function createEmployeeClientResource(cb) {
    async.parallel([
            function(callback) {
                employeeCreate(callback);
            },
            function(callback) {
                clientCreate(callback);
            },
            function(callback) {
                resourceCreate(callback);
            }
        ],
        // optional callback
        cb);
}


function createProject(cb) {
    async.parallel([
            function(callback) {
                projectCreate(callback);
            }
        ],
        // optional callback
        cb);
}

function createBookPhase(cb) {
    async.parallel([
            function(callback) {
                phaseCreate(callback);
            }
        ],
        // Optional callback
        cb);
}

function createTask(cb) {
    async.parallel([
            function(callback) {
                taskCreate(callback);
            }
        ],
        // Optional callback
        cb);
}



async.series([
        createEmployeeClientResource,
        createProject,
        createBookPhase,
        createTask
    ],
// Optional callback
    function(err, results) {
        if (err) {
            console.log('FINAL ERR: '+err);
        }
        else {
            console.log('All done');

        }
        // All done, disconnect from database
        mongoose.connection.close();
    });



