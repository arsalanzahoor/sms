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
<<<<<<< HEAD
feed.since = 'now';
=======
        feed.since = 'now';
>>>>>>> 032b2e58d13f194314cfc29e48b49943bdfb8e3b
//        feed.follow();

/*follow({db:"http://ISE:ISE@192.168.1.15:4984/esajee-sync", include_docs:true,since:'now'}, function(error, change) {
  if(!error) {
    console.log("Change " + change.seq + " has " + Object.keys(change.doc).length + " fields");
  }
})*/
//    }
//})
 

<<<<<<< HEAD
// **********You can also set values directly.**********
=======
// You can also set values directly. 
>>>>>>> 032b2e58d13f194314cfc29e48b49943bdfb8e3b
feed.db            = "http://dev:dev@192.168.1.40:4984/db";
feed.include_docs = true;
//feed.since         = 'now';
//feed.heartbeat     = 30    * 1000
//feed.inactivity_ms = 86400 * 1000;
feed.filter = function(doc, req) {
<<<<<<< HEAD
    // req.query is the parameters from the _changes request and also feed.query_params. 
    //  console.log('Filtering for query: ' + JSON.stringify(req.query));
    //  console.log(doc);
 
    if(doc.isFinalize)
        return true;
    return false;
=======
  // req.query is the parameters from the _changes request and also feed.query_params. 
//  console.log('Filtering for query: ' + JSON.stringify(req.query));
//  console.log(doc);
 
  if(doc.isFinalize)
    return true;
  return false;
>>>>>>> 032b2e58d13f194314cfc29e48b49943bdfb8e3b
}
//feed.document = function(doc, req) {
//    console.log(doc);
//}
<<<<<<< HEAD
var document;
var method1;
var url;
//**********Queue For Pushing/Performing Tasks********** 
var q = async.queue(function (task, callback) {
    console.log(task);
    //    callback();
   
    //    var qty = eval('0' + task.change_qty );
    // console.log(qty)
    document = task.doctype;
    /*
    if(document == 'invoiceStock')
    {
        method1 = 'processInvoiceData';
    }
    else if(document == 'stockMovement')
    {
        method1 = 'processStockMovementData';
    }
    else if(document == 'receiveMovement')
    {
        method1 = 'processReceiveMovementData';
    }
    else if(document == 'demand')
    {
        method1 = 'processDemandData';
    }
    else if(document == 'stockAdjustment')
    {
        method1 = 'processAdjustmentData';
    }
    */
  
    switch(document)
    {
        case'invoiceStock':
            method1 = 'processInvoiceData';
            break;
        case'stockMovement':
            method1 = 'processStockMovementData';
            break;
        case'receiveMovement':
            method1 = 'processReceiveMovementData';
            break;
        case'demand':
            method1 = 'processDemandData';
            break;
        case'stockAdjustment':
            method1 = 'processAdjustmentData';
            break;
        case'changePrice':
            method1 = 'processChangePriceData';
            break;
        default:
            method1 = 'default'
    }

    if(method1 != 'default')
    {
        request({
            method: 'POST',
            url:'http://192.168.1.40/v2_kohsar/admin/api.php?method='+method1+'&type=post&user_id=1888', 
            form:(task)
        //        json:true
        
        }, function (error, response, body) {
            callback();
            console.log('Document Type:'+document,'Method:'+method1);
            console.log('No of errors in post response:'+ error)
            if (!error && response.statusCode == 200) {
                console.log('Response='+response.statusCode);
                console.log('Getting body response:'+ body+ '*******Body Response Ended...!*******'); // Show the HTML for the Google homepage. 
            //        var obj = JSON.parse(body);
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
    var doc =change.doc;
    q.push(doc, function (err) {
        //            console.log('finished processing task');
        });
})
//**********Throwing Error/Exceptions in Case of Follow Data Changes**********
=======
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
 
>>>>>>> 032b2e58d13f194314cfc29e48b49943bdfb8e3b
feed.on('error', function(er) {
    console.error('Since Follow always retries on errors, this must be serious');
    throw er;
})
feed.follow();