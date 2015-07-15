exports.redisdata = {
    name: 'redisdata',
    description: 'redis data display',
   
    run: function(api, connection, next){
      


//         console.log('data',connection.params.key);
        // var data;

        api.redis.client.LRANGE("failedSeq",-5,5, function(e,b){
            console.log('test',e,typeof b,b);
      
            if(!e)
            {
      
                // data = b;
                // data = e;
          
                // var ad=[];
                // for(var i=0;i<b.length;i++){
                //   ad[i] = b[i];

                // }
          
                connection.response.data={b:b};
     
                console.log('response',connection.response.data);
            }

            next();

        });   
    }

}
