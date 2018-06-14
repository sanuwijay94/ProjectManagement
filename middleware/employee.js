const Project = require('../models/project');


module.exports.deleteEmployeeFromProject = function(projId, empId) {
    Project.findById({'_id': projId}, 'employees', function (err, result) {
        if (err) {
            return json(err);
        }
        const index = result['employees'].indexOf(empId);
        if (index !== -1) {
            result['employees'].splice(index, 1);
        }
       Project.update({'_id': projId}, {$set: { 'employees': result['employees'] }}, function (err, result) {
            if (err) {
                return json(err);
            }
            return result['employees'];
        })
    })
};

module.exports.projectsOfEmployee = function(empId, callback){
    let projects = [];
    Project.find({'employees': [empId]}, '_id', function (err, result) {
        if (err) {
            return json(err);
        }
        for(let i=0; i<result.length; i++) {
            projects[i] = result[i]._id;
        }
        return callback(projects);
    })
};




