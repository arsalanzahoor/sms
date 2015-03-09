var follow = require('follow');
var async = require('async'); 
var opts = {}; // Same options paramters as before 
var feed = new follow.Feed(opts);

 
var request = require('request');
        feed.since = 'now';
feed.db            = "http://accounts:accounts@192.168.1.40:4984/db";
feed.include_docs = true;

var q = async.queue(function (task, callback) {
    console.log(task);
//    callback();  
   console.log('tasks params', 1, task.method);
   var requestOptions = {};
   requestOptions.method = 'GET' || task.method;
   if(requestOptions.method == 'GET') {
     requestOptions.useQuerystring = true;
     requestOptions.qs = task.linkData  || {};
   } else {
     requestOptions.json = true;
     requestOptions.form = task.linkData || {};
   }
   requestOptions.url = task.url;
console.log(requestOptions)
   request(requestOptions, function(error, response, body){
     console.log('response statusCode', 1, response.statusCode);
     if(!error && ( response.statusCode == 200 || response.statusCode == 501)) {

       // means we need to callback url
       if(task.trip == 1 && task.callback) {
         q.push({url: task.callback, method: task.callbackMethod, trip: 2, data: task.callbackData}) 
       }
     } else {
       // re - try in 1 hour
       task.retry++; 

       if(task.retry < 4 ) {
         q.push(task);  
       } else {
        // Todo:: send dev user email 
       }
       
     }
     
     callback();
   });

       
    }, 1); 
feed.on('change', function(change) {

//console.log(change.doc,change.seq,change.id);
var doc =change.doc
doc.trip = 1;
doc.retry = 0;
        q.push(doc, function (err) {
            console.log('finished processing task', err);
        });

})
 
feed.on('error', function(er) {
    console.error('Since Follow always retries on errors, this must be serious');
    throw er;
})
feed.follow();