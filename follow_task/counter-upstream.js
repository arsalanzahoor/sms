
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

//**************BEGIN OF FOLLOW********************
var follow = require('follow');

var opts = {}; // Same options paramters as before 
var feed = new follow.Feed(opts);

feed.since = 'now';


// You can also set values directly. 
feed.db = "http://website:website@192.168.1.40:4984/db";
feed.include_docs = true;

feed.on('change', function(change) {

    console.log(change.doc,change.seq,change.id);

})
 
//**************END OF FOLLOW********************


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

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({
        message: 'hooray! welcome to our api!'
    });   
});
var localid;
var serverid = 0;
var url;
var data;
var q2 = async.queue(appFunction, 1);
q2.pause();
// more routes for our API will happen here
var q = async.queue(appFunction, 1);

function appFunction(task, callback) {
  
    var ro = {
        method: 'POST',
        url:task.url,
        form: task.data
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
                    if(task.method == 'startPosClosing')
                    {
                        serverid = body2.serverid;
                        q2.resume();
                    }
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
}

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
        var task = req.body;
        if(task.method=='startPosClosing' )
        {
            localid = task.currentid;
            q.push(task);
        }
        else if(task.method=='getSaleData' && serverid == 0)
        {
            q2.push(task);
        }
        else if(serverid >0){
       
            q.push(task);
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
console.log('attendence server started at ' + port);

feed.on('error', function(er) {
    console.error('Since Follow always retries on errors, this must be serious');
    throw er;
})
feed.follow();
process.on('uncaughtException', function(err) { console.log('Caught exception: ' + err); });