module.exports = {
    loadPriority:  1000,
    startPriority: 1000,
    stopPriority:  1000,
    initialize: function(api, next){
        api.elasticSearch = function elasticSearch(Options, callback){
            var mysql = require('mysql');
            var request = require('request');
            var colors = require('colors');
            async = require('async');
            //**********Creating Connection**********
            var connection3 = mysql.createConnection({
                host : '192.168.1.40',
                user : 'root',
                password : '051D5101bin85db',
                database:'v2_main'
            });
            var id = JSON.stringify(Options);
            var inc = 1;
            var url = 'http://localhost:9200/sale/detail/';
            var opt = {
                method: 'POST',
                json : true
            };
            //**********Queue For Pushing/Performing Tasks**********
            var q = async.queue(function (data, callback1){
                opt.body = data; 
                opt.url=url+inc.toString();
                inc++;
                request(opt, function(e, a, b){
                    console.log('Queue Error and body:',e, b);
                    callback1();
                })
            }, 5);
            var q2 = async.queue(function (data, callback2){
                offset = parseInt(data);
                console.log('offset:',offset);
                var qry = "SELECT  concat(pksaledetailid , '::3') doc_id, from_unixtime(a.timestamp, '%Y-%m-%dT%H:%i:%s') as sale_time, fksaleid saleid,  quantity, saleprice, quantity * saleprice amount, barcode, itemdescription item_name, fkbarcodeid2 item_id FROM staging_kohsar.`saledetail` a left join v2_main.barcode b on b.pkbarcodeid = a.fkbarcodeid2  where  fksaleid > 994289 order by fksaleid asc limit "+offset+", 500 ";
                connection.query(qry, function(err, result) {
                    if(!err) {
                        for(var i=0;i<result.length;i++) {
                            q.push(result[i]);
                        }
                    }
                    else {
                        console.log('query error:',err)
                    }
                });
                setTimeout(callback2,   10000  )
            }, 1);
            var count = 0;
            var count1 = 0;
            async.whilst(
                function () {
                    return count < 265;
                },
                function (callback3) {
                    //  console.log(count1+500, count1);
                    q2.push(count1);
                    count++;
                    count1 += 500;
                    setTimeout(callback3, 5000);
                },
                function (err) {
                // 5 seconds have passed
                }
                );
            callback(0, 1);
        };
        next();
    },
    start: function(api, next){
        next();
    },
    stop: function(api, next){
        next();
    }
}