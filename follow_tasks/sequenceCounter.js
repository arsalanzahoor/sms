exports.sequenceCounter = {
  name: 'sequenceCounter',
  description: 'test method',
  inputs : {
    post:{required:true}



  },   


  run: function(api, connection, next){

var request=require('request');

/*
console.log("\nDATA 1\n",connection.params.post[0].last_seq);
console.log("\nDATA 2\n",connection.params.post[1].last_seq);
console.log("\nDATA 3\n",connection.params.post[2].last_seq);
*/

//console.log(connection.params.post,typeof connection.params.post);
api.redis.client.HSET("SERVERS","GULBERG",connection.params.post[0].last_seq+'_'+connection.params.post[0].counter1, function(e,b){
  console.log('\n=================\nREDIS GULBERG\n=================\n',b,e);


//================================================
if(connection.params.post[0].last_seq>connection.params.post[0].counter1){
var data = {
       to : 'notify@esajeesolutions.com', 
       subject : 'GULBERG COUNTER 1 IS BEHIND ITS SERVER', 
       body : 'COUNTER 1 SEQUENCE : '+connection.params.post[0].counter1+' IS BEHIND ITS SERVER SEQUENCE: '+connection.params.post[0].last_seq,
   };
   request({
       method: 'POST',
       url:'http://192.168.1.40/v2_gulberg/admin/api.php?method=sendEmail&type=post&user_id=1888', 
       form:(data)
   //        json:true
       
   }, function (error, response, body) {
       //        callback(error, response);
       if (!error && response.statusCode == 200) {
           //        var obj = JSON.parse(body);
           console.log("body:",body)
       }
   });


}
//================================================
});


api.redis.client.HSET("SERVERS","KOHSAR",connection.params.post[1].last_seq+'_'+connection.params.post[1].counter1+'_'+connection.params.post[1].counter2+'_'+connection.params.post[1].counter3, function(e,b){
  console.log('\n=================\nREDIS KOHSAR\n=================\n',b,e);


//================================================
if(connection.params.post[1].last_seq>connection.params.post[1].counter1){
var data = {
       to : 'notify@esajeesolutions.com', 
       subject : 'KOHSAR COUNTER 1 IS BEHIND ITS SERVER', 
       body : 'COUNTER 1 SEQUENCE : '+connection.params.post[1].counter1+' IS BEHIND ITS SERVER SEQUENCE: '+connection.params.post[1].last_seq,
   };
   request({
       method: 'POST',
       url:'http://192.168.1.40/v2_gulberg/admin/api.php?method=sendEmail&type=post&user_id=1888', 
       form:(data)
   //        json:true
       
   }, function (error, response, body) {
       //        callback(error, response);
       if (!error && response.statusCode == 200) {
           //        var obj = JSON.parse(body);
           console.log("body:",body)
       }
   });


}
//================================================
if(connection.params.post[1].last_seq>connection.params.post[1].counter2){
var data = {
       to : 'notify@esajeesolutions.com', 
       subject : 'KOHSAR COUNTER 2 IS BEHIND ITS SERVER', 
       body : 'COUNTER 2 SEQUENCE : '+connection.params.post[1].counter2+' IS BEHIND ITS SERVER SEQUENCE: '+connection.params.post[1].last_seq,
   };
   request({
       method: 'POST',
       url:'http://192.168.1.40/v2_gulberg/admin/api.php?method=sendEmail&type=post&user_id=1888', 
       form:(data)
   //        json:true
       
   }, function (error, response, body) {
       //        callback(error, response);
       if (!error && response.statusCode == 200) {
           //        var obj = JSON.parse(body);
           console.log("body:",body)
       }
   });


}
//================================================
if(connection.params.post[1].last_seq>connection.params.post[1].counter3){
var data = {
       to : 'notify@esajeesolutions.com', 
       subject : 'KOHSAR COUNTER 3 IS BEHIND ITS SERVER', 
       body : 'COUNTER 3 SEQUENCE : '+connection.params.post[1].counter3+' IS BEHIND ITS SERVER SEQUENCE: '+connection.params.post[1].last_seq,
   };
   request({
       method: 'POST',
       url:'http://192.168.1.40/v2_gulberg/admin/api.php?method=sendEmail&type=post&user_id=1888', 
       form:(data)
   //        json:true
       
   }, function (error, response, body) {
       //        callback(error, response);
       if (!error && response.statusCode == 200) {
           //        var obj = JSON.parse(body);
           console.log("body:",body)
       }
   });


}
//================================================




});



api.redis.client.HSET("SERVERS","DHA",connection.params.post[2].last_seq+'_'+connection.params.post[2].counter2+'_'+connection.params.post[2].counter3, function(e,b){
  console.log('\n=================\nREDIS DHA\n=================\n',b,e);


//================================================
if(connection.params.post[2].last_seq>connection.params.post[2].counter2){
var data = {
       to : 'notify@esajeesolutions.com', 
       subject : 'KOHSAR COUNTER 2 IS BEHIND ITS SERVER', 
       body : 'COUNTER 2 SEQUENCE : '+connection.params.post[2].counter2+' IS BEHIND ITS SERVER SEQUENCE: '+connection.params.post[2].last_seq,
   };
   request({
       method: 'POST',
       url:'http://192.168.1.40/v2_gulberg/admin/api.php?method=sendEmail&type=post&user_id=1888', 
       form:(data)
   //        json:true
       
   }, function (error, response, body) {
       //        callback(error, response);
       if (!error && response.statusCode == 200) {
           //        var obj = JSON.parse(body);
           console.log("body:",body)
       }
   });


}
//================================================

 if(connection.params.post[2].last_seq>connection.params.post[2].counter3){
var data = {
       to : 'notify@esajeesolutions.com', 
       subject : 'KOHSAR COUNTER 3 IS BEHIND ITS SERVER', 
       body : 'COUNTER 2 SEQUENCE : '+connection.params.post[2].counter3+' IS BEHIND ITS SERVER SEQUENCE: '+connection.params.post[2].last_seq,
   };
   request({
       method: 'POST',
       url:'http://192.168.1.40/v2_gulberg/admin/api.php?method=sendEmail&type=post&user_id=1888', 
       form:(data)
   //        json:true
       
   }, function (error, response, body) {
       //        callback(error, response);
       if (!error && response.statusCode == 200) {
           //        var obj = JSON.parse(body);
           console.log("body:",body)
       }
   });


}
//================================================


});

api.redis.client.HGETALL("SERVERS", function(e,b){
     console.log('test',e,typeof b,b);
 });





next();


  }



}