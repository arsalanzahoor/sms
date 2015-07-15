console.log('In items Action');
exports.items = {
    name: 'items',
    description: 'search items from elastic search',
    inputs: {
        filters : {
            required : true
        }
    },
    run: function(api, connection, next){
        console.log('filters',connection.params.filters,typeof connection.params.filters);
        var filters = JSON.parse(connection.params.filters);
        var request=require('request');
        var trim = require('trim');
        var body;
        if(filters.all == '1'){
            body = {
                "query": {
                    "match_all": {}
                },
                "aggs": {
                    "products": {
                        "terms": {
                            "field": "product_name"
                        }
                    },
                    "categories": {
                        "terms": {
                            "field": "category_name"
                        }
                    },
                    "brands": {
                        "terms": {
                            "field": "brand_name"
                        }
                    },
                    "suppliers": {
                        "terms": {
                            "field": "supplier_name"
                        }
                    }
                }
            };
        }
        else {
            var searchText = trim(filters.searchText);
            var brand;
            var product;
            var category;
            var supplier;
            if(filters.brand){
                brand = trim(filters.brand);
            }
            if(filters.product){
                product = trim(filters.product);
            }
            if(filters.category){
                category = trim(filters.category);
            }
            if(filters.supplier){
                supplier = trim(filters.supplier);
            }
            /*
         {
        "query": {
    "match_all": {}
  },
  "aggs": {
    "products": {
      "terms": {
        "field": "item_fkproductid"
      }
    },
    "categories": {
      "terms": {
        "field": "item_fkcategoryid"
      }
    },
    "brands": {
      "terms": {
        "field": "item_fkbrandid"
      }
    },
    "suppliers": {
      "terms": {
        "field": "item_fksupplierid"
      }
    }
  }
}
         */
        
        
        
            body = {
                "filter": {
                    "bool": {
                        "must": []
                    }
                },
                "sort":[]
            };
     
            if(filters.activeItems == 1){
                //            body.filter.bool.must[i] = {
                body.filter.bool.must.push({
                    "term": {
                        'item_status' : 'active'
                    }
                });
                //            body.filter = {
                body.filter.bool.must.push({
                    'numeric_range' : {
                        'balance' : {
                            'gte': 1
                        }
                    }
                });
            }
            if(filters.inActive == 1){
                body.filter.bool.must.push({
                    "term": {
                        'item_status' : 'inactive'
                    }
                });
                //            body.filter = {
                body.filter.bool.must.push({
                    'numeric_range' : {
                        'balance' : {
                            'lt': 1
                        }
                    }
                });
            }
            if(filters.highestSold == 1){
                body.sort.push({
                    'sold' : {
                        'order' : 'desc'
                    }
                });
            }
            if(filters.latestItems == 1){
                body.sort.push({
                    'updated_at' : {
                        'order' : 'desc'
                    }
                });
            }
            if(filters.lowestSold == 1){
                body.sort.push({
                    'sold' : {
                        'order' : 'asc'
                    }
                });
            }
            if(filters.adjusted == 1){
                //            body.filter = {
                body.filter.bool.must.push({
                    'numeric_range' : {
                        'balance' : {
                            'gte': 1
                        }
                    }
                });
            }
            if(filters.notAdjusted == 1){
                //            body.filter = {
                body.filter.bool.must.push({
                    'numeric_range' : {
                        'balance' : {
                            'lt': 1
                        }
                    }
                });
            }
            if(filters.deadItems == 1){
                //            body.filter = {
                body.filter.bool.must.push({
                    "numeric_range": {
                        "sold": {
                            "lte": 0
                        }
                    }
                });
                body.sort.push({
                    "updated_at": {
                        "order": "desc"
                    }
                });
            }
            if(searchText){
                body.query = {
                    "wildcard": {
                        "item_description": {
                            "value": "*"+searchText+"*"
                        }
                    }
                };
            }
        }
        console.log('body for query',body);       
        request({
            method: 'POST',
            url:'http://192.168.1.41:9200/item_balance/_search?from=0&size=9000',
            body:body,
            json:true
       
        }, function (error, response, body) {
            
            //            console.log("error && response.statusCode",error,response.statusCode,body);
            if (!error && response.statusCode == 200) {
                var arr = [];
                var result = body;
                //                console.log("body:",typeof result.hits.hits,result.hits.hits[0]._source,result.hits.hits.length);
                for(var i = 0;i < result.hits.hits.length;i++){
                    //                    if(result.hits.hits[i]._source.data.item_img != null && result.hits.hits[i]._source.data.item_img != 'http://www.esajeecom.esajee.com/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/images/catalog/product/placeholder/thumbnail.jpg'){
                    if(result.hits.hits[i]._source.data.item_img != ''){
                        //                        console.log('test:',result.hits.hits[i]._source.data.product_name,result.hits.hits[i]._source.data.brand_name,result.hits.hits[i]._source.data.category_name,result.hits.hits[i]._source.data.supplier_name);
                        var br = trim(result.hits.hits[i]._source.data.brand_name);
                        var pro = trim(result.hits.hits[i]._source.data.product_name);
                        var cat = trim(result.hits.hits[i]._source.data.category_name);
                        var supp = trim(result.hits.hits[i]._source.data.supplier_name);
                        //                                                console.log('length:',br.length,pro.length,cat.length,supp.length);
                        if(br.length > 0 && pro.length > 0 && cat.length > 0 && supp.length > 0){
                            //                            console.log('test:',result.hits.hits[i]._source.data.product_name);
                            arr.push({
                                'name':result.hits.hits[i]._source.data.item_description,
                                'image':result.hits.hits[i]._source.data.item_img,
                                'price':result.hits.hits[i]._source.data.retail_price,
                                'lastpurchased':result.hits.hits[i]._source.data.last_purchased,
                                'lastpurchasedby':result.hits.hits[i]._source.data.last_purchased_by,
                                'balance':result.hits.hits[i]._source.data.balance,
                                'sold':result.hits.hits[i]._source.data.sold,
                                'product':result.hits.hits[i]._source.data.product_name,
                                'category':result.hits.hits[i]._source.data.category_name,
                                'brand':result.hits.hits[i]._source.data.brand_name,
                                'supplier':result.hits.hits[i]._source.data.supplier_name
                            });
                        }
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