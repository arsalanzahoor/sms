console.log('In brands Action');
exports.categories = {
    name: 'brands',
    description: 'search brands from elastic search',
    inputs: {
        filters : {
            required : true
        }
    },
    run: function(api, connection, next){

        var filters = JSON.parse(connection.params.filters);
        console.log('searchText',typeof filters.searchText,filters.searchText);
        var request=require('request');
        var bo = {};
        var url;
        if(filters.searchText != ' '){
            bo.query = {
                "wildcard": {
                    "brandname": {
                        "value": "*"+filters.searchText+"*"
                    }
                }
            };
            url = 'http://192.168.1.41:9200/brands/_search?from=0&size=100';
        }else {
            url = 'http://192.168.1.41:9200/brands/_search?q=*&from=0&size=100';
        }
        console.log('bo and url',bo,url);
        request({
            method: 'POST',
            url:url,
            body:bo,
            json:true
       
        }, function (error, response, body) {
            
            //            console.log("error && response.statusCode",error,response.statusCode);
            if (!error && response.statusCode == 200) {
                var arr = [];
                var result = body;
                //                console.log("body:",typeof result.hits.hits,result.hits.hits[0]._source,result.hits.hits.length);
                for(var i = 0;i < result.hits.hits.length;i++){
                    //                    console.log('test:',result.hits.hits[i]._source.data.name);
                    arr.push({
                        'name':result.hits.hits[i]._source.data.brandname
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