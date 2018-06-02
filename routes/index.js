var express = require('express');
var router = express.Router();

 //GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/*router.get('/', function(req, res) {
    res.redirect('/client');
});

router.get('/employee', function(req, res) {
    res.redirect('/employee');
});

router.get('/resource', function(req, res) {
    res.redirect('/resource');
});

router.get('/project', function(req, res) {
    res.redirect('/project');
});

router.get('/phase', function(req, res) {
    res.redirect('/phase');
});

router.get('/task', function(req, res) {
    res.redirect('/task');
});*/


module.exports = router;
