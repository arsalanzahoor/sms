exports.rediscopy = {
    name: 'rediscopy',
    description: 'redis',  
    inputs:{
key:{required:true}

    },
    run: function(api, connection, next){
      

  //console.log(next);

       //console.log('data',connection.params);
        // var data;
         // console.log(data,data.server);

api.redis.client.HGETALL(connection.params.key, function(e,b){
     console.log('test',e,typeof b,b);
      
      if(!e)
{
      
            // data = b;
          // data = e;
          
          // var ad=[];
          // for(var i=0;i<b.length;i++){
          //   ad[i] = b[i];

          // }
          
       connection.response.data=b;
     
     
    }

next(connection, true);


    });   



}

      }
