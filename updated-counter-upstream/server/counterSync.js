'use strict'
var async = require('async');
var trim   = require('trim');
var express = require('express');
var app = express(),
port = process.env.PORT || 3001,
bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
    extended: true
})); 
var reqs = require('request');
var Primus = require('primus');
var router = express.Router();
router.use(function(req, res, next) {
    next(); 
});
router.get('/', function(req, res) {
    res.json({
        message: 'welcome to our api!'
    });
});
//====================================
var counter_no = 3;
var counter_id = 'gulberg_counter';
var folder = 'v2_gulberg';
var url = 'http://192.168.1.40/'+folder+'/admin/api.php?type=post&user_id=1888';
var localid;
var serverid=0;
var data;
function initiateRequest(url,serverid2,counter_no,qstatus) {
    reqs.post(url+'&method=getOpenClosing',{
        form:{
            counter:counter_no
        }
    }, function(err, res, body) {
        console.log('Error at Initiate Request:',err,'Server Id:',serverid2);
        if (!err && res.statusCode == 200) {
            body = trim(body);    
            var result = JSON.parse(body);
            console.log('After Parsing Body Result:',result);
            if(result && result.pkclosingid > 0) {
                if(result.serverclosingid > 0) {
                    serverid = result.serverclosingid;
                    console.log('Server Id:', serverid);
                }
                else{
                    var r = {};
                    r.data = result;
                    r.closingsession = result.pkclosingid;
                    r.user_id = result.fkaddressbookid;
                    reqs({
                        method:'POST',
                        url:url+'&method=initClosing', 
                        form:(r)
                    },function(e, r, b) {
                        console.log('Info Initclosing Error and Body:', e, b);
                    });
                }
            }
            else {
                if(qstatus){
                    serverid = 0;
                }
            }
        }
    });
    //Get Request For Unsync Closings
    reqs.get('http://192.168.1.40/v2_gulberg/admin/api.php?method=unSyncClosings&type=post&user_id=1888', function(error,response,body) {
        console.log('error,response statuscode and body:',error,response.stausCode,body);
        if(!error && response.stausCode == 200 && body.length > 0) {
            reqs('GET','http://localhost:8081/admin/autosendclosing.php',function(er, re, bo){
                console.log('auto send link call and got response:',er,re.statusCode,bo);
            });
        }
    });
}
//default call to initiate for server/closing id
initiateRequest(url,serverid,counter_no,1); 
//**********Queue For Pushing/Performing Tasks for Get Sale Data**********
var q2 = async.queue(appFunction, 1);
q2.pause();
//====================================
router.route('/log')
    .post(function(req, res) {
        console.log('Request Body:',req.body);
        var post=req.body;
        res.json({
            message: 'ok'
        });
        console.log('Post Method:',post.method);
        //====================================
        if(post.method == 'getSaleData'){
            var options = {
                url: post.url,
                form:post.data,
                method: 'POST'
            };
            reqs(options, function(error, response, body) { 
                var da={};
                da.url = post.serverurl;
                da.method=post.method;
                if(post.updatesaleurl)
                    da.updatesaleurl=post.updatesaleurl;
                if(post.callbackurl)
                    da.callbackurl=post.callbackurl;
                da.data=body;
                if (serverid){
                    appFunction(da)
                } else {
                    q2.push(da);
                    initiateRequest(url,serverid,counter_no,0);
                }
            });
        }
        //====================================
        else if (post.method=="stopPosClosing"){
            serverid=0;
            var options = {
                url: post.url,
                form:post.data,
                // json:1,
                method: 'POST'
            };
            reqs(options, function(error, response, body) {
                if (response.statusCode==200) {
                    stopposfunction(post);
                };
            });
        } 
        //====================================
        else if (post.method == 'startPosClosing' || post.method == 'processPayOutData' || post.method == 'processcDemandData' || post.method == 'uploadClosingData'){
            var da={};
            da.url = post.serverurl;
            da.method=post.method;
            if(post.callbackurl)
                da.callbackurl=post.callbackurl;
            da.data=(post.data);
            if(post.method == 'processPayOutData' && serverid == 0){
                q2.push(da);
                initiateRequest(url,serverid,counter_no,0);
            } else {
                appFunction(da);
            }
        }
    });
app.use('/api', router);
var server=app.listen(port);
var primus = new Primus(server);
var Socket = primus.Socket;
var client = new Socket('http://localhost:8080/primus', {
    reconnect: {
        max: 15000 // Number: The max delay before we try to reconnect.
        , 
        min: 1000 // Number: The minimum delay before we try reconnect.
        , 
        retries: 10000 // Number: How many times we shoult try to reconnect.
        , 
        factor: 1
    }
});

client.on('open', function(){
    console.log('connected'.green)
});
client.on('error', function error(err) {
    console.error('connection error:', err.stack);
});
client.on('reconnect', function (opts) {
    console.log('Reconnection attempt started', opts);
});
client.on('reconnect scheduled:', function (opts) {
    console.log('Reconnecting in %d ms:', opts.scheduled);
    console.log('This is attempt %d out of %d:', opts.attempt, opts.retries);
});
client.on('reconnected', function (opts) {
    console.log('It took  ms to reconnect:', opts);
});
client.on('reconnect timeout', function (err, opts) {
    console.log('Timeout expired: %s', err.message);
});
client.on('reconnect failed', function (err, opts) {
    console.log('The reconnection failed %s', err.message);
});
client.on('end', function () {
    console.log('Connection closed.');
});
client.on('online', function () {
    console.log('Online.');
});
client.on('offline', function () {
    console.log('offline.');
});
client.on('data', function(data){
    if(data.event  ){
        client.emit(data.event, data);
    } 
});
client.on('processcDemandData', function (data) {
    requestfunction(data);
});
client.on('getSaleData', function (data) {
    requestfunction(data);
});
client.on('processPayOutData', function (data) {
    requestfunction(data);
});
client.on('startPosClosing', function (data) {
    var d = JSON.parse(data.data);
    serverid = d.serverid;
    q2.resume();
    requestfunction(data);
});
client.on('uploadClosingData', function (data) {
    requestfunction(data);
});
client.on('stopPosClosing', function (data) {
    stopposfunction(data);
});
//===========================FUNCTIONS=============================
function requestfunction(data,options){
    var defaultoptions = {
        url: data.callbackurl,
        form:JSON.parse(data.data),
        method: 'POST'
    };
    if(!options){
        options = defaultoptions;
    }
    reqs(options, function(error, response, body) {
        console.log('\n=================\nREQUEST FUNCTION BODY\n=================\n',body)
    });
};
//=================================================================
function stopposfunction(data,options){
    console.log('\n=================\nSTOP POST FUNCTION DATA\n=================\n',data);
    var defaultoptions = {
        url: data.callbackurl,
        form:data.data,
        method: 'POST'
    };
    if(!options){
        options = defaultoptions;
    }
    reqs(options, function(error, response, body) {
        });
};
function appFunction(da){
    client.write({
        event:'action', 
        params: {
            action: 'processCounter', 
            post: da
        }
    });
};
//**********Exception Function for any case of Exception if Got then Post a request for sending an Email with Error in body**********
process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' , err.toString());
    var data = {
        to : 'notify@esajeesolutions.com', 
        subject : 'Exception At-'+counter_id+' '+counter_no, 
        body : err.toString()+' from file:'+__filename
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
            console.log("Email Post Response body:",body)
        }
    });
});