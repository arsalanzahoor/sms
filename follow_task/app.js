// app.js
// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
//var mysql   = require('mysql');
var total_records=null;
var async = require('async');

var request = require('request');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
var port = process.env.PORT || 3001;        // set our port
var router = express.Router();              // get an instance of the express Router
router.use(function(req, res, next) {
    // do logging
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({
        message: 'hooray! welcome to our api!'
    });   
});

//**********Queue For Pushing/Performing Tasks**********
var q = async.queue(function (task, callback) {
    //    callback();
    var url;
    var data;
    if(task.method=='startPosClosing')
    {
        url = task.url;
        data = task.data;
    }
    else if(task.method=='getSaleData')
    {
        url = task.url;
        data = task.data;
    }
    var ro = {
        method: 'POST',
        url:url,
        form: data
    //        json:true
        
    };
    request(ro, function (error, response, body) {
        callback();
        if (!error && response.statusCode == 200) {
            console.log(body, typeof body); // Show the HTML for the Google homepage. 
            if(task.calbackurl!='')
            {
                request({
                    url:task.callbackurl,
                    form:JSON.parse(body), 
                    method: 'POST'
                },function(error,response2,body2) {
                    console.log(body2,response2.statusCode);
                    if(task.updatesaleurl)
                    {
                        request({
                            url:task.updatesaleurl,
                            form:JSON.parse(body2), 
                            method: 'POST'
                        },function(error,response3,body3) {
                            if (!error && response3.statusCode == 200) {
                                console.log(body3,response3.statusCode);
                            }
                        });
                    }
                });
            }
        }
    });
       
}, 1);
//**********Log Route**********
router.route('/log')
    
    
    .get(function(req, res){
        res.json({
            data:'now'
        });
    })

    .post(function(req, res) {
        //        req.body.channels = ['main_kohsar'];
        console.log(req.body);

        res.send(true);
        q.push(req.body);
    });

//****************************************************************************

//**********Test route**********
router.route('/test')
    
    
    .get(function(req, res){
        res.json({
            data:'now'
        });
    })

    .post(function(req, res) {
        console.log(req.body);
        res.send(true);
    //          json: true
        
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('attendence server started at ' + port);
