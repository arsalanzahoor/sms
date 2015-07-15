module.exports = {
    loadPriority:  1000,
    startPriority: 1000,
    stopPriority:  1000,
    initialize: function(api, next){
        api.googletrans = function googletrans(Options, callback){
            console.log('OPTIONS API GOOGLETRASNFER:',Options);
            //=====================
            var colors = require('colors');
            var ua = require('universal-analytics');
            var visitor = ua('UA-61897662-1');
            var async = require('async');
            var mysql = require('mysql');
            var connection2 = mysql.createConnection({
                host : '192.168.1.40',
                user : 'root',
                password : '051D5101bin85db',
                database:'v2_main'
            });
            var id = JSON.stringify(Options);
            connection2.query("SELECT  concat(pksaledetailid , '::3') doc_id, from_unixtime(a.timestamp, '%Y-%m-%dT%H:%i:%s') as sale_time, fksaleid saleid,  quantity, saleprice, quantity * saleprice amount, barcode, itemdescription item_name, fkbarcodeid2 item_id, flavour2 flavour FROM staging_kohsar.`saledetail` a left join v2_main.barcode b on b.pkbarcodeid = a.fkbarcodeid2  where  fksaleid ="+id+" limit 0, 1000 ", function(err, result) {
                console.log('Query Error and Result:',err,result);
                if(!err){
                    var sum=0;
                    for (var i in result){
                        sum=sum+result[i]['amount'];
                    }
                    var params1 = {
                        ti: result[0].saleid, 
                        tr: sum, 
                        ts: 0, 
                        tt: 0, 
                        cu: "PKR", 
                        ta: "kohsar"
                    };
                    var t = visitor.transaction(params1);
                    for (var i in result){
                        params1= {
                            ip: result[i]['saleprice'], 
                            iq: result[i]['quantity'], 
                            ic: result[i]['barcode'], 
                            in: result[i]['item_name'], 
                            iv: result[i]['flavour']
                        };
                        t.item(params1)
                    }
                    t.send();
                }
                else {
                    console.log('Error while transfer:',err);
                }
            });
            //=====================
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