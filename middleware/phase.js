const Task = require('../models/task');

module.exports.tasksOfPhase = function(phaseId, callback) {
    let tasks = [];
    Task.find({'phase': phaseId}, '_id', function (err, result) {
        if (err) {
            return json(err);
        }
        for(let i=0; i<result.length; i++) {
            tasks[i] = result[i]._id;
        }
        return callback(tasks);
    })
};