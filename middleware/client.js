const Project = require('../models/project');


module.exports.projectsOfClient = function(clientId, callback) {
    let projects = [];
    Project.find({'client': clientId}, '_id', function (err, result) {
        if (err) {
            return json(err);
        }
        for(let i=0; i<result.length; i++) {
            projects[i] = result[i]._id;
        }
        return callback(projects);
    })
};