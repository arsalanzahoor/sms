var follow = require('follow');
var async = require('async'); 
var actionheroClient = require("actionhero-client");
var login = 'attendance_marked';
var folder = 'v2_gulberg';
var host = '192.168.1.40';
var opts = {}; // Same options paramters as before 
var feed = new follow.Feed(opts);
var request = require('request');

// **********You can also set values directly.**********
feed.db = "http://192.168.1.10:4984/sync_gateway";
feed.include_docs = true;
feed.since = 878;
feed.follow();

//**********Starting Client of Actionhero for Chat**********
var aclient = new actionheroClient();  
var defaults = {
    host: "192.168.1.40",
    port: "5000",
    delimiter: "\r\n",
    logLength: 100,
    secure: false,
    timeout: 10000,
    reconnectTimeout: 1000,
    reconnectAttempts: 10
};
aclient.connect(defaults);
        
aclient.on("welcome", function(msg){
    console.log("WELCOME: " , msg);
});

aclient.on("say", function(msg){
    console.log("SAY: " , msg);
});
aclient.on("error", function(err, data){
    console.log("ERROR: " , err.toString());
    if(data){
        console.log('data in error:',data);
    }
});

aclient.on("connected", function(){
    console.log("*****Client Connected with Actionhero*****");
    // join a chat room and talk
    aclient.roomAdd("defaultRoom", function(err){
        //        aclient.say("defaultRoom", "Hello from the actionheroClient");
        //            aclient.roomLeave("defaultRoom");
        });
});

//**********Ending Client of Actionhero for Chat**********

//**********Start Queue For Pushing/Performing Tasks********** 
var q = async.queue(function (task, callback) {
    //    console.log('task data:',task);
    var message;
    request.get('http://192.168.1.10:4984/sync_gateway/'+task.user_id,function(err, res, body){
        if(!err && res.statusCode == 200){
            var rec = JSON.parse(body);
            if(task.time_in !== null && task.time_out === null){
                message = "User "+rec.firstName.toString()+' '+rec.lastName.toString()+" Has Just Arrived."
                console.log('Time in body:',message);
                aclient.say("defaultRoom",message);
            }else if(task.time_in !== null && task.time_out !== null){
                message = "User "+rec.firstName.toString()+' '+rec.lastName.toString()+" Has Just Leave."
                console.log('time out body:',message);
                aclient.say("defaultRoom",message);
            }
        }
    });            
    callback();
}, 1); 

//**********End Queue For Pushing/Performing Tasks**********


//**********Monitoring Every Change In Database/Server**********
feed.on('change', function(change) {
    //    console.log(change.seq,change.doc);
    var doc =change.doc;
    q.push(doc, function (err) {
        });
})
var retry = 0;
//**********Throwing Error/Exceptions in Case of Follow Data Changes**********
feed.on('error', function(er) {
    console.error('Since Follow always retries on errors, this must be serious',er.toString(), retry++);
    setTimeout(function() {
        feed.follow()
    }, 2*60*1000); // 2 minutes
});
//**********Exception Function for any case of Exception if Got then Post a request for sending an Email with Error in body**********
process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' , err.toString());
//    var data = {
//        to : 'arsalan.zahoor@esajeesolutions.com', 
//        subject : 'Exception At-'+login+__filename, 
//        body : err.toString()
//    };
//    sendEmail(data);
    
});

function sendEmail(data){
    request({
        method: 'POST',
        url:'http://'+host+'/'+folder+'/admin/api.php?method=sendEmail&type=post&user_id=1888', 
        form:(data)
    //        json:true
        
    }, function (error, response, body) {
        //        callback(error, response);
        if (!error && response.statusCode == 200) {
            //        var obj = JSON.parse(body);
            console.log("email sent getting response body:",body)
        }
    });
}