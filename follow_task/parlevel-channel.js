var follow = require('follow');
var async = require('async'); 
var opts = {}; // Same options paramters as before 
var feed = new follow.Feed(opts);
var login = 'dev';
//var folder = '';
url = '192.168.1.40/v2_gulberg';
var request = require('request');

feed.since = 81175;

// **********You can also set values directly.**********
feed.db = "http://"+login+":"+login+"@esajeesolutions.com:4984/db";
feed.include_docs = true;

//**********Queue For Pushing/Performing Tasks********** 
var q = async.queue(function (task, callback) {
    console.log(task);
    var balance = JSON.parse(task.data.balance);
    var parlevel = JSON.parse(task.data.par_level);
    var packing = JSON.parse(task.data.packing);
    console.log(balance,parlevel,packing);
    if(packing > 0) {
        packing = packing;
    }
    else {
        packing = 1;
    }
    if( Math.ceil(balance/packing) <= parlevel && parlevel > 0 ) {
        var data = {
            fkbarcodeid : task.data.itemid
        };
        var channel = task.channels[0];
        switch(channel) {
            case'main_kohsar':
                url = 'kohsar.esajee.com';
                break;
            case'main_gulberg':
                url = 'gulberg.esajee.com';
                break;
            case'main_defence':
                url = 'dha.esajee.com';
                break;
            case'main_warehouse':
                url = 'warehouse.esajee.com';
                break;
            case'main_dha_ware':
                url = 'dhawarehouse.esajee.com';
                break;        
        }
        request({
            method: 'POST',
            url:'http://'+url+'/admin/api.php?method=processItem4Reorder&type=post&user_id=1888', 
            form:(data)
            //        json:true
        
        }, function (error, response, body) {
            console.log(error,response.statusCode,body);
            //        callback(error, response);
            if (!error && response.statusCode == 200) {
                console.log("success")
            }
        });
    }
    callback();
}, 1); 
//**********Monitoring Every Change In Database**********
feed.on('change', function(change) {

//    console.log(change.seq,change.id);
    var doc =change.doc;
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


//**********Exception Function for any case of Exception if Got then Post a request for sending an Email with Error in body**********
process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
    var data = {
        to : 'notify@esajeesolutions.com', 
        subject : 'Par Level Exception At-'+login, 
        body : JSON.stringify(err) + __filename
    };
    request({
        method: 'POST',
        url:'http://'+url+'/admin/api.php?method=sendEmail&type=post&user_id=1888', 
        form:(data)
        //        json:true
        
    }, function (error, response, body) {
        //        callback(error, response);
        if (!error && response.statusCode == 200) {
            console.log("Email Send for Exception with getting response in body:",body)
        }
    });
});
feed.follow();