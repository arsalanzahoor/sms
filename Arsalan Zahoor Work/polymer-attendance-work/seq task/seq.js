var async = require('async');
var bodyParser = require('body-parser');
var request = require('request');
var express = require('express');
var app = express();
//app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
//app.use(require('express').static(__dirname + '/public'));  
var data=[];
data[0]={
    last_seq:"0",
    counter1:"0"
};
data[1]={
    last_seq:"0",
    counter1:"0",
    counter2:"0",
    counter3:"0"
};
data[2]={
    last_seq:"0",
    counter2:"0",
    counter3:"0"
};
var getSeq = function(){
    async.series([
        function(callback){
            request('http://gulberg_counter:gulberg_counter@esajeesolutions.com:4984/db/_changes', function (error, response, body) {
                console.log("1:",error,response.statusCode);
                if (!error && response.statusCode == 200) {
                    var d= JSON.parse(body);
                    data[0].last_seq=d.last_seq; 
                }
                callback(null);
            });
        },
        function(callback){
            request('http://gulpos.esajee.com:8080/admin/api.php?method=maxSequenceNumber&type=post&user_id=1888', function (error, response, body) {
                console.log("2:",error,response.statusCode);
                if (!error && response.statusCode == 200) {
                    var d= JSON.parse(body);
                    data[0].counter1=d.sequence; 
                }
                if(data[0].last_seq>data[0].counter1){
                    var da = {
                        to : 'notify@esajeesolutions.com, siddique.ahmad@gmail.com', 
                        subject : 'GULBERG COUNTER 1 IS BEHIND ITS SERVER', 
                        body : 'COUNTER 1 SEQUENCE : '+data[0].counter1+' IS BEHIND ITS SERVER SEQUENCE: '+data[0].last_seq
                    };
                    sendEmail(da);
                }
                callback(null);
            });
        },
        function(callback){
            request('http://kohsar_counter:kohsar_counter@esajeesolutions.com:4984/db/_changes', function (error, response, body) {
                console.log("3:",error,response.statusCode);
                if (!error && response.statusCode == 200) {
                    var d= JSON.parse(body);
                    data[1].last_seq=d.last_seq; 
                }
                callback(null);
            });
        },
        function(callback){
            request('http://kohpos.esajee.com:8081/admin/api.php?method=maxSequenceNumber&type=post&user_id=1888', function (error, response, body) {
                console.log("4:",error,response.statusCode);            
                if (!error && response.statusCode == 200) {
                    var d= JSON.parse(body);
                    data[1].counter1=d.sequence; 
                }
                if(data[1].last_seq>data[1].counter1){
                    var da = {
                        to : 'notify@esajeesolutions.com, siddique.ahmad@gmail.com', 
                        subject : 'KOHSAR COUNTER 1 IS BEHIND ITS SERVER', 
                        body : 'COUNTER 1 SEQUENCE : '+data[1].counter1+' IS BEHIND ITS SERVER SEQUENCE: '+data[1].last_seq
                    };
                    sendEmail(da);
                }
                callback(null);
            });
        },
        function(callback){
            request('http://kohpos.esajee.com:8082/admin/api.php?method=maxSequenceNumber&type=post&user_id=1888', function (error, response, body) {
                console.log("5:",error,response.statusCode);            
                if (!error && response.statusCode == 200) {
                    var d= JSON.parse(body);
                    data[1].counter2=d.sequence; 
                }
                if(data[1].last_seq>data[1].counter2){
                    var da = {
                        to : 'notify@esajeesolutions.com, siddique.ahmad@gmail.com', 
                        subject : 'KOHSAR COUNTER 2 IS BEHIND ITS SERVER', 
                        body : 'COUNTER 2 SEQUENCE : '+data[1].counter2+' IS BEHIND ITS SERVER SEQUENCE: '+data[1].last_seq
                    };
                    sendEmail(da);
                }
                callback(null);
            });
        },
        function(callback){
            request('http://kohpos.esajee.com:8083/admin/api.php?method=maxSequenceNumber&type=post&user_id=1888', function (error, response, body) {
                console.log("6:",error,response.statusCode);
                if (!error && response.statusCode == 200) {
                    var d= JSON.parse(body);
                    data[1].counter3=d.sequence; 
                }
                if(data[1].last_seq>data[1].counter3){
                    var da = {
                        to : 'notify@esajeesolutions.com, siddique.ahmad@gmail.com', 
                        subject : 'KOHSAR COUNTER 3 IS BEHIND ITS SERVER', 
                        body : 'COUNTER 3 SEQUENCE : '+data[1].counter3+' IS BEHIND ITS SERVER SEQUENCE: '+data[1].last_seq
                    };
                    sendEmail(da);
                }
                callback(null);
            });
        },
        function(callback){
            request('http://dha_counter:dha_counter@esajeesolutions.com:4984/db/_changes', function (error, response, body) {
                console.log("7:",error,response.statusCode);
                if (!error && response.statusCode == 200) {

                    var d= JSON.parse(body);
                    data[2].last_seq=d.last_seq; 

                }
                callback(null);
            });
        },
        function(callback){
         
            request('http://dhapos.esajee.com:8082/admin/api.php?method=maxSequenceNumber&type=post&user_id=1888', function (error, response, body) {
                console.log("8:",error,response.statusCode);
                if (!error && response.statusCode == 200) {
   
                    var d= JSON.parse(body);
                    data[2].counter2=d.sequence; 
                }
                if(data[2].last_seq>data[2].counter2){
                    var da = {
                        to : 'notify@esajeesolutions.com, siddique.ahmad@gmail.com', 
                        subject : 'DHA COUNTER 2 IS BEHIND ITS SERVER', 
                        body : 'COUNTER 2 SEQUENCE : '+data[2].counter2+' IS BEHIND ITS SERVER SEQUENCE: '+data[2].last_seq,
                    };
                    sendEmail(da);
                }
                callback(null);
            });

        },
        function(callback){
            request('http://dhapos.esajee.com:8083/admin/api.php?method=maxSequenceNumber&type=post&user_id=1888', function (error, response, body) {
                console.log("9:",error,response.statusCode);
                if (!error && response.statusCode == 200) {
   
                    var d= JSON.parse(body);
                    data[2].counter3=d.sequence;
                }
                if(data[2].last_seq>data[2].counter3){
                    var da = {
                        to : 'notify@esajeesolutions.com, siddique.ahmad@gmail.com', 
                        subject : 'DHA COUNTER 3 IS BEHIND ITS SERVER', 
                        body : 'COUNTER 3 SEQUENCE : '+data[2].counter3+' IS BEHIND ITS SERVER SEQUENCE: '+data[2].last_seq,
                    };
                    sendEmail(da);
                }
                console.log('data',typeof data,data);
                //                request.psot('http://192.168.1.40:8080/api/sequenceCounter?apiVersion=1&post='+JSON.stringify(data), function(err, res, bo){
                //                    console.log(err,res,bo); 
                //                });
                callback(null);
            });
        },
        ]);   
};
function sendEmail(da){
    request({
        method: 'POST',
        url:'http://192.168.1.40/v2_gulberg/admin/api.php?method=sendEmail&type=post&user_id=1888', 
        form:(da)
    //        json:true
        
    }, function (error, response, body) {
        //        callback(error, response);
        if (!error && response.statusCode == 200) {
            //        var obj = JSON.parse(body);
            console.log("email sent getting response body:",body)
        }
    });
};
getSeq();
setInterval(getSeq,5*1000*60);
