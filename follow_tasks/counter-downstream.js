var follow = require('follow');
var async = require('async'); 
var Datastore = require('nedb');
// var db = new Datastore({ filename: 'db', autoload:true });
var login = 'kohsar_counter';
var folder = 'v2_gulberg';
var host = '192.168.1.40';
var opts = {}; // Same options paramters as before 
var feed = new follow.Feed(opts);
var request = require('request');

// **********You can also set values directly.**********
feed.db = "http://"+login+":"+login+"@192.168.1.40:4984/db";
feed.include_docs = true;


//Find last seq change in datastore against done task to start our Feed from that change

request.post('http://'+host+'/'+folder+'/admin/api.php?method=getSeqID&type=post&user_id=1888', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log("Get Seq Id",body); 
        obj = JSON.parse(body);
        feed.since = obj.sequence || 'now';
    }
    else {
        feed.since = 'now';
    }
     feed.follow();
});

//**********Start Queue For Pushing/Performing Tasks********** 
var q = async.queue(function (task, callback) {
    console.log(task);
    //    callback();
    request({
        method: 'POST',
        url:'http://'+host+'/'+folder+'/admin/api.php?method=syncData&type=post&user_id=1888', 
        form:(task)
    }, function (error, response, body) {
        
        try {
            res = JSON.parse(body);
             callback(!res);
        }catch(E){
                callback(E);
            }
        
        
        if (!error && response.statusCode == 200) {
                   console.log('Getting body response:'+ body+ '*******Body Response Ended...!*******'); // Show the HTML for the Google homepage. 
        }
    });
}, 1); 

//**********End Queue For Pushing/Performing Tasks**********

//**********Start Failed Operations Queue For Pushing/Performing Tasks**********

var failedQueue = async.queue(function (task, callback) {
//    console.log(task);
    //    callback();
    var data = {
        to : 'arsalan.zahoor@esajeesolutions.com', 
        subject : 'Operation Failed-'+login, 
        body : JSON.stringify(task)
    };
    request({
        method: 'POST',
        url:'http://'+host+'/'+folder+'/admin/api.php?method=sendEmail&type=post&user_id=1888', 
        form:(data)
    //        json:true
        
    }, function (error, response, body) {
//        console.log("email body",body,  'http://'+host+'/'+folder+'/admin/api.php?method=sendEmail&type=post&user_id=1888' )
        callback(error, response);
        if (!error && response.statusCode == 200) {
        //        var obj = JSON.parse(body);
        }
    });
}, 1); 

//**********End Failed Operations Queue For Pushing/Performing Tasks**********

//**********Monitoring Every Change In Database/Server**********
feed.on('change', function(change) {
console.log(change.seq);
    var doc =change.doc;
     doc.seq = change.seq;
    q.push(doc, function (err) {
        console.log("cakkvacj", err)
        if(err)
        {
            console.log("failed queue");
            failedQueue.push(doc);
            // needs to note failed seq here
        }
    });
})
var retry = 0;
//**********Throwing Error/Exceptions in Case of Follow Data Changes**********
feed.on('error', function(er) {
    console.error('Since Follow always retries on errors, this must be serious', retry++);
    setTimeout(function() {
        feed.follow()
    }, 2*60*1000); // 2 minutes
});
//**********Exception Function for any case of Exception if Got then Post a request for sending an Email with Error in body**********
process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
    var data = {
        to : 'notify@esajeesolutions.com', 
        subject : 'Exception At-'+login, 
        body : err.toString()
    };
    request({
        method: 'POST',
        url:'http://'+host+'/'+folder+'/admin/api.php?method=sendEmail&type=post&user_id=1888', 
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