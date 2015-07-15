console.log('in delayAction');
exports.action = {
    name:                   'delayAction',
    description:            'delayAction',
    blockedConnectionTypes: [],
    outputExample:          {},
    matchExtensionMimeType: false,
    version:                1.0,
    toDocument:             true,

    inputs: {
//        id:{
//            required: true
//        } ,
        time: {
            required:true
        },
//        process: {
//            required:true
//        },
        url: {
            required:true
        }
    },

    run: function(api, connection, next){
        // your logic here
        console.log('data:',connection.params);
        var url = connection.params.url;
//        var process = connection.params.process;
//        if(process == 'shipmentcurrency'){
//            url = connection.params.url+'&shipmentid='+connection.params.id; 
//        }else if(process == 'shipment'){
//            url = connection.params.url+'&ids='+connection.params.id; 
//        }else if(process == 'discount'){
//            url = connection.params.url+'&discountid='+connection.params.id; 
//        }
//        else {
//            url = connection.params.url;
//        }
//        }else if(process == 'invoiceClose'){
//            url = connection.params.url
//        }else if(process == 'purchaseClose'){
//            url = connection.params.url
//        }else if(process == 'stockAdjustClose'){
//        url = connection.params.url
//    }
    console.log('url:',typeof url, url)
    var data = {
        linkData : {},
        url : url
    };
    var time = JSON.parse(connection.params.time);
    console.log('data2:',typeof url,url,typeof data,data, 'test');
    time = time*1000;
    console.log('data3:',typeof time,time);
    //        api.tasks.enqueueIn(1000*60*0.5, "processLog", {
    api.tasks.enqueueAt(time, "processLog", {
        data:data
    }, 'default', function(err, toRun){
        console.log('err and toRun',err,toRun);
        // re enqueued!
        if(!err){
            connection.response.body = toRun;
        }else {
            connection.response.body = err;
        }
    }); 
    next(connection, true);
}
};