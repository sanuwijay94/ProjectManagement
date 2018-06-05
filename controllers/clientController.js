const Client = require('../models/client');
const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1:27017/projectManagement';
const { validate } = require('indicative');


// Display list of all Client.
exports.client_list = function(req, res) {
    Client.find({}, '_id name type phone email username password', function (err, result) {
        if (err) {
            return res.json({
                message: "Unable to get all clients",
                error: err
            });
        }
        else {
            return res.json(result);
        }
    });
};


// Display detail page for a specific Client.
exports.client_detail = function(req, res) {
    Client.findById({'_id': req.params.id}, '_id name type phone email username password', function (err, result) {
        if (err) {
            return res.json({
                message: "Unable to get the client",
                error: err
            });
        }
        else {
            return res.json(result);
        }
    });
};


// Display Client create form on GET.
exports.client_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Client create GET');
};


// Handle Client create on POST.
exports.client_create_post = function(req, res) {
    mongoose.connect(mongoDB);
    mongoose.Promise = global.Promise;
    mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

    const data ={
        name: req.body.name,
        type: req.body.type,
        phone: req.body.phone,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    };

    const rules = {
        name: 'required',
        type: 'required',
        phone: 'required',
        email: 'email',
        username: 'required',
        password: 'required|min:4|max:40'
    };

    validate(data, rules)
        .then(() => {
            const client = new Client(
            {
                name: req.body.name,
                type: req.body.type,
                phone: req.body.phone,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            });
            client.save(function (err) {
                if (err) {
                    return res.json(err);
                }
                return res.json(client);
            });

        })
        .catch((errors) => {
            return res.json({errors});
        });

    mongoose.connection.close();
};


// Display Client delete form on GET.
exports.client_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Client delete GET');
};


// Handle Client delete on POST.
exports.client_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Client delete POST');
};


// Display Client update form on GET.
exports.client_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Client update GET');
};


// Handle Client update on POST.
exports.client_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Client update POST');
};