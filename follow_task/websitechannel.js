//websitechannel.js
var follow = require('follow');
var async = require('async'); 
var opts = {}; // Same options paramters as before 
var feed = new follow.Feed(opts);

//  console.log('-s'.search(/\-/))
var request = require('request');
feed.since = 'now';

// You can also set values directly. 
feed.db = "http://website:website@192.168.1.40:4984/db";
feed.include_docs = true;
//**********Queue for performing task against any changes occured in feed listening**********
var q = async.queue(function (task, callback) {
    console.log(task);
    //    callback();
    if(task.change_qty.search(/\+/i) != -1 || task.change_qty.search(/\-/) != -1 ) 
        var qty = eval('0' + task.change_qty );
    else 
        qty = task.change_qty;
    var i = 0;
    console.log(qty)
//**********Post request to post specific data from task in URL as parameters**********
    request({
        method: 'POST',
        url:'http://esajeecom.esajee.com/quickstart/index.php/links/index/stockupdate?sku='+encodeURIComponent(task.data.item_barcode)+'&qty='+ encodeURIComponent(qty)+'&processType='+ encodeURIComponent(task.processType)+'&itemName='+ encodeURIComponent(task.data.item_description)+'&retailPrice='+ encodeURIComponent(task.data.retail_price), 
        form:(task)
    //        json:true
        
    }, function (error, response, body) {
        callback();
        console.log(body)
        if(body){
             
        } else {
            console.log('re queuing'+ i++)
            q.push(task); 
        }
        if (!error && response.statusCode == 200) {
        }
    });
        
}, 1);
//**********Monitoring Every Change In Database**********
feed.on('change', function(change) {

    var doc =change.doc
    console.log('Document id ' + change.id + ' is change with sequence id ' + change.seq);
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