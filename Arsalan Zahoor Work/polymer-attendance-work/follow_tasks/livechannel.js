//devchannel.js
var follow = require('follow');
var async = require('async'); 
var opts = {}; // Same options paramters as before 
var feed = new follow.Feed(opts);
var request = require('request');
feed.since = 'now';
var login = 'dev';
var channels;
// **********You can also set values directly.**********
feed.db = "http://"+login+":"+login+"@esajeesolutions.com:4984/db";
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
    if(typeof task.channels == 'object') {
        channel = task.channels[0]
    }
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
            url:'http://'+channel+'.esajee.com/admin/api.php?method='+method1+'&type=post&user_id=1888', 
            form:(task)
        //        json:true
        
        }, function (error, response, body) {
            callback();
            if (!error && response.statusCode == 200) {
                console.log('Response='+response.statusCode);
                console.log('Getting Post body response:'+ body+ '*******Post Body Response Ended...!*******'); // Show the HTML for the Google homepage. 
                
                //**********Post data back to Sync with Update Channel as Archive**********
                if(body > 0) {
                    request.get('http://'+login+':'+login+'@esajeesolutions.com:4984/db/'+task._id, function (err, res, bo) {
                        data = JSON.parse(bo);
                        console.log(err,res.statusCode,data.channels);
                        if (!err && res.statusCode == 200) {
                            data.channels = ["archive"];
                            request({
                                method: 'PUT',
                                url:'http://'+login+':'+login+'@esajeesolutions.com:4984/db/'+encodeURIComponent(data._id)+'?_rev='+encodeURIComponent(data._rev), 
                                body:JSON.stringify(data)
                            //                                json:true
        
                            }, function (error1, response1, body1) {
                                //                                callback();
                                if (!error1 && response1.statusCode == 201) {
                                    console.log('Channel changed to Archive successfully'); // Show the HTML for the Google homepage. 
                                //        var obj = JSON.parse(body);
                                }
                            });
                        }
                    });
                }
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
    console.error('Since Follow always retries on errors, It will retry after 5 mints');
    //    throw er;
    setTimeout(function() {
        feed.follow()
    }, 5*60*1000);
})

//**********Exception Function for any case of Exception if Got then Post a request for sending an Email with Error in body**********
process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
    var data = {
        to : 'notify@esajeesolutions.com', 
        subject : 'Exception At-'+login, 
        body : JSON.stringify(err)
    };
    request({
        method: 'POST',
        url:'http://'+channel+'.esajee.com/admin/api.php?method=sendEmail&type=post&user_id=1888', 
        form:(data)
    //        json:true
        
    }, function (error, response, body) {
        //        callback(error, response);
        if (!error && response.statusCode == 200) {
            //        var obj = JSON.parse(body);
        }
    });
});
//start feed
feed.follow();