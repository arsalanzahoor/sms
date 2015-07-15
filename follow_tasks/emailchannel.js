//emailchannel.js
var follow = require('follow');
var async = require('async'); 
var opts = {}; // Same options paramters as before 
var feed = new follow.Feed(opts); 
var request = require('request');
feed.since = 'now';

// You can also set values directly. 
feed.db = "http://email:email@192.168.1.40:4984/db";
feed.include_docs = true;
//**********filtering Documents to perform task on**********
feed.filter = function(doc, req) {
 
    if(doc.channels.indexOf('email') != -1)
        return true;
    return false;
}
//**********Queue For Pushing/Performing Tasks**********
var q = async.queue(function (task, callback) {
    //    callback();
  
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
    request(requestOptions, function(error, response, body){
        console.log('Response Status Code:', response.statusCode);
        if(!error && ( response.statusCode == 200 || response.statusCode == 501)) {

            // means we need to callback url
            if(task.trip == 1 && task.callback) {
                q.push({
                    url: task.callback, 
                    method: task.callbackMethod, 
                    trip: 2, 
                    data: task.callbackData
                    }) 
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
//**********Monitoring Every Change In Database**********
feed.on('change', function(change) {

    var doc =change.doc
    console.log('Document id ' + change.id + ' is change with sequence id ' + change.seq);
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
//start feed
feed.follow();