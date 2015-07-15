console.log('In suppliers Action');
exports.categories = {
    name: 'suppliers',
    description: 'search suppliers from elastic search',
    inputs: {},
    run: function(api, connection, next){

        var request=require('request');
        request({
            method: 'POST',
            url:'http://192.168.1.41:9200/suppliers/_search?q=*&from=0&size=800'
        //            form:(data)
        //        json:true
       
        }, function (error, response, body) {
            
            //            console.log("error && response.statusCode",error,response.statusCode);
            if (!error && response.statusCode == 200) {
                var arr = [];
                var result = JSON.parse(body);
                //                console.log("body:",typeof result.hits.hits,result.hits.hits[0]._source,result.hits.hits.length);
                for(var i = 0;i < result.hits.hits.length;i++){
                    //                    console.log('test:',result.hits.hits[i]._source.data.name);
                    arr.push({
                        'name':result.hits.hits[i]._source.data.companyname
                    });
                }
                //                console.log('array:',arr);
                connection.response.data = arr;
                //                console.log("response:",typeof connection.response.data,connection.response.data);
                next(connection, true);

            } else {
                next(connection, error);
            }
        });
    }
}