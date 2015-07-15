console.log('In newitems Action');
exports.categories = {
    name: 'newitems',
    description: 'search newitems from elastic search',
    inputs: {
        stock : {
            required : true
        }
    },
    run: function(api, connection, next){
        console.log('stock',typeof connection.params.stock,connection.params.stock);

        var request=require('request');
        var body = {};
        if(connection.params.stock =='1'){
            body = {
                'sort' : [{
                    'updated_at' : {
                        'order' : 'desc'
                    }
                }],
                'filter' : {
                    'numeric_range' : {
                        'balance' : {
                            'gte': 1
                        }
                    }
                }
            };
        }else if(connection.params.stock == '0'){
            body = {
                'sort' : [{
                    'updated_at' : {
                        'order' : 'desc'
                    }
                }]
            };
        }
        request({
            method: 'POST',
            url:'http://192.168.1.41:9200/item_balance/_search?from=0&size=700',
            body:body,
            json:true
       
        }, function (error, response, body) {
            
//            console.log("error && response.statusCode",error,response.statusCode,body.hits.hits.length);
            if (!error && response.statusCode == 200) {
                var arr = [];
                var result = body;
                //                console.log("body:",typeof result.hits.hits,result.hits.hits[0]._source,result.hits.hits.length);
                for(var i = 0;i < result.hits.hits.length;i++){
                    //                    console.log('test:',result.hits.hits[i]._source.data.name);
                    if(result.hits.hits[i]._source.data.item_img != null && result.hits.hits[i]._source.data.item_img != 'http://www.esajeecom.esajee.com/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/images/catalog/product/placeholder/thumbnail.jpg'){
                        arr.push({
                            'name':result.hits.hits[i]._source.data.item_description,
                            'image':result.hits.hits[i]._source.data.item_img,
                            'price':result.hits.hits[i]._source.data.retail_price,
                            'lastpurchased':result.hits.hits[i]._source.data.last_purchased
                        });
                    }
                }
//                console.log('array:',arr.length);
                connection.response.data = arr;
                //                console.log("response:",typeof connection.response.data,connection.response.data);
                next(connection, true);

            } else {
                next(connection, error);
            }
        });
    }
}