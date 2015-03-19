var follow = require('follow');
var async = require('async'); 
var opts = {}; // Same options paramters as before 
var feed = new follow.Feed(opts);

var request = require('request');
request.get('http://192.168.1.40/v2_gulberg/admin/api.php?method=getSeqID&type=post&user_id=1888', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log("Get Seq Id",body); // Show the HTML for the Google homepage.
        ////        console.log(body);
        obj = JSON.parse(body);
        console.log("Obj",obj.sequence);
        feed.since = obj.sequence;
    }
    else {
        feed.since = 'now';
    }
});
// **********You can also set values directly.**********
feed.db = "http://gulberg_counter:gulberg_counter@192.168.1.40:4984/db";
feed.include_docs = true;

feed.filter = function(doc, req) {
    if(doc.channels.indexOf("website") > -1 || doc.channels.indexOf("v2_gulberg") > -1)
        return true;
    return false;
}
var document;
var method1;
var url;
//**********Queue For Pushing/Performing Tasks********** 
var q = async.queue(function (task, callback) {
    console.log("Task Data",task,task.seq);
    if(task.channels.indexOf("v2_gulberg") >-1 && task.table)
    {
        method1 = 'syncData';
    }
    if(method1 == 'syncData')
    {
        request({
            method: 'POST',
            url:'http://192.168.1.40/v2_gulberg/admin/api.php?method='+method1+'&type=post&user_id=1888', 
            form:(task)
        
        }, function (error, response, body) {
            callback();
            console.log('No of errors in post response:'+ error)
            if (!error && response.statusCode == 200) {
                console.log('Response='+response.statusCode);
                console.log('Getting body response:'+ body+ '*******Body Response Ended...!*******'); // Show the HTML for the Google homepage. 
            }
        });
    }
    else
    {
        console.log("No such method exists for this type of Document to Post Data.");
    }      
}, 1); 
//**********Monitoring Every Change In Database**********
feed.on('change', function(change) {

    console.log(change.seq,change.id);
    var doc =change.doc
    doc.seq = change.seq;
    q.push(doc, function (err) {
        });
})
//**********Throwing Error/Exceptions in Case of Follow Data Changes**********
feed.on('error', function(er) {
    console.error('Since Follow always retries on errors, this must be serious');
    //    throw er;
    setTimeout(function() {
        feed.follow()
    }, 5*60*1000);
})
feed.follow();