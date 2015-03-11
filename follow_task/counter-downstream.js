var follow = require('follow');
var async = require('async'); 
var Datastore = require('nedb');
var db = new Datastore();
var login = 'kohsar_counter';
var opts = {}; // Same options paramters as before 
var feed = new follow.Feed(opts);
var request = require('request');
feed.since = 'now';

// **********You can also set values directly.**********
feed.db = "http://"+login+":"+login+"@192.168.1.40:4984/db";
feed.include_docs = true;

//**********Queue For Pushing/Performing Tasks********** 
var q = async.queue(function (task, callback) {
    //    callback();
    request({
        method: 'POST',
        url:'http://192.168.1.41/v2_gulberg/admin/api.php?method=syncData&type=post&user_id=1888', 
        form:(task)
    }, function (error, response, body) {
        callback(error, response);
        if (!error && response.statusCode == 200) {
        //            console.log('Getting body response:'+ body+ '*******Body Response Ended...!*******'); // Show the HTML for the Google homepage. 
        }
    });
}, 1); 

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
        url:'http://192.168.1.40/v2_gulberg/admin/api.php?method=sendEmail&type=post&user_id=1888', 
        form:(data)
    //        json:true
        
    }, function (error, response, body) {
        callback(error, response);
        if (!error && response.statusCode == 200) {
        //        var obj = JSON.parse(body);
        }
    });
}, 1); 


//**********Monitoring Every Change In Database**********
feed.on('change', function(change) {
    var doc =change.doc;
    q.push(doc, function (err) {
        if(!err)
        {
            // Replace a change sequence by last updated
            db.update({
                _idseq: change.seq
            }, {
                _idseq: change.seq
            }, {
                upsert: true
            }, function (error, numReplaced) {
                // numReplaced = 1
                // Note that the _id is kept unchanged, and the document has been replaced
                // (the 'system' and inhabited fields are not here anymore)
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
feed.follow();