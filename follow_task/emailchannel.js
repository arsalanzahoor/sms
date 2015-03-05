var follow = require('follow');
var async = require('async'); 
var opts = {}; // Same options paramters as before 
var feed = new follow.Feed(opts);

 
//var obj;
var request = require('request');

        feed.since = 'now';
//        feed.follow();

// You can also set values directly. 
feed.db = "http://email:email@192.168.1.40:4984/db";
feed.include_docs = true;
//feed.since         = 'now';
//feed.heartbeat     = 30    * 1000
//feed.inactivity_ms = 86400 * 1000;
feed.filter = function(doc, req) {
  // req.query is the parameters from the _changes request and also feed.query_params. 
//  console.log('Filtering for query: ' + JSON.stringify(req.query));
//  console.log(doc);
 
  if(doc.channels.indexOf('email') != -1)
    return true;
  return false;
}
//feed.document = function(doc, req) {
//    console.log(doc);
//}
var q = async.queue(function (task, callback) {
//    console.log(task);
//    callback();
   
  
   console.log('tasks params', 1, task.method,task);
//   console.log(task);
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
//console.log(requestOptions,task.url)
   request(requestOptions, function(error, response, body){
     console.log('Response Status Code:', response.statusCode);
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
//doc.trip = 1;
//doc.retry = 0;
    console.log('Document id ' + change.id + ' is change with sequence id ' + change.seq);
//    if(doc){
        
//            if(doc.data.retail_price){
//                console.log( doc.data.retail_price)
//                doc.data.retail_price = doc.data.retail_price + 100;
//            }

//    }
        q.push(doc, function (err) {
//            console.log('finished processing task');
        });


    //var request = require('request');
    

    

})
 
feed.on('error', function(er) {
    console.error('Since Follow always retries on errors, this must be serious');
    throw er;
})
feed.follow();



