// counter-upstream.js

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
//var mysql   = require('mysql');
var async = require('async');
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
var counter_no = 3;
var counter_id = 'gulberg_counter';
var folder = 'v2_gulberg';
var url = 'http://192.168.1.41/'+folder+'/admin/api.php?type=post&user_id=1888';
var localid;
var serverid=0;
var data;
//**********Initaiate Function To Get Request for getting data against server closing id to initialise server id**********
function initiateRequest(url,serverid,counter_no,qstatus) {
    request.post(url+'&method=getOpenClosing',{
        form:{
            counter:counter_no
        }
    }, function(err, res, body) {
        if (!err && res.statusCode == 200) {
            result = JSON.parse(body);
            if(result && result.pkclosingid > 0) {
                if(result.serverclosingid > 0) {
                    serverid = result.serverclosingid;
                }
                else{
                    request({
                        method:'POST',
                        url:url+'&method=initClosing', 
                        form:(result)
                    },function(e, r, b) {
                        });
                }
                if(qstatus) {
                    q.resume();
                }
            }
            else {
                if(qstatus){
                    serverid = 0;
                    q.resume();
                }
            }
        }
    });
}
//default call to initiate for server/closing id
initiateRequest(url,serverid,counter_no,1); 
//**********Queue For Pushing/Performing Tasks for Get Sale Data**********
var q2 = async.queue(appFunction, 1);
q2.pause();
// more routes for our API will happen here
//**********Generic Queue For Pushing/Performing Tasks**********
var q = async.queue(appFunction, 1);
q.pause();
//generic appFunction for queue's performing tasks 
function appFunction(task, callback) {
    var ro = {
        method: 'POST',
        url:task.url,
        form: task.data
    //        json:true

    };
    console.log("Server Id2:",serverid,task.method);

    //Post Request for Task 
    request(ro, function (error, response, body) {
        console.log("Server Id2:",serverid,task.method,response.statusCode,error);
        if (!error && response.statusCode == 200) {
            //            console.log(body, typeof body); // Show the HTML for the Google homepage. 
            if(task.method == 'startPosClosing') {
                console.log("startPosClosing",serverid);
                //body2 = body2.trim() 
                res = JSON.parse(body);
                serverid = res.serverid;
                if(serverid != undefined) {
                    q2.resume();
                }
            }
            if(task.calbackurl!='') {
                request({
                    url:task.callbackurl,
                    form:JSON.parse(body), 
                    method: 'POST'
                },function(error2,response2,body2) {
                    console.log('body2',body2,response2.statusCode, typeof body2,error2);
                    
                    if(task.updatesaleurl) {
                        console.log("task update sale url");
                        request({
                            url:task.updatesaleurl,
                            form:JSON.parse(body2), 
                            method: 'POST'
                        },function(error3,response3,body3) {
                            if (!error3 && response3.statusCode == 200) {
                                console.log("body3",body3,response3.statusCode,error3);
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
        console.log("task",task);
        if(task.method=='startPosClosing') {
            console.log("LOG startPosClosing")
            localid = task.currentid;
            q.push(task);
        }
        //        else if( ( task.method == 'processPayOutData' || task.method == 'getSaleData'  ) && serverid == 0 )
        else if(task.method != 'stopPosClosing') {
            if(serverid == 0) {
                console.log("!stopPosClosing body:",req.body);
                console.log("getSaleData")
                q2.push(task);
                initiateRequest(url,serverid,counter_no,0);
            }
            else {
                q.push(task);
            }
        }
        else if(task.method == 'stopPosClosing') {
            q.push(task);
            serverid = 0;
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
//**********Exception Function for any case of Exception if Got then Post a request for sending an Email with Error in body**********
process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
    var data = {
        to : 'notify@esajeesolutions.com', 
        subject : 'Exception At-'+counter_id+' '+counter_no, 
        body : JSON.stringify(err)
    };
    request({
        method: 'POST',
        url:url+'&method=sendEmail', 
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