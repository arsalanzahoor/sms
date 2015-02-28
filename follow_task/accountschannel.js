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
 
//  url: 'http://accounts.esajee.com/accounts_test//pos_common_entry.php?username=system admin&type=invoice_voucher&invoiceid=26778&supplierid=1191&invoice_amount=&billnumber=asd&invdate=26-02-2015&due_date=26-02-2015&postiong_date=26-02-2015&location=0'}
// You can also set values directly. 
feed.db            = "http://accounts:accounts@192.168.1.40:4984/db";
feed.include_docs = true;
//feed.since         = 'now';
//feed.heartbeat     = 30    * 1000
//feed.inactivity_ms = 86400 * 1000;
//feed.filter = function(doc, req) {
//  // req.query is the parameters from the _changes request and also feed.query_params. 
////  console.log('Filtering for query: ' + JSON.stringify(req.query));
////  console.log(doc);
// 
//  if(doc.isFinalize)
//    return true;
//  return false;
//}
//feed.document = function(doc, req) {
//    console.log(doc);
//}
var q = async.queue(function (task, callback) {
    console.log(task);
//    callback();
   
//    var qty = eval('0' + task.change_qty );
// console.log(qty)

//        request({
//        method: 'POST',
//        url:'http://192.168.1.40/v2_kohsar/admin/api.php?method=processAdjustmentData&user_id=1888&type=post', 
//        form:(task)
////        json:true
//        
//    }, function (error, response, body) {
//        callback();
//        console.log(body)
//        if (!error && response.statusCode == 200) {
////            console.log(body); // Show the HTML for the Google homepage. 
//        //        var obj = JSON.parse(body);
//        }
//    });


  
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
//    console.log('Document id ' + change.id + ' is change with sequence id ' + change.seq,  change.doc);
//    if(doc){
        
//            if(doc.data.retail_price){
//                console.log( doc.data.retail_price)
//                doc.data.retail_price = doc.data.retail_price + 100;
//            }

//    }
        q.push(doc, function (err) {
            console.log('finished processing task', err);
        });


    //var request = require('request');
    

    

})
 
feed.on('error', function(er) {
    console.error('Since Follow always retries on errors, this must be serious');
    throw er;
})
feed.follow();



