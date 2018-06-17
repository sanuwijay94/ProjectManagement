const Project = require('../models/project');


module.exports.deleteResourceFromProject = function(projId, resourceId) {
    Project.findById({'_id': projId}, 'resources', function (err, result) {
        if (err) {
            return json(err);
        }
        const index = result['resources'].indexOf(resourceId);
        if (index !== -1) {
            result['resources'].splice(index, 1);
        }
        Project.update({'_id': projId}, {$set: { 'resources': result['resources'] }}, function (err, result) {
            if (err) {
                return json(err);
            }
            return result['resources'];
        })
    })
};

module.exports.projectsOfResource = function(resourceId, callback){
    let projects = [];
    Project.find({'resources': resourceId}, '_id', function (err, result) {
        if (err) {
            return json(err);
        }
        for(let i=0; i<result.length; i++) {
            projects[i] = result[i]._id;
        }
        return callback(projects);
    })
};

