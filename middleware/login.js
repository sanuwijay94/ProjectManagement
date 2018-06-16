const jwt = require('jsonwebtoken');
const Client = require('../models/client');
const Employee = require('../models/employee');

exports.login = function(req, res) {
    Client.findOne({username: req.body.username},'name email username password ', function (err, client) {
        if (err || !client) {
            Employee.findOne({username: req.body.username}, 'first_name email username password ', function (err, employee) {
                //User not found
                if (err || !employee) {
                    return res.json({
                        error: 'User not found'
                    });
                }
                else {
                    // Wrong password
                    if (employee.password !== req.body.password) {
                        res.status(401).json({
                            success: false,
                            message: 'Authentication failed. Wrong password.'
                        });
                    }
                    // Correct Password
                    else {
                        const tokenDetails = {
                            username: employee.username,
                            name: employee.first_name,
                            email: employee.email
                        };

                        // Create token
                        const token = jwt.sign(tokenDetails, 'secret', {
                            expiresIn: '10m'
                        });

                        return res.json({
                            success: true,
                            message: 'Successfully logged in as Employee',
                            token: token
                        });
                    }
                }
            });
        }
        else {
            // Wrong password
            if (client.password !== req.body.password) {
                res.status(401).json({
                    success: false,
                    message: 'Authentication failed. Wrong password.'
                });
            }
            // Correct Password
            else {
                const tokenDetails = {
                    username: client.username,
                    name: client.name,
                    email: client.email
                };

                // Create token
                const token = jwt.sign(tokenDetails, 'secret', {
                    expiresIn: '10m'
                });

                return res.json({
                    success: true,
                    message: 'Successfully logged in as Client',
                    token: token
                });
            }
        }
    });
};




