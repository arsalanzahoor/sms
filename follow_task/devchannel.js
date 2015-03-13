//devchannel.js
var follow = require('follow');
var async = require('async'); 
var opts = {}; // Same options paramters as before 
var feed = new follow.Feed(opts);
var request = require('request');
feed.since = 'now';
// **********You can also set values directly.**********
feed.db = "http://dev:dev@192.168.1.40:4984/db";
feed.include_docs = true;
//**********filtering documents for performing task on**********
feed.filter = function(doc, req) {
   
    if(doc.isFinalize)
        return true;
    return false;
}

var document;
var method1;
var url;
//**********Queue For Pushing/Performing Tasks********** 
var q = async.queue(function (task, callback) {
    console.log(task);
    //    callback();
   
    document = task.doctype;
    //Switch statement for finding the document type case and assigning the right method for POST request  
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
feed.on('error', function(er) {
    console.error('Since Follow always retries on errors, this must be serious');
    throw er;
})
//start feed
feed.follow();