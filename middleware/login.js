const jwt = require('jsonwebtoken');
const Client = require('../models/client');
const Employee = require('../models/employee');
const Admin = require('../models/admin');

foundUser=function(req, res, user){
    // Wrong password
    if (user.password !== req.body.password) {
        res.status(401).json({
            success: false,
            message: 'Authentication failed. Wrong password.'
        });
    }
    // Correct Password
    else {
        const tokenDetails = {
            username: user.username,
            name: user.first_name
        };
        // Create token
        let token = jwt.sign(tokenDetails, 'secret', {
            expiresIn: '50m'
        });
        //add user type for the token
        switch(user.type) {
            case 'PM':
                token = token+'P';
                console.log('PM');
                break;
            case 'Dev':
                token = token+'D';
                console.log('Dev');
                break;
            case 'QA':
                token = token+'Q';
                console.log('QA');
                break;
            case 'BA':
                token = token+'B';
                console.log('BA');
                break;
            case 'Organization':
            case 'Company':
            case 'Person':
                token = token+'C';
                console.log('Client');
                break;
            case 'admin':
                token = token+'A';
                console.log('Admin');
                break;
            default:
                console.log('no type');
                return res.json({
                    error: 'User type not found',
                });
        }
        //console.log(result);
        return res.json({
            success: true,
            message: 'Successfully logged in',
            token: token,
            user: user
        });
    }
};


exports.login = function(req, res) {
    Client.findOne({username: req.body.username},'_id name email type username password ', function (err, client) {
        if (err || !client) {
            Employee.findOne({username: req.body.username}, '_id first_name email type username password ', function (err, employee) {
                if (err || !employee) {
                    Admin.findOne({username: req.body.username}, '_id username password type ', function (err, admin){
                        //User not found
                        if (err || !admin) {
                            return res.status(401).json({
                                success: false,
                                error: 'User not found'
                            });
                        }
                        else {
                            foundUser(req, res, admin)
                        }
                    });
                }
                else {
                    foundUser(req, res, employee)
                }
            });
        }
        else {
            foundUser(req, res, client)
        }
    });
};




