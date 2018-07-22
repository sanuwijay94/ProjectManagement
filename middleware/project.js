const Phase = require('../models/phase');


module.exports.phasesOfProject = function(projId, callback) {
    var phases = [];
    Phase.find({'project': projId}, '_id', function (err, result) {
        if (err) {
            return callback(err);
        }
        for(let i=0; i<result.length; i++) {
            phases[i] = result[i]._id;
        }
        return callback(phases);
    })
};