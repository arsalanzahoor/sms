var follow = require('follow');
var async = require('async'); 
var opts = {}; // Same options paramters as before 
var feed = new follow.Feed(opts);

 
//var obj;
var request = require('request');
//request.get('http://localhost:8080/api/log', function (error, response, body) {
//    if (!error && response.statusCode == 200) {
//                console.log(body); // Show the HTML for the Google homepage.
////        console.log(body);
//        obj = JSON.parse(body);
//        console.log(obj.data);
        feed.since = 'now';
//        feed.follow();

/*follow({db:"http://ISE:ISE@192.168.1.15:4984/esajee-sync", include_docs:true,since:'now'}, function(error, change) {
  if(!error) {
    console.log("Change " + change.seq + " has " + Object.keys(change.doc).length + " fields");
  }
})*/
//    }
//})
 

// You can also set values directly. 
feed.db            = "http://dev:dev@192.168.1.40:4984/db";
feed.include_docs = true;
//feed.since         = 'now';
//feed.heartbeat     = 30    * 1000
//feed.inactivity_ms = 86400 * 1000;
feed.filter = function(doc, req) {
  // req.query is the parameters from the _changes request and also feed.query_params. 
//  console.log('Filtering for query: ' + JSON.stringify(req.query));
//  console.log(doc);
 
  if(doc.isFinalize)
    return true;
  return false;
}
//feed.document = function(doc, req) {
//    console.log(doc);
//}
var q = async.queue(function (task, callback) {
//    console.log(task);
//    callback();
   
//    var qty = eval('0' + task.change_qty );
// console.log(qty)

        request({
        method: 'POST',
        url:'http://192.168.1.40/v2_kohsar/admin/api.php?method=processAdjustmentData&user_id=1888&type=post', 
        form:(task)
//        json:true
        
    }, function (error, response, body) {
        callback();
        console.log(body)
        if (!error && response.statusCode == 200) {
//            console.log(body); // Show the HTML for the Google homepage. 
        //        var obj = JSON.parse(body);
        }
    });
       
    }, 1); 
feed.on('change', function(change) {

console.log(change.doc,change.seq,change.id);
var doc =change.doc
//    console.log('Document id ' + change.id + ' is change with sequence id ' + change.seq,  change.doc);
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