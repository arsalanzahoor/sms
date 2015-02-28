
// app.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
//var mysql   = require('mysql');
var total_records=null;
var async = require('async');
<<<<<<< HEAD
=======
var total_attenedence=null;
>>>>>>> 032b2e58d13f194314cfc29e48b49943bdfb8e3b
var request = require('request');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

<<<<<<< HEAD
var port = process.env.PORT || 3001;        // set our port
=======
var port = process.env.PORT || 8080;        // set our port
>>>>>>> 032b2e58d13f194314cfc29e48b49943bdfb8e3b

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
var q = async.queue(function (task, callback) {
    //    console.log(task);
    //    callback();
    var url;
    var data;
    //    var qty = eval('0' + task.change_qty );
    // console.log(qty)
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
    //    console.log(ro);
    request(ro, function (error, response, body) {
        callback();
        //        console.log(body,response.statusCode)
        if (!error && response.statusCode == 200) {
            console.log(body, typeof body); // Show the HTML for the Google homepage. 
            //        var obj = JSON.parse(body);
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
//q.push({
//    url: 'http://192.168.1.40/v2_gulberg/admin/api.php?method=startPosClosing&type=post&user_id=1888&currentid=3530',
//    method: 'startPosClosing',
//    data: {
//        a:1
//    }
//});
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
    //        request.post({
    //        url:'http://dev:dev@192.168.1.15:4984/db', 
    //        json: true,
    //        body: req.body
    //    }, function (error, response, body) {
    //        console.log(error, response)
    //        if (!error && response.statusCode == 200) {
    //            console.log(body); // Show the HTML for the Google homepage. 
    //        //        var obj = JSON.parse(body);
    //        }
    //    })
        
    });

//****************************************************************************


router.route('/test')
    
    
    .get(function(req, res){
        res.json({
            data:'now'
        });
    })

    .post(function(req, res) {
        //        req.body.channels = ['main_kohsar'];
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
