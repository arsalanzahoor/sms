var follow = require('follow');
var async = require('async'); 
var Datastore = require('nedb');
var db = new Datastore({ filename: 'db', autoload:true });
var login = 'gulberg_counter';
var folder = 'v2_gulberg';
var opts = {}; // Same options paramters as before 
var feed = new follow.Feed(opts);
var request = require('request');
var port = process.env.PORT || 3002;
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var router = express.Router();              // get an instance of the express Router
router.use(function(req, res, next) {
    // do logging
    next(); // make sure we go to the next routes and don't stop here
});


// **********You can also set values directly.**********
feed.db = "http://"+login+":"+login+"@192.168.1.40:4984/db";
feed.include_docs = true;

db.ensureIndex({ _id: 'feedSeq',  unique: true }, function (err) {
  // If there was an error, err is not null
});
//Find last seq change in datastore against done task to start our Feed from that change
db.findOne({ _id: 'feedSeq' }, function (err, doc) {
    
    if(doc) {
        feed.since = doc.seq;
    } else {
        feed.since = 'now';
    }
    console.log(feed.since, err)
    feed.follow();
});

//**********Start Queue For Pushing/Performing Tasks********** 
var q = async.queue(function (task, callback) {
    //    callback();
    request({
        method: 'POST',
        url:'http://localhost/'+folder+'/admin/api.php?method=syncData&type=post&user_id=1888', 
        form:(task)
    }, function (error, response, body) {
        callback(error, response);
        if (!error && response.statusCode == 200) {
                   console.log('Getting body response:'+ body+ '*******Body Response Ended...!*******'); // Show the HTML for the Google homepage. 
        }
    });
}, 1); 

//**********End Queue For Pushing/Performing Tasks**********

//**********Start Failed Operations Queue For Pushing/Performing Tasks**********

var failedQueue = async.queue(function (task, callback) {
    console.log(task);
    //    callback();
    var data = {
        to : 'notify@esajeesolutions.com', 
        subject : 'Operation Failed-'+login, 
        body : JSON.stringify(task)
    };
    request({
        method: 'POST',
        url:'http://localhost/'+folder+'/admin/api.php?method=sendEmail&type=post&user_id=1888', 
        form:(data)
    //        json:true
        
    }, function (error, response, body) {
        callback(error, response);
        if (!error && response.statusCode == 200) {
        //        var obj = JSON.parse(body);
        }
    });
}, 1); 

//**********End Failed Operations Queue For Pushing/Performing Tasks**********

//**********Monitoring Every Change In Database/Server**********
feed.on('change', function(change) {
    var doc =change.doc;
    q.push(doc, function (err) {
        console.log(err)
        if(!err)
        {
            // Replace a change sequence by last updated
            db.update({
                _id: 'feedSeq'
            }, {
                  $set: {seq: change.seq } 
            }, {
                
            }, function (error, numReplaced) {
                console.log(error, numReplaced)
                });
        }
        else 
        {
            // Inserting a change sequence by failed task/queue
            db.insert({
                type:'failedSeq', 
                seqid: change.seq
            }, function (error, newDoc) {
                failedQueue.push(change, function(err){
                    });
            });
        }
    });
})
//**********Throwing Error/Exceptions in Case of Follow Data Changes**********
feed.on('error', function(er) {
    console.error('Since Follow always retries on errors, this must be serious');
    throw er;
})
//**********Exception Function for any case of Exception if Got then Post a request for sending an Email with Error in body**********
process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
    var data = {
        to : 'notify@esajeesolutions.com', 
        subject : 'Exception At-'+login, 
        body : JSON.stringify(err)
    };
    request({
        method: 'POST',
        url:'http://192.168.1.41/'+folder+'/admin/api.php?method=sendEmail&type=post&user_id=1888', 
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

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('sync downstream counter server started at ' + port);
//**********Health Route For Service Status**********

router.route('/health')
      
    .get(function(req, res){
        res.send(true);
    });
