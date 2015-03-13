
// counter-upstream.js

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
//var mysql   = require('mysql');
var total_records=null;
var async = require('async');
var total_attenedence=null;
var request = require('request');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 3001;        // set our port
var router = express.Router();              // get an instance of the express Router
router.use(function(req, res, next) {
    // do logging
    next(); // make sure we go to the next routes and don't stop here
});

var localid;
var serverid = 0;
var url;
var data;
var q2 = async.queue(appFunction, 1);
q2.pause();
// more routes for our API will happen here
var q = async.queue(appFunction, 1);

//generic appFunction for queue's performing tasks 
function appFunction(task, callback) {
    // console.log(task)
    var ro = {
        method: 'POST',
        url:task.url,
        form: task.data
    //        json:true
        
    };
    //Post Request for Task 
    request(ro, function (error, response, body) {
       
        console.log('err', error)
        if (!error && response.statusCode == 200) {
            console.log(body, typeof body); // Show the HTML for the Google homepage. 
            
            if(task.method == 'startPosClosing')
            {
                //body2 = body2.trim() 
                res = JSON.parse(body);
                serverid = res.serverid;
                console.log('server', serverid)
                q2.resume();
            }

            if(task.calbackurl!='')
            {
                request({
                    url:task.callbackurl,
                    form:JSON.parse(body), 
                    method: 'POST'
                },function(error,response2,body2) {
                    console.log('body2',body2,response2.statusCode, typeof body2);
                    
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
        callback();
    });
}
//Log Route
router.route('/log')
      
    .get(function(req, res){
        res.json({
            data:'now'
        });
    })

    .post(function(req, res) {
        //        req.body.channels = ['main_kohsar'];
        // console.log(req.body);

        res.send(true);
        var task = req.body;
        if(task.method=='startPosClosing'  )
        {
            localid = task.currentid;
            q.push(task);
        }
        else if( ( task.method == 'processPayOutData' || task.method == 'getSaleData'  ) && serverid == 0 )
        {
            q2.push(task);
        }
        else if(serverid >0 || task.method == 'stopPosClosing'){
            
            q.push(task);
        } else {
            console.log('No method')
        }

        
    });

//****************************************************************************

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
console.log('sync counter server started at ' + port);
//Exception Function for any case of Exception if Got then Post a request for sending an Email with Error in body
process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
    var data = {
        to : 'notify@esajeesolutions.com', 
        subject : 'Exception At-'+login, 
        body : JSON.stringify(err)
    };
    request({
        method: 'POST',
        url:'http://192.168.1.41/v2_gulberg/admin/api.php?method=sendEmail&type=post&user_id=1888', 
        form:(data)
    //        json:true
        
    }, function (error, response, body) {
        //        callback(error, response);
        if (!error && response.statusCode == 200) {
            //        var obj = JSON.parse(body);
            console.log("body:",body)
        }
    });
});