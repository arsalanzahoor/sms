
// app.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
//var mysql   = require('mysql');
var total_records=null;
var total_attenedence=null;
var request = require('request');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var router = express.Router();              // get an instance of the express Router
router.use(function(req, res, next) {
    // do logging
   // console.log('processing request.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({
        message: 'hooray! welcome to our api!'
    });   
});

// more routes for our API will happen here

router.route('/log')
    
    
    .get(function(req, res){
        res.json({data:'now'});
    })

    .post(function(req, res) {
        req.body.channels = ['ISE'];
        res.send(true);
        request.post({
        url:'http://ISE:ISE@192.168.1.15:4984/esajee-sync/', 
        json: true,
        body: req.body
    }, function (error, response, body) {
        console.log(error, response)
        if (!error && response.statusCode == 200) {
            console.log(body); // Show the HTML for the Google homepage. 
        //        var obj = JSON.parse(body);
        }
    })
        
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('attendence server started at ' + port);
