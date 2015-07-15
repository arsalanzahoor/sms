
//2631111::3
var mysql = require('mysql');
var request = require('request');
//var express = require('express'),
//bodyParser = require('body-parser'),
async = require('async');
//app = express();
//app.use(bodyParser());
//**********Creating Connection**********
var connection = mysql.createConnection({
    host : '192.168.1.40',
    user : 'root',
    password : '051D5101bin85db',
    database : 'staging_kohsar',
    // typeCast:false
    dateStrings:true
// stringifyObjects:true
});
//connection.query('USE v2_main');
connection.connect(function(e,r,b){
    //    console.log(e,r,b);
    if(!e){
        console.log('connection id:',connection.threadId);
    }
    
})

//**********Queue For Pushing/Performing Tasks**********
var q = async.queue(function (data, callback){

    console.log('data:',typeof data.item_barcode,data.item_barcode);
    var barcode = parseInt(data.item_barcode);
    async.waterfall([
        function(callback1) {
            //            var bcode=051500000793;
            //            var barcode='051500000793';
            //        console.log('types', typeof barcode,barcode);
            request({
                method: 'GET',
                url:'http://www.esajeecom.esajee.com/links/index/productimage?barcode='+data.item_barcode
            }, function (error, response, body) {
                console.log("error",error,response.statusCode);
            
                if (!error && response.statusCode == 200) {
                    console.log('Getting Post body response:',typeof body,body, '*******Post Body Response Ended...!*******'); // Show the HTML for the Google homepage. 
                    var result = {
                        url:body,
                        barcode:barcode
                    }
                    callback1(null, result);
                }
            });
        },
        function(result, callback2) {
            var url = JSON.stringify(result.url);
            var sqlqry = "UPDATE item_balance SET item_img="+url+" where item_barcode="+result.barcode;
            console.log("next function:",sqlqry);
        
            connection.query(sqlqry, function(err, res){
                
                if(err)
                {
                    console.log("Select Query Error:",err);
                    callback2(err);
                }
                else {
                    console.log("Select Query Results:",res);
                    callback();
                }
            });
        }
        ]);
    
//    callback();
}, 5);

var q2 = async.queue(function (data, callback2){
    
    offset = parseInt(data);
    console.log('offset',offset);
    var qry = "SELECT  item_barcode from item_balance where isadjusted=1 ORDER BY pkitem_balanceid ASC LIMIT "+offset+", 100 ";
    connection.query(qry, function(err, result) {
        console.log('error and result:',err, result.length,result);
        if(!err) {
            for(var i=0;i<result.length;i++) {
                q.push(result[i]);
            }
        }
        else {
            console.log(err)
        }
    });

    setTimeout(callback2,   20000  );
 

}, 1);


var count = 0;
var count1 = 0;

async.whilst(
    function () {
        return count < 88;
    },
    function (callback3) {
        //  console.log(count1+500, count1);
        q2.push(count1);
        count++;
        count1 += 100;
        
        
        //callback();
        
        setTimeout(callback3, 5000);
    },
    function (err) {
    // 5 seconds have passed
    }
    );