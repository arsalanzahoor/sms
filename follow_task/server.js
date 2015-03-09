var follow = require('follow');
var async = require('async'); 
var opts = {}; // Same options paramters as before 
var feed = new follow.Feed(opts);



var obj;
var request = require('request');
request.get('http://localhost:8080/api/log', function (error, response, body) {
    if (!error && response.statusCode == 200) {
                console.log(body); // Show the HTML for the Google homepage.
        obj = JSON.parse(body);
        console.log(obj.data);
        feed.since = obj.data;
        feed.follow();

    }
})
 

// You can also set values directly. 
feed.db            = "http://ISE:ISE@192.168.1.15:4984/esajee-sync";
feed.include_docs = true;
var q = async.queue(function (task, callback) {
    console.log(task.data.retail_price);
//    callback();
    
        request({
        method: 'POST',
        url:'http://192.168.1.19:170/admin/api.php?method=syncData&type=post&user_id=1888', 
        form:(task)
//        json:true
        
    }, function (error, response, body) {
        callback();
        console.log(body)
        if (!error && response.statusCode == 200) {
        }
    });
        
    }, 1); 
feed.on('change', function(change) {
var doc =change.doc
    if(doc){
        
            if(doc.data.retail_price){
                console.log( doc.data.retail_price)
                doc.data.retail_price = doc.data.retail_price + 100;
            }

    }
        q.push(doc, function (err) {
        });
})
 
feed.on('error', function(er) {
    console.error('Since Follow always retries on errors, this must be serious');
    throw er;
})
//feed.follow();