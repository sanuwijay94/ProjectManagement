var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*
router.get('/', function(req, res) {
    res.send('Hello World!');
});


router.listen(8000, function () {
    console.log('Example app listening on port 8000!')
})
*/
module.exports = router;
